<template>
  <div class="e-w-100" style="position:relative">
    <div class="e-d-flex " style="overflow-x: auto;">
      <template v-for="(group, i) in group_list">
        <indicator
          v-if="group.name in group_list_values"
          :key="'indicator'+'_'+i+'_'+mount_ind"
          :group_index="i"
          :group_list="group_list"
          :group_list_values="group_list_values">

        </indicator>
      </template>
    </div>
    <div v-if="edit_mode" class="e-d-flex e-justify-content-end e-mt-4">
      <button @click="disp_ref.easie_tools_modal=true" class="e-btn e-btn-outline-secondary">
        Editar
        <font-awesome-icon icon="wrench"></font-awesome-icon>
      </button>
      <button
        v-if="edit_mode" v-show="save_item" @click="$emit('save_component', {'component_key':component_key, item_data:{
            group_list:group_list,
            item_meta: item_meta
          }
          })" class="e-ml-2 e-btn e-btn-outline-secondary \">
        Salvar
        <font-awesome-icon icon="save"></font-awesome-icon>
      </button>
    </div>
    <div>
      <easie-item-tools
        @input="get_group_list_values"
        v-if="disp_ref.easie_tools_modal"
        @close="close_modal"
        v-model="item_meta"
        :c_type="'indicator'"
      ></easie-item-tools>
    </div>
  </div>
</template>

<script>

  import { default_group_meta, default_data_meta, default_item_meta } from './meta/meta'
  import indicator from './indicator.vue';
  import easieItemTools from '../../easieboard_modals/easie_item_tools/easie_item_tools.vue';

  export default {
    name: 'easie-indicator',
    components:{
      'indicator': indicator,
      'easie-item-tools': easieItemTools
    },
    props: {
      board_state:{required:false},
      board_filters:{required:false},
      save_item: { default: true },
      edit_mode: { default: true },
      component_key: { default: '' },
      values_function: {
        type: Function,
        required:true
      },
      value: {
        type: Object,
        default: function() {
          return {
            group_list: [],
            item_meta: {}
          }
        }
      },

    },
    data(){
      return {
        item_meta: this.$recursive_merge(this.value.item_meta, {...default_item_meta}),
        group_list: this.value.group_list,
        group_list_values: {},
        mount_ind: 0,
        disp_ref: {
          easie_tools_modal: false,
        },
      }
    },
    methods:{
      resize(){},
      load_group_list_defaults(){
        this.group_list = this.group_list.map( group =>{
          group['item_meta'] = this.$recursive_merge(group['item_meta'], {...default_group_meta});
          group['data_list'] = group['data_list'].map(data=>{
            data['item_meta'] = this.$recursive_merge(data['item_meta'], {...default_data_meta});
            return data;
          })
          return group
        });
      },
      get_group_list_values(){
        let loading = this.$loading.show({
          container: this.$el,
        });
        this.values_function(this, loading, (data) => {
          if(data.error){
            this.$default_error_handle(data.data)
            return;
          }
          this.group_list_values = data.data.group_list_values;
          let component_js = this.$get_json_key(['component_js'], this.value, null)
          if(component_js==null){
            loading.hide();
            this.apply_group_list_values();
            return;
          }
          else{
            component_js =  new Function(component_js)();
            component_js(this, ()=> {
              loading.hide();
              this.apply_group_list_values();
            });
          }
        });
      },
      apply_group_list_values(){
        this.load_group_list_defaults();
        this.mount_ind++;
        this.$emit('upd_group_list', this.group_list);
      },
      reload(){
        this.group_list = this.value.group_list;
        this.get_group_list_values()
      },
      close_modal(modal_ref) {
        this.disp_ref[modal_ref] = false;
      }
    }
  }
</script>
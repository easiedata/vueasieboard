<template>
  <div class="e-w-100">
    <div v-if="item_meta.title.text" class="e-d-flex e-justify-content-center e-pt-1">
      <label :style="$json2style(item_meta.title.text_style)"> {{ item_meta.title.text}}</label>
    </div>
    <div v-if="mount_slider"  style="overflow-x: auto;">
      <item-slider
        @new_state="new_state({...$event, index:i})"
        v-for="(group, i) in group_list"
        :key="'filter'+'_'+i+'_'+reload_slider"
        :data_list="group.data_list"
        :group_item_meta="group.item_meta"
        :group_rule="group.rule">
      </item-slider>
    </div>
    <div v-if="edit_mode" class="e-d-flex e-justify-content-end e-mt-4">
      <button @click="disp_ref.easie_tools_modal=true" class="e-btn e-btn-outline-secondary">
        Editar
        <font-awesome-icon icon="wrench"></font-awesome-icon>
      </button>
      <button
        v-if="edit_mode" @click="$emit('save_component', {'component_key':component_key, item_data:{
            group_list:group_list,
            item_meta: item_meta,
          }
        })" class="e-ml-2 e-btn e-btn-outline-secondary">
        Salvar
        <font-awesome-icon icon="save"></font-awesome-icon>
      </button>
    </div>
    <!-- Modals -->
    <div>
      <easie-item-tools
        v-if="disp_ref.easie_tools_modal"
        @close="disp_ref.easie_tools_modal=false"
        v-model="item_meta"
        :c_type="'slider'"
      ></easie-item-tools>
    </div>
  </div>
</template>

<script>
  const default_group_meta = {
    range_style: {
      processStyle: {backgroundColor: '#2486be'},
    },
    val: [0, 1],
    direction: 'ltr'
  }

  const default_item_meta = {
    title:{
      text: 'Título',
      text_style: {
        'color': '#696969',
        'font-size': '18px',
        'font-weight': 'bold',
        'font-family': 'sans-serif'
      }
    }
  }

  import itemSlider from './item_slider.vue';
  import easieItemTools from '../../easieboard_modals/easie_item_tools/easie_item_tools.vue';

  export default {
    name: 'board-slider',
    components:{
      itemSlider,
      easieItemTools
    },
    props: {
      edit_mode: { default: true },
      component_key: { default: '' },
      value: {
        type: Object,
        default: function() {
          return {
            group_list: [],
            item_meta: {},
            filter_list: []
          };
        }
      }
    },
    data(){
      return {
        disp_ref: {
          easie_tools_modal: false
        },
        item_meta: this.$recursive_merge(this.value.item_meta, {...default_item_meta}),
        group_list: this.value.group_list,
        mount_slider: 0,
        reload_slider: 0,
        rules: {},
        values: {}
      }
    },
    mounted(){
      this.init();
    },
    methods:{
      resize(){},
      reload(){},
      load_group_list_defaults(){
        this.group_list = this.group_list.map(group =>{
          group['item_meta'] = this.$recursive_merge(group['item_meta'], {...default_group_meta});
          return group
        })
      },
      init(){
        if(this.group_list.length){
          this.group_list = this.value.group_list;
          // force beforeDestroy
          this.mount_slider = false;
          this.load_group_list_defaults()
          this.mount_slider = true;
          this.reload_slider ++;
        }
      },
      new_state(data){
        this.group_list[data.index].item_meta = data.item_meta;
        this.$emit('upd_group_list', this.group_list);
        this.rules[data.index] = data.rule;
        this.values[data.index] = data.value;
        this.$emit('new_state', {
          values: this.values,
          rule: Object.values(this.rules).join(' AND '),
          component_key: this.component_key
        })
      }
    }
  }
</script>
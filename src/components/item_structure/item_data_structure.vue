<template>
  <span>
    <div class="item-group-list-wrapper e-text-secondary" v-if="show_options">
      <div class="e-d-flex">
        <div @click="show_edit_structure_modal"
          class="item-group-list-elevation e-d-flex e-justify-content-between e-mb-1 e-py-2
          e-flex-grow-1 e-mr-1">
          <span class="e-d-flex e-align-items-center hover-text-easie e-pl-2 e-mb-1">
            <font-awesome-icon icon="database"></font-awesome-icon>
          </span>
          <label class="easiedata-group-label"> Estrutura de Dados</label>
        </div>
        <div @click="show_options = !show_options"
          class="item-group-list-elevation e-d-flex e-justify-content-between e-mb-1 e-py-2 e-pl-3">
          <span class="e-d-flex e-align-items-center hover-text-easie e-pr-3">
            <font-awesome-icon :icon="window_mode_icon" aria-hidden="true"></font-awesome-icon>
          </span>
        </div>
      </div>
      <div class="item-group-list-data-wrapper"
      v-if="group_options.indexOf(this.sel_group)>=0">
        <div class="item-group-list-row e-d-flex e-p-0">
          <easie-select  :key="re_render" class="e-w-75" v-model="sel_group" :options="group_options">
          </easie-select>
          <span class="e-w-25 e-d-flex e-justify-content-around">
            <span @click="edit_group" class="e-d-flex e-align-items-center hover-text-easie" >
              <font-awesome-icon icon="edit"></font-awesome-icon>
            </span>
            <span @click="delete_group" class="e-d-flex e-align-items-center hover-text-danger">
              <font-awesome-icon icon="trash"></font-awesome-icon>
            </span>
          </span>
        </div>
        <draggable
          @change="new_list"
          :list="group_list[group_options.indexOf(this.sel_group)].data_list"
          :sort="true"
          handle=".data-badge-count"
          ghost-class="ghost">
          <div class="item-group-list-row e-d-flex"
            v-for="(d, index) in data_options"
            :key="index+d+sel_group+re_render">
            <span class="e-d-flex e-align-items-left e-w-75">
              <span class="e-d-flex e-align-items-center data-badge-count e-my-2 e-mx-1">
                {{index+1}}
              </span>
              <span @click="edit_data(index)" class="e-d-flex e-w-75 easiedata-group-el e-p-1">
                <tooltip-label :key="index+d+sel_group+re_render"  class="hover-text-easie" :value="d"></tooltip-label>
              </span>
            </span>
            <span class="e-w-25 e-d-flex e-justify-content-around">
              <span
                @click="edit_data(index)"
                class="e-d-flex e-align-items-center hover-text-easie">
                <font-awesome-icon icon="edit"></font-awesome-icon>
              </span>
              <span @click="delete_data(index)" class="e-d-flex e-align-items-center hover-text-easie">
                <font-awesome-icon icon="trash"></font-awesome-icon>
              </span>
            </span>
          </div>
        </draggable>
      </div>
    </div>
    <div class="compressed-window-wrapper e-text-secondary" v-if="show_options_mode">
      <div @click="show_edit_structure_modal"
        class="item-group-list-elevation e-align-items-center e-mb-1 e-py-2 e-mr-1">
          <span class="e-d-flex e-align-items-center hover-text-easie e-pl-3 e-mb-1">
            <font-awesome-icon icon="database"></font-awesome-icon>
          </span>
      </div>
      <div @click="show_options = !show_options"
      class="item-group-list-data-wrapper e-mr-1"
      v-if="group_options.indexOf(this.sel_group)>=0" >
        <span class="e-d-flex e-align-items-center hover-text-easie e-pl-3 e-pt-2 e-pb-2 e-mb-1">
          <font-awesome-icon :icon="window_mode_icon" aria-hidden="true"></font-awesome-icon>
        </span>
      </div>
    </div>
    <!-- modals -->
    <span>
      <edit-structure-modal
        v-if="show_modal.edit_structure"
        :group_list="group_list"
        :easie_tables_cat="easie_tables_cat"
        @new_data="new_data"
        @new_group_order="new_group_order"
        @new_group_list="new_group_list"
        @close="show_modal.edit_structure=false">
      </edit-structure-modal>
      <edit-data-modal
        v-if="show_modal.edit_data"
        :key="sel_group + '_' +initial_data.name"
        :easie_tables_cat="easie_tables_cat"
        :data_meta="meta_settings.data"
        :initial_group="sel_group"
        :initial_data="initial_data"
        :group_list="group_list"
        @new_event="new_event"
        @new_data="new_data"
        @close="show_modal.edit_data=false"
        @new_item_meta="new_item_meta">
      </edit-data-modal>
      <edit-group-modal
        v-if="show_modal.edit_group"
        :easie_tables_cat="easie_tables_cat"
        :group_meta="meta_settings.group"
        :initial_group="initial_group"
        @new_item_meta="new_group_item_meta"
        @new_event="new_event"
        @new_group="new_group"
        @close="show_modal.edit_group=false">
      </edit-group-modal>
    </span>
  </span>
</template>

<script>
  import draggable from 'vuedraggable';
  // self
  import editDataModal from './modals/edit_data_modal.vue';
  import editGroupModal from './modals/edit_group_modal.vue';
  import editStructureModal from './modals/edit_structure_modal.vue';


  export default {
    name: 'item-data-structure',
    components: {
      'edit-data-modal': editDataModal,
      'edit-group-modal': editGroupModal,
      'edit-structure-modal': editStructureModal,
      'draggable': draggable,
    },
    props:{
      easie_tables_cat:{
        default: () => { return [] }
      },
      value:{required:true},
      meta_settings:{required:true},
      show_opts:{default:true}
    },
    data(){
      return {
        show_options: this.show_opts,
        initial_group: {},
        initial_data: {},
        show_modal:{
          edit_structure: false,
          edit_data: false,
          edit_group: false
        },
        group_opt: '',
        group_list: this.value,
        sel_group: '',
        re_render: 0,
      }
    },
    computed:{
      show_options_mode(){
        return !this.show_options
      },
      window_mode_icon(){
        if(this.show_options){
          return 'angle-double-left';
        }
        return 'angle-double-right';
      },
      group_options(){
        this.re_render;
        return this.group_list.map(group =>{
          return group.name;
        })
      },
      data_options(){
        this.re_render;
        let group_index = this.group_options.indexOf(this.sel_group);
        if(group_index >=0){
          return this.group_list[group_index].data_list.map(data=>{
            return data.name;
          })
        }
        return [];
      }
    },
    methods:{
      emit_new_structure(){
        this.$emit('input', this.group_list);
        this.$notify({'text': 'Aplicado!', 'type': 'success'});
        this.re_render ++;
      },
      edit_data(index){
        let group_index = this.group_options.indexOf(this.sel_group);
        this.initial_data = this.group_list[group_index].data_list[index];
        this.show_modal.edit_data = true;
      },
      edit_group(){
        let group_index = this.group_options.indexOf(this.sel_group);
        this.initial_group = this.group_list[group_index];
        this.show_modal.edit_group = true;
      },
      new_group(g){
        let group_index = this.group_options.indexOf(this.sel_group);
        this.group_list[group_index] = g['group'];
        this.group_opt = g['group']['name'];
        this.initial_group = this.group_list[group_index];
        this.emit_new_structure();
      },
      delete_group(){
        let group_index = this.group_options.indexOf(this.sel_group);
        this.group_list.splice(group_index, 1);
        this.emit_new_structure()
      },
      delete_data(index){
        let group_index = this.group_options.indexOf(this.sel_group);
        this.group_list[group_index].data_list.splice(index, 1);
        this.emit_new_structure();
      },
      new_data(d){
        if(d['modal'] == 'edit_structure'){
          let group_index = this.group_options.indexOf(d['group']);
          if(group_index < 0){
            this.group_list.push({
              name: d['group'],
              data_list:[d['data']],
              rule: '',
              table_source: '',
              sort: 'manual',
              item_meta: {}
            })
            // data and group added
            this.emit_new_structure()
            return;
          }
          else{
            let new_group_options = this.group_list[group_index].data_list.map(data=>{
              return data.name;
            })
            let d_index = new_group_options.indexOf(d['data'].name)
            if(d_index >=0){
              this.group_list[group_index].data_list[d_index] = d['data'];
              // data altered in group
              this.emit_new_structure()
              return;
            }
            else{
              this.group_list[group_index].data_list.push(d['data']);
              // data added to group
              this.emit_new_structure()
              return;
            }
          }
        }
        if(d['modal'] == 'edit_data'){
          let group_index = this.group_options.indexOf(d['group']);
          let old_group_index = this.group_options.indexOf(d['initial_group']);
          let old_data_index = this.data_options.indexOf(d['initial_data'].name);
          let data_name = this.initial_data.name
          let data_index = this.data_options.indexOf(data_name);
          let key_list = [group_index, 'data_list', data_index]
          // update name
          this.apply_value_data(
          data_name, group_index, key_list, d['apply'], d['data'], 'name');
          // update operation
          this.apply_value_data(
          data_name, group_index, key_list, d['apply'], d['data'], 'operation');

          if(group_index == old_group_index){
            // same group
            this.group_list[group_index].data_list[old_data_index] = d['data'];
            // data altered
            this.emit_new_structure()
            return;
          }
          else{
            this.group_list[old_group_index].data_list.splice(old_data_index, 1);
            let new_group_options = this.group_list[group_index].data_list.map(data=>{
              return data.name;
            })

            let d_index = new_group_options.indexOf(d['data'].name)
            if(d_index >=0){
              // data transfered
              this.group_list[group_index].data_list[d_index] = d['data'];
              this.emit_new_structure()
              return;
            }
            else{
              // data transfered
              this.group_list[group_index].data_list.push(d['data']);
              this.emit_new_structure()
              return;
            }
          }

        }
      },
      new_item_meta(d){
        let data_name = this.initial_data.name
        let group_index = this.group_options.indexOf(this.sel_group);
        let data_index = this.data_options.indexOf(data_name);
        let key_list = [group_index, 'data_list', data_index, 'item_meta']
        this.apply_value_data(
          data_name, group_index, key_list, d['apply'], d.item_meta, d['key']
        );
        if (d['apply'] == 'all'){
          this.new_group_item_meta(d);
        }
        this.emit_new_structure();

      },
      apply_value_group(group_index, key_list, apply, value, value_key){
        if(apply == 'self'){
          this.$recursive_set_key(this.group_list, key_list, value);
          return;
        }
        if(apply == 'all'){
          this.group_list = this.group_list.map(g => {
            let g_key_list = key_list.slice(1);
            this.$recursive_set_key(g, g_key_list, value);
            return g;
          });
          return;
        }
      },
      apply_value_data(data_name, group_index, key_list, apply, value, value_key){
        if(apply == 'self'){
          this.$recursive_set_key(this.group_list, key_list, value);
          return;
        }
        if(apply == 'group'){
          this.group_list[group_index].data_list = this.group_list[group_index].data_list.map(data => {
            let g_key_list = key_list.slice(3).concat([value_key])
            this.$recursive_set_key(data, g_key_list, value[value_key]);
            return data;
          })
          return;
        }
        if(apply == 'data'){
          this.group_list = this.group_list.map(group => {
            group.data_list = group.data_list.map(data => {
              if(data.name == data_name){
                let g_key_list = key_list.slice(3).concat([value_key])
                this.$recursive_set_key(data, g_key_list, value[value_key]);
              }
              return data
            })
            return group;
          })
          return;
        }
        if(apply == 'all'){
          this.group_list = this.group_list.map(group => {
            group.data_list = group.data_list.map(data => {
              let g_key_list = key_list.slice(3).concat([value_key])
              this.$recursive_set_key(data, g_key_list, value[value_key]);
              return data;
            })
            return group;
          })
          return;
        }
      },
      new_group_item_meta(d){
        let group_index = this.group_options.indexOf(this.sel_group);
        let key_list = [group_index, 'item_meta'];
        this.group_list[group_index].item_meta = d.item_meta;
        this.initial_group = this.group_list[group_index];
        this.apply_value_group(
          group_index, key_list, d['apply'], d.item_meta, d['key']
        );
        this.emit_new_structure();
      },
      new_event(e){
        let data_name = this.initial_data.name
        let group_index = this.group_options.indexOf(this.sel_group);
        let data_index = this.data_options.indexOf(data_name);

        let d = e.event;
        if(e.el_type == 'data'){
          let key_list = [group_index, 'data_list', data_index, 'events'];
          this.apply_value_data(
            data_name, group_index, key_list, d['apply'], d['event'], d['key']
          )
          this.emit_new_structure()
          return;
        }
        if(e.el_type == 'group'){
          let key_list = [group_index, 'events'];
          this.apply_value_group(
            group_index, key_list, d['apply'], d['event'], d['key']
          )
          this.emit_new_structure()
          return;
        }
      },
      new_list(){
        this.emit_new_structure()
      },
      new_group_order(data){
        this.group_list = data['group_list'];
        this.emit_new_structure();
      },
      new_group_list(group_list){
        this.group_list = group_list;
        this.emit_new_structure();
      },
      show_edit_structure_modal(){
        this.show_modal.edit_structure = true;
      }
    },
    watch:{
      group_options(){
        if(this.group_options.indexOf(this.sel_group)<0){
          this.sel_group = this.group_options[0];
        }
      },
      sel_group(){
        if(!this.sel_group){
          if(!this.group_opt){
            this.sel_group = this.group_options[0];
          }
          else{
            this.sel_group = this.group_opt;
            this.group_opt = '';
          }
        }
      },
      show_options(){
        this.$emit('change_mode');
      }
    }
  }
</script>

<style lang="scss">

  .data-badge-count {
    cursor:grab !important;
    padding: 0px 8px;
    font-size: 12px;
    font-weight: bold;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    background-color: rgba(105,105,105, 0.7);
    border-radius: 10px;
  }
  .item-group-list-elevation {
    box-shadow: 1px 1px 3px 3px #ccc;
    background-color: rgba(36,134,190, 0.3);
    border-radius:3px;
    box-sizing:border-box;
    font-size:14px;
    font-weight:300;
    position:relative;
    color:#696969;
  }

  .item-group-list-elevation:hover {
    background-color: rgba(36,134,190, 0.4);
    box-shadow: 1px 1px 3px 3px #2486be;
    cursor:pointer;
    color:#2486be;
  }
  .item-group-list-elevation:hover label {
    color:#2486be;
    cursor:pointer;
  }

  .easie-group-sel-btn {
    border: 0px;
  }

  .easiedata-group-label {
    width: 75%;
    margin-right:4px;
  }

  .item-group-list-wrapper {
    min-width:270px;
    max-width:270px;
    background-color: #fff;
  }

  .compressed-window-wrapper {
    min-width:50px;
    max-width:50px;
    background-color: #fff;
  }


  .easiedata-group-el {
    /*border: 1px solid #ddd;*/
    white-space: nowrap;
    line-height:1.7;
  }

  .item-group-list-row {
    border-bottom: 1px solid #ddd;
  }

  .item-group-list-data-wrapper {
    box-shadow: 1px 1px 3px 3px #ddd;

  }

</style>
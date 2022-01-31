<template>
  <div>
    <div v-if="init_components" class="e-d-flex">
      <template  v-for="(group, i) in group_list">
        <item-tree-select
          @new_state="new_state({...$event, index:i})"
          :group_item_meta="group.item_meta"
          :group_rule="group.rule"
          :group_name="group.name"
          :options="tree_select_options[group.name]"
          :rule_ref="rule_ref[group.name]"
          :key="group.name+'_'+reload_select">
        </item-tree-select>
      </template>
    </div>
    <div v-if="edit_mode" class="e-d-flex e-justify-content-end e-mt-4">
      <button
        v-if="edit_mode"
        class="e-ml-2 e-btn e-btn-outline-secondary"
        @click="$emit('save_component', {
          'component_key': component_key,
          item_data:{
            group_list:group_list,
            item_meta: item_meta
          }})"> Salvar
          <font-awesome-icon icon="save"></font-awesome-icon>
      </button>
    </div>
  </div>
</template>

<script>
  import itemTreeSelect from './item_tree_select.vue';
    const default_group_meta = {
    'icon_info':{
      'show': false,
      'v-tooltip':{
        'container': 'body',
        'show': false,
        'placement': 'right',
        'delay':  { 'show': 100, 'hide': 100 },
        'trigger': 'hover',
        'content': `<div><label>easie tooltip</label></div>`
      }
    },
    'label': {
      'color': '#696969',
      'font-size': '18px',
      'font-weight': 'bold',
      'font-family': 'sans-serif'
    },
    'label_tooltip':{
      'show': false,
      'v-tooltip':{
        'container': 'body',
        'show': false,
        'placement': 'right',
        'delay':  { 'show': 100, 'hide': 100 },
        'trigger': 'hover',
        'content': `<div><label>easie tooltip</label></div>`
      }
    },
    'val': null,
    'select_bind': {
      'searchable': false,
      'clearable': false,
      'multiple': false
    }
  }

  export default {
    name: 'board-tree-select',
    components:{
      itemTreeSelect
    },
    props: {
      board_state: {required: false},
      board_filters: {required: false},
      values_function: {required:false},
      save_item: { default: true },
      edit_mode: { default: true },
      component_key: { default: '' },
      value: {
        type: Object,
        default: function() {
          return {
            group_list: [],
            item_meta: {},
            filter_list: []
          }
        }
      }
    },
    data(){
      return {
        init_components: false,
        rules: {},
        values: {},
        item_meta: {},
        group_list: this.value.group_list,
        reload_select: 0,
        val: '',
        tree_select_options: [],
        rule_ref: {}
      }
    },
    mounted(){
      this.init();
    },
    methods:{
      get_opts(){
        let opts = {}
        let opts_ref = {}
        this.group_list.map(g =>{
          opts_ref[g.name] = {}
          opts[g.name] = [{
            'id': g.name, 'label': g.name, 'children': g.data_list.map(d => {
              opts_ref[g.name][d.name] = d.rule;
              return {'id': d.name, 'label': d.name}
            })
          }]
        })
        this.tree_select_options = opts;
        this.rule_ref = opts_ref;
      },
      init(){
        this.group_list = this.value.group_list;
        this.get_opts()
        if(this.group_list.length){
          this.load_group_list_defaults()
          let component_js = this.$get_json_key(['component_js'], this.value, null);
          if(component_js != null){
            component_js = new Function(component_js)();
            component_js(this, () => {})
          }
          this.reload_select ++;
        }
      },
      resize(){},
      reload(){
        let component_js = this.$get_json_key(['component_js'], this.value, null);
        if(component_js != null){
          component_js =  new Function(component_js)();
          component_js(this, () => {})
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
      },
      load_group_list_defaults(){
        this.group_list = this.group_list.map(group =>{
          group['item_meta'] = this.$recursive_merge(group['item_meta'], {...default_group_meta});
          return group
        });
        this.$emit('upd_group_list', this.group_list);
        this.init_components = true;
      },
    }
  }
</script>

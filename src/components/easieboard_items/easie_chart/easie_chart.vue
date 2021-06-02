<template>
  <div class="e-d-flex e-flex-column" ref="component_wrapper" style="width: 100%; height:100%; position:relative">
    <easie-echart
      v-if="reload_chart>0"
      class="e-flex-grow-1"
      @clicked_series="easiedata_clicked"
      :key="reload_chart"
      :echarts_json="echarts_json"
      :upd_chart_size="upd_chart_size"
      >
    </easie-echart>
    <div>
      <chart-menu-tools
        ref="c_menu_tools"
        @save_chart="$emit('save_component', {'component_key':component_key, item_data:{
              group_list:group_list,
              item_meta:item_meta,
              filter_list:{}
            }})"
        @input="get_group_list_values"
        v-model="item_meta"
        :edit_mode="edit_mode"
        :save_chart="save_item"
        >
      </chart-menu-tools>
    </div>
  </div>
</template>

<script>
  import easie_echart from './easie_echart.vue';
  import chart_menu_tools from './chart_menu_tools.vue';
  import { default_data_meta, default_chart_meta, default_echarts_json, default_toolbox, DEFAULT_DATA_COLORS, COLOR_KEY_REF } from './meta/meta'

  export default {
    name: 'easie-chart',
    components:{
      'easie-echart': easie_echart,
      'chart-menu-tools': chart_menu_tools
    },
    props: {
      board_state: {required: false},
      board_filters: {required: false},
      save_item: { default: true },
      edit_mode: { default: true },
      component_key: { default: '' },
      values_function: {
        type: Function,
        default: function() {
          this.group_list_values = {}
        }
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
        group_list: this.value.group_list,
        item_meta: this.$recursive_merge(this.value.item_meta, {...default_chart_meta}),
        group_list_values: {},
        echarts_json: {...default_echarts_json },
        new_complete_data: 0,
        reload_chart: 0,
        upd_chart_size: 0,
        easiedata_items: {},
        colors_ref: {}
      }
    },
    computed:{
      group_options(){
        return this.group_list.map(group =>{
          return group.name;
        })
      }
    },
    methods:{
      load_group_list_defaults(){
        this.colors_ref = {}
        this.group_list = this.group_list.map(group => {
          this.easiedata_items[group.name] = {};
          group['item_meta'] = {};
          group['data_list'] = group.data_list.map(data => {
            data['item_meta'] = this.$recursive_merge(data['item_meta'], default_data_meta);
            let color = this.$get_json_key(COLOR_KEY_REF, data['item_meta'], '');
            if(color == ''){
              this.$recursive_set_key(data['item_meta'], COLOR_KEY_REF, this.get_easie_color(data['name']));
            }
            else {
              this.colors_ref[data['name']] = color;
            }

            this.easiedata_items[group['name']][data['name']] = data['item_meta'];
            return data;
          })
          return group
        });
        this.$emit('upd_group_list', this.group_list);
      },
      mount_pie_chart_json(){
        this.echarts_json = {...default_echarts_json, ...this.item_meta.extra}
        let idx_groups = []
        let idx_subgroups = []
        for (let group in this.group_list_values){
          if (!idx_groups.includes(group) ){
            idx_groups.push(group)
          }
          for (let data in this.group_list_values[group]){
            if (!idx_subgroups.includes(data)) {
              idx_subgroups.push(data)
            }
          }
        }
        let centers = []
        for(let i in idx_groups){
          let center = this.strp([this.i_pos(i, idx_groups.length), 50])
          centers.push(center)
        }
        this.echarts_json['title'] = []
        let title = {
          'text': this.item_meta['chart_title'],
          'subtext': this.item_meta['chart_subtitle'],
          ...this.item_meta['title_style'],
        }
        this.echarts_json['title'].push(title)
        for(let group in idx_groups){
          let group_name = idx_groups[group]
          let group_title = {
            'text': group_name,
            'left': centers[group][0],
            'top': '74%',
            'textAlign': 'center'
          }
          this.echarts_json['title'].push(group_title);
        }

        this.echarts_json['series'] = []
        for (let group in idx_groups){
          let group_name = idx_groups[group]
          let item_data = {}
          let item_group = {
            'name': group_name,
            'type': this.item_meta['chart_type'],
            'center': centers[group],
            'radius': [70, 90],
            'data': [],
          }
          for (let subgroup in idx_subgroups){
            let data_name = idx_subgroups[subgroup]
            let value_data = this.group_list_values[group_name][data_name]
            item_data = {
              'name': data_name,
              'value': value_data,
              ...this.$get_json_key([group_name, data_name, 'data'], this.easiedata_items, {}),
              ...this.$get_json_key([group_name, data_name, 'series'], this.easiedata_items, {}),
            }
            item_group['data'].push(item_data)
          }
          this.echarts_json['series'].push(item_group)
        }
        let toolbox = default_toolbox
        toolbox['feature']['saveAsImage']['name'] = [
        'easie', this.item_meta['chart_title'], 'img'].join('_')
        this.echarts_json['toolbox'] = toolbox

        this.echarts_json['tooltip'] = {
          'show': this.item_meta['t_tooltip']['show'],
          'trigger': 'item',
          'formatter': '{a} <br/>{b} : {c} ({d}%)'
        }

        this.echarts_json['legend'] = {
          ...this.item_meta['legend_style']
        }
      },
      mount_echarts_json(){
        this.echarts_json = {...default_echarts_json, ...this.item_meta.extra}
        let stack_type = ''
        if (this.item_meta['stack']) {
          stack_type = 'apply'
        }

        let idx_groups = []
        let idx_subgroups = []
        for (let group in this.group_list_values){
          if (!idx_groups.includes(group) ){
            idx_groups.push(group)
          }
          for (let data in this.group_list_values[group]){
            if (!idx_subgroups.includes(data)) {
              idx_subgroups.push(data)
            }
          }
        }

        this.echarts_json['series'] = [];

        for (let subgroup in idx_subgroups){
          let data_name = idx_subgroups[subgroup]
          let item_data =  {
            'name': data_name,
            'data': [],
            'stack': this.item_meta['stack'],
            'type': this.item_meta['chart_type']
          }
          let group_name = '';
          for (let group in idx_groups){
            group_name = idx_groups[group]
            let value_data = this.group_list_values[group_name][data_name]
            let item_group = {
              'name': group_name,
              'value': value_data,
              ...this.$get_json_key([group_name, data_name, 'data'], this.easiedata_items, {}),
            }
            item_data['data'].push(item_group)
          }
          this.echarts_json['series'].push({
            ...item_data,
            ...this.$get_json_key([group_name, data_name, 'series'], this.easiedata_items, {})
          })
        }

        this.echarts_json['title'] = {
          'text': this.item_meta['chart_title'],
          'subtext': this.item_meta['chart_subtitle'],
          ...this.item_meta['title_style']
        }

        let toolbox = default_toolbox
        toolbox['feature']['saveAsImage']['name'] = [
        'easie', this.item_meta['chart_title'], 'img'].join('_')
        this.echarts_json['toolbox'] = toolbox

        this.echarts_json['tooltip']['show'] = this.item_meta['t_tooltip']['show']
        this.echarts_json['tooltip']['axisPointer']['label']['show'] = this.item_meta['t_tooltip']['axis_pointer']

        this.echarts_json['legend'] = {
          'data': idx_subgroups,
          ...this.item_meta['legend_style']
        }

        let axis = ['yAxis', 'xAxis']
        if (this.item_meta['inverted_axis']){
            axis = ['xAxis', 'yAxis']
        }
        this.echarts_json[axis[0]] =[{
          type: 'value',
          ...this.item_meta['value_axis_style']
        }]
        this.echarts_json[axis[1]] = [{
          type: 'category',
          'boundaryGap': (this.item_meta['chart_type'] == 'bar'),
          data: idx_groups,
          ...this.item_meta['category_axis_style']
        }]
        this.echarts_json = {
          ...this.echarts_json,
          ...this.item_meta.extra
        }

      },
      i_pos(i, g_len){
        return parseInt(((100/g_len)/2) + i*(100/g_len))
      },
      strp(numbers){
        return [numbers[0].toString() + '%', numbers[1].toString() + '%']
      },
      getRandomRgb() {
        var num = Math.round(0xffffff * Math.random());
        var r = num >> 16;
        var g = num >> 8 & 255;
        var b = num & 255;
        return 'rgb(' + r + ', ' + g + ', ' + b + ')';
      },
      get_easie_color(name){
        if (!(name in this.colors_ref)) {
            let idx = Object.keys(this.colors_ref).length;
            if (idx >= DEFAULT_DATA_COLORS.length){
              let list_color_ref = [this.colors_ref]
              let r_color = list_color_ref[0];
              while(list_color_ref.some(e => this.colors_ref[e] == r_color)){
                r_color = this.getRandomRgb()
                this.colors_ref[name] = r_color
              }
            }
            else{
              this.colors_ref[name] = DEFAULT_DATA_COLORS[idx]
            }
        }
        return this.colors_ref[name];
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
          let component_js = this.$get_json_key(['component_js'], this.value, null);

          if(component_js==null){
            loading.hide();
            this.apply_group_list_values();
            return;
          }
          else{
            component_js =  new Function(component_js)();
            component_js(this, () => {
              loading.hide();
              this.apply_group_list_values();
            });
          }

        })
      },
      apply_group_list_values(){
        this.load_group_list_defaults();
        if(this.item_meta['chart_type'] == 'pie'){
          this.mount_pie_chart_json()
        }
        else {
          this.mount_echarts_json();
        }
        this.reload_chart++;
        this.resize();
      },
      easiedata_clicked(data){
        let group_index = this.group_options.indexOf(data['group']);
        let data_options = this.group_list[group_index].data_list.map(data=>{
          return data.name;
        })
        let data_index = data_options.indexOf(data['data'])
        let data_event = this.group_list[group_index].data_list[data_index].events;
        if('click' in data_event){
          let content_name = this.$get_json_key(['click', 'content_name'], data_event, '');
          if(content_name.length){
            let rules = [];
            let group = this.group_list[group_index];
            if(group.rule.length){
              rules.push(group.rule);
            }
            let data = this.group_list[group_index].data_list[data_index];
            if(data.rule.length){
              rules.push(data.rule);
            }
            let rule = rules.join(' AND ');
            this.trigger_event({
              'index_map': [group_index, data_index],
              'event': event['click'],
              'apply_rule': rule
            });
            return;
          }
        }
        let group_event = this.group_list[group_index].events;
        
        if('click' in group_event){
          let content_name = this.$get_json_key(['click', 'content_name'], group_event, '');
          if(content_name.length){
            let group = this.group_list[group_index];
            this.trigger_event({
                'index_map': [group_index],
                'event': group_event['click'],
                'apply_rule': group.rule
            })
            return;
          }
        }
      },
      trigger_event(data){
        this.$emit('trigger_event', data);
      },
      resize(){
        this.upd_chart_size ++;
      },
      reload(){
        this.group_list = this.value.group_list;
        this.get_group_list_values()
      }
    }
  }
</script>
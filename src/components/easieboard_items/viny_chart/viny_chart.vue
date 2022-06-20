<template>
  <div
    class="e-d-flex e-flex-column"
    ref="component_wrapper"
    style="width: 100%; height: 100%; position: relative"
  >
    <viny-echart
      v-if="reload_chart > 0"
      class="e-flex-grow-1"
      @clicked_series="easiedata_clicked"
      :key="reload_chart"
      :echarts_json="echarts_json"
      :upd_chart_size="upd_chart_size"
    />
    <viny-menu-tools
      v-show="edit_mode"
      ref="c_menu_tools"
      @save_chart="
        $emit('save_component', {
          component_key: component_key,
          item_data: {
            group_list: group_list,
            item_meta: item_meta,
            filter_list: {},
          },
        })
      "
      @input="get_group_list_values"
      v-model="item_meta"
      :save_chart="save_item"
    />
  </div>
</template>

<script>
import vinyEchart from './viny_echart.vue';
import vinyMenuTools from './viny_menu_tools.vue';
import {
  default_data_meta,
  default_chart_meta,
  default_echarts_json,
  default_toolbox,
  DEFAULT_DATA_COLORS,
  COLOR_KEY_REF,
} from './meta/meta';

export default {
  components: { vinyEchart, vinyMenuTools },
  props: {
    board_state: { required: false },
    board_filters: { required: false },
    save_item: { default: true },
    edit_mode: { default: true },
    component_key: { default: '' },
    values_function: {
      type: Function,
      default: function () {
        this.group_list_values = {};
      },
    },
    value: {
      type: Object,
      default: function () {
        return {
          group_list: [],
          item_meta: {},
        };
      },
    },
  },
  data() {
    return {
      group_list: this.value.group_list,
      item_meta: this.$recursive_merge(this.value.item_meta, { ...default_chart_meta }),
      group_list_values: {},
      echarts_json: { ...default_echarts_json },
      new_complete_data: 0,
      reload_chart: 0,
      upd_chart_size: 0,
      easiedata_items: {},
      colors_ref: {},
    };
  },
  computed: {
    group_options() {
      return this.group_list.map(group => group.name);
    },
  },
  methods: {
    load_group_list_defaults() {
      this.colors_ref = {};
      this.group_list = this.group_list.map(group => {
        this.easiedata_items[group.name] = {};
        group['item_meta'] = {};
        group['data_list'] = group.data_list.map(data => {
          data['item_meta'] = this.$recursive_merge(
            data['item_meta'],
            default_data_meta
          );
          this.parse_color(data);
          this.easiedata_items[group['name']][data['name']] = data['item_meta'];
          return data;
        });
        return group;
      });
      this.$emit('upd_group_list', this.group_list);
    },
    parse_color(data) {
      const color = this.$get_json_key(COLOR_KEY_REF, data['item_meta'], '');
      if (color == '') {
        this.$recursive_set_key(
          data['item_meta'],
          COLOR_KEY_REF,
          this.get_easie_color(data['name'])
        );
        return;
      }
      this.colors_ref[data['name']] = color;
    },
    get_easie_color(name) {
      if (!(name in this.colors_ref)) {
        const idx = Object.keys(this.colors_ref).length;
        if (idx >= DEFAULT_DATA_COLORS.length) {
          const list_color_ref = [this.colors_ref];
          let r_color = list_color_ref[0];
          while (list_color_ref.some(e => this.colors_ref[e] == r_color)) {
            r_color = this.getRandomRgb();
            this.colors_ref[name] = r_color;
          }
        } else {
          this.colors_ref[name] = DEFAULT_DATA_COLORS[idx];
        }
      }
      return this.colors_ref[name];
    },
    getRandomRgb() {
      var num = Math.round(0xffffff * Math.random());
      var r = num >> 16;
      var g = (num >> 8) & 255;
      var b = num & 255;
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    },
    mount_echarts_json() {
      this.echarts_json = { ...default_echarts_json, ...this.item_meta.extra };

      const [idx_groups, idx_subgroups] = this.split_idx_groups_subgroups();
      this.insert_groups_to_echart_json(idx_groups, idx_subgroups);

      this.echarts_json['title'] = {
        text: this.item_meta['chart_title'],
        subtext: this.item_meta['chart_subtitle'],
        ...this.item_meta['title_style'],
      };

      const toolbox = default_toolbox;
      toolbox['feature']['saveAsImage']['name'] = [
        'easie',
        this.item_meta['chart_title'],
        'img',
      ].join('_');
      this.echarts_json['toolbox'] = toolbox;

      this.echarts_json['tooltip']['show'] = this.item_meta['t_tooltip']['show'];
      this.echarts_json['tooltip']['axisPointer']['label']['show'] =
        this.item_meta['t_tooltip']['axis_pointer'];

      this.echarts_json['legend'] = {
        data: idx_subgroups,
        ...this.item_meta['legend_style'],
      };

      const axis = this.item_meta['inverted_axis']
        ? ['xAxis', 'yAxis']
        : ['yAxis', 'xAxis'];
      this.echarts_json[axis[0]] = [
        {
          type: 'value',
          ...this.item_meta['value_axis_style'],
        },
      ];
      this.echarts_json[axis[1]] = [
        {
          type: 'category',
          boundaryGap: this.item_meta['chart_type'] == 'bar',
          data: idx_groups,
          ...this.item_meta['category_axis_style'],
        },
      ];
      this.echarts_json = {
        ...this.echarts_json,
        ...this.item_meta.extra,
      };
    },
    insert_groups_to_echart_json(idx_groups, idx_subgroups) {
      this.echarts_json['series'] = [];

      for (const subgroup in idx_subgroups) {
        const data_name = idx_subgroups[subgroup];
        const item_data = {
          name: data_name,
          data: [],
          stack: this.item_meta['stack'],
          type: this.item_meta['chart_type'],
        };
        let group_name = '';
        for (const group in idx_groups) {
          group_name = idx_groups[group];
          const value_data = this.group_list_values[group_name][data_name];
          const item_group = {
            name: group_name,
            value: value_data,
            ...this.$get_json_key(
              [group_name, data_name, 'data'],
              this.easiedata_items,
              {}
            ),
          };
          item_data['data'].push(item_group);
        }
        this.echarts_json['series'].push({
          ...item_data,
          ...this.$get_json_key(
            [group_name, data_name, 'series'],
            this.easiedata_items,
            {}
          ),
        });
      }
    },
    split_idx_groups_subgroups() {
      let idx_groups = [];
      let idx_subgroups = [];
      for (const group in this.group_list_values) {
        if (!idx_groups.includes(group)) {
          idx_groups.push(group);
        }
        for (const data in this.group_list_values[group]) {
          if (!idx_subgroups.includes(data)) {
            idx_subgroups.push(data);
          }
        }
      }
      return [idx_groups, idx_subgroups];
    },
    get_group_list_values() {
      const loading = this.$loading.show({
        container: this.$el,
      });
      this.values_function(this, loading, data => {
        if (data.error) {
          this.$default_error_handle(data.data);
          return;
        }
        this.group_list_values = data.data.group_list_values;
        let component_js = this.$get_json_key(['component_js'], this.value, null);
        if (component_js == null) {
          loading.hide();
          this.apply_group_list_values();
          return;
        }
        component_js = new Function(component_js)();
        component_js(this, () => {
          loading.hide();
          this.apply_group_list_values();
        });
      });
    },
    apply_group_list_values() {
      this.load_group_list_defaults();
      if (this.item_meta['chart_type'] == 'pie') {
        // this.mount_pie_chart_json();
        console.log('pie');
      } else {
        this.mount_echarts_json();
      }
      this.reload_chart++;
      this.resize();
    },
    easiedata_clicked(data) {
      const group_index = this.group_options.indexOf(data['group']);
      const data_options = this.group_list[group_index].data_list.map(
        data => data.name
      );

      const data_index = data_options.indexOf(data['data']);
      const data_event = this.group_list[group_index].data_list[data_index].events;
      if ('click' in data_event) {
        this.trigger_data_event(data_index, data_event);
        return;
      }

      const group_event = this.group_list[group_index].events;
      if ('click' in group_event) {
        this.trigger_group_event(group_index, group_event);
        return;
      }
    },
    trigger_data_event(data_index, data_event) {
      const content_name = this.$get_json_key(
        ['click', 'content_name'],
        data_event,
        ''
      );
      if (content_name.length) {
        const rules = [];
        const group = this.group_list[group_index];
        if (group.rule.length) {
          rules.push(group.rule);
        }
        const data = this.group_list[group_index].data_list[data_index];
        if (data.rule.length) {
          rules.push(data.rule);
        }
        const rule = rules.join(' AND ');
        this.$emit('trigger_event', {
          index_map: [group_index, data_index],
          event: event['click'],
          apply_rule: rule,
        });
      }
    },
    trigger_group_event(group_index, group_event) {
      const content_name = this.$get_json_key(
        ['click', 'content_name'],
        group_event,
        ''
      );
      if (content_name.length) {
        let group = this.group_list[group_index];
        this.$emit('trigger_event', {
          index_map: [group_index],
          event: group_event['click'],
          apply_rule: group.rule,
        });
      }
    },
    resize() {
      this.upd_chart_size++;
    },
    reload() {
      this.group_list = this.value.group_list;
      this.get_group_list_values();
    },
  },
};
</script>

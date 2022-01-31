import {indicator_data_c_order, indicator_data_c_data, indicator_data_key_ref} from '../../easieboard_items/easie_indicator/meta/data_meta';
import {indicator_group_c_order, indicator_group_c_data, indicator_group_key_ref} from '../../easieboard_items/easie_indicator/meta/group_meta';
import {indicator_c_order, indicator_c_data, indicator_key_ref} from '../../easieboard_items/easie_indicator/meta/indicator_meta';

import {chart_data_c_order, chart_data_c_data, chart_data_key_ref} from '../../easieboard_items/easie_chart/meta/data_meta';
import {chart_c_order, chart_c_data, chart_key_ref} from '../../easieboard_items/easie_chart/meta/chart_meta';


import {select_group_c_order, select_group_c_data, select_group_key_ref} from '../../easieboard_items/board_select/meta/group_meta';

import {tree_select_group_c_order, tree_select_group_c_data, tree_select_group_key_ref} from '../../easieboard_items/board_tree_select/meta/group_meta';


export const meta_settings = {
  'indicator': {
    'data':{ 'c_order': indicator_data_c_order, 'c_data': indicator_data_c_data, 'key_ref': indicator_data_key_ref
    },
    'group':{ 'c_order': indicator_group_c_order, 'c_data': indicator_group_c_data, 'key_ref': indicator_group_key_ref
    },
    'item_meta':{ 'c_order': indicator_c_order, 'c_data': indicator_c_data, 'key_ref': indicator_key_ref
    }
  },
  'chart': {
    'data':{ 'c_order': chart_data_c_order, 'c_data': chart_data_c_data, 'key_ref': chart_data_key_ref
    },
    'group':{ 'c_order': [], 'c_data': {}, 'key_ref': []
    },
    'item_meta':{ 'c_order': chart_c_order, 'c_data': chart_c_data, 'key_ref': chart_key_ref
    }
  },
  'select': {
    'group':{
      'c_data': select_group_c_data,
      'c_order': select_group_c_order,
      'key_ref': select_group_key_ref
    },
    'data': {'c_data': {}, 'c_order': {}, 'key_ref': {}
    },
    'item_meta':{'c_data': {}, 'c_order': {},'key_ref': {}}
  },
  'tree_select': {
    'group':{
      'c_data': tree_select_group_c_data,
      'c_order': tree_select_group_c_order,
      'key_ref': tree_select_group_key_ref
    },
    'data': {'c_data': {}, 'c_order': {}, 'key_ref': {}
    },
    'item_meta':{'c_data': {}, 'c_order': {},'key_ref': {}}
  }
}
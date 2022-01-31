import Vue from 'vue';
import * as easieComponents from './components';

let vueasieboard = Vue => {
    Object.values(easieComponents).forEach((easieComponent) => {
        Vue.use(easieComponent);
    })

}

export default vueasieboard;

export { default as itemDataStructure } from './components/item_structure/item_data_structure.vue';
// board items
export { default as boardSelect } from './components/easieboard_items/board_select/board_select.vue';
export { default as boardTreeSelect } from './components/easieboard_items/board_tree_select/board_tree_select.vue';
export { default as easieChart } from './components/easieboard_items/easie_chart/easie_chart.vue';
export { default as easieIndicator } from './components/easieboard_items/easie_indicator/easie_indicator.vue';
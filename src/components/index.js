import itemDataStructure from './item_structure/item_data_structure.vue';

// easieboard Items
import boardSelect from './easieboard_items/board_select/board_select.vue';
import boardTreeSelect from './easieboard_items/board_tree_select/board_tree_select.vue';
import easieChart from './easieboard_items/easie_chart/easie_chart.vue';
import easieIndicator from './easieboard_items/easie_indicator/easie_indicator.vue';

export default Vue => {
  Vue.component(itemDataStructure.name, itemDataStructure)
  // easieboard Items
  Vue.component(boardSelect.name, boardSelect)
  Vue.component(boardTreeSelect.name, boardTreeSelect)
  Vue.component(easieChart.name, easieChart)
  Vue.component(easieIndicator.name, easieIndicator)

}
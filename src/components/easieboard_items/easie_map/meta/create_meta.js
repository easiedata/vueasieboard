export const map_create_meta = {
  label: 'Mapa',
  component: 'easie-map',
  div_style: 'min-height:650px; max-height:650px;',
  values_function: (vm, hide_loading, call_back) => {
    vm.axios.post('/get_e_map_values', {
      component_key: vm.component_key,
      group_list: vm.$group_list_adjust2endpoint(vm.group_list),
      filter_list: vm.board_filters,
      value_configs: vm.item_meta.value_configs
    })
    .then(data => {
      call_back({error: false, data: data.data.data});
    })
    .catch(error => {
      loading.hide()
      call_back({error: true, data: error})
    });
  }
}
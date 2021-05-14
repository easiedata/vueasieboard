export const indicator_create_meta = {
  label: 'Indicador',
  component: 'easie-indicator',
  div_style: '',
  values_function: (vm, loading, call_back) => {
    vm.axios.post('/get_group_list_values', {
      component_key: vm.component_key,
      group_list: vm.$group_list_adjust2endpoint(vm.value.group_list),
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
export const indicator_c_order = {
  'value_configs': [{section: "Visualização", components: ['show_zeros', 'show_null'], show: true}, {section: "Conversão", components: ['null_to_zero'], show: true}]
}

export const indicator_c_data = {
  show_zeros: {
    v: true,
    component: 'easie-switch',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['value_configs', 'show_zeros'],
    bind: { s_label: 'Mostrar zeros'}
  },
  show_null: {
    v: true,
    component: 'easie-switch',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['value_configs', 'show_null'],
    bind: { s_label: 'Mostrar nulos'}
  },
  null_to_zero: {
    v: true,
    component: 'easie-switch',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['value_configs', 'null_to_zero'],
    bind: { s_label: 'Transformar nulos em zeros'}
  }
}
export const indicator_key_ref = {
  'value_configs': 'Configuração de Valores'
}
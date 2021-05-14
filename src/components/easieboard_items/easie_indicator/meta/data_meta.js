export const indicator_data_c_order = {
  'label': [{section: "Estilo", components: ['label_color', 'label_font_size'], show: true}]
}

export const indicator_data_c_data = {
  label_color: {
    v: '#696969',
    component: 'easie-sketch-color',
    label: 'Cor',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['label','style','color'],
    bind:{}
  },
  label_font_size: {
    v: '28',
    component: 'easie-form-input',
    label: 'Tamanho Fonte',
    get_value: (v) => (v + 'px'),
    get_value_back: (v) => v,
    key_list: ['label','style','font-size'],
    bind:{type:'number', style:'max-width:150px'}
  }
}

export const indicator_data_key_ref = {
  'label': 'Rótulo Indicador'
}
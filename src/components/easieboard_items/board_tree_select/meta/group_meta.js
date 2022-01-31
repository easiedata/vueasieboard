export const tree_select_group_c_order = {
  'label': [
      {
        section: "Estilo", components: ['label_color', 'label_font_size'],
        show: true
      }
    ],
    'select_bind': [
      {
        section: "Configurações",
        components: ['searchable', 'clearable', 'multiple'], show:true}
  ]
}

export const tree_select_group_c_data = {
  label_color: {
    v: '#696969',
    component: 'easie-sketch-color',
    label: 'Cor',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['label', 'color'],
    bind:{}
  },
  label_font_size: {
    v: '16',
    component: 'easie-form-input',
    label: 'Tamanho Fonte',
    get_value: (v) => (v + 'px'),
    get_value_back: (v) => v,
    key_list: ['label', 'font-size'],
    bind:{type:'number', style:'max-width:150px'}
  },
  searchable: {
    v: true,
    component: 'easie-switch',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['select_bind', 'searchable'],
    bind: { s_label: 'Buscador'}
  },
  clearable: {
    v: true,
    component: 'easie-switch',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['select_bind', 'clearable'],
    bind: { s_label: 'Limpável'}
  },
  multiple:{
    v: false,
    component: 'easie-switch',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['select_bind', 'multiple'],
    bind: { s_label: 'Múltiplo'}
  }
}

export const tree_select_group_key_ref = {
  'label': 'Rótulo Grupo',
  'select_bind': 'Configurações Seletor Ávore'
}
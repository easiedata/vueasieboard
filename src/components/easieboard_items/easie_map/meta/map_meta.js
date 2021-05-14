export const map_c_order = {
  'title_style': [{section: 'Título', components: ['title_text', 'title_color', 'title_font_size'], show: true},{section: 'Subtítulo', components: ['subtitle_text','subtitle_color',
   'subtitle_font_size'], show: true}],

  'visual_map':[{section: 'Configuração', components: ['item_width'], show: true}],

  'value_configs': [{section: "Visualização", components: ['show_zeros', 'show_null'], show: true}, {section: "Conversão", components: ['null_to_zero'], show: true}]
}

export const map_c_data = {
  title_text: {
    v: 'Título',
    component: 'easie-form-input',
    label: 'Texto',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['title', 'text'],
    bind: {}
  },
  title_color: {
    v: '#fff',
    component: 'easie-sketch-color',
    label: 'Cor',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['title','textStyle', 'color'],
    bind: {}
  },
  title_font_size: {
    v: '18',
    component: 'easie-form-input',
    label: 'Tamanho Fonte',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['title', 'textStyle', 'fontSize'],
    bind: {type:'number', style:'max-width:150px'}
  },
  subtitle_text: {
    v: 'Subtítulo',
    component: 'easie-form-input',
    label: 'Texto',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['title', 'subtext'],
    bind: {}
  },
  subtitle_color: {
    v: '#fff',
    component: 'easie-sketch-color',
    label: 'Cor',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['title', 'subtextStyle', 'color'],
    bind: {}
  },
  subtitle_font_size: {
    v: '12',
    component: 'easie-form-input',
    label: 'Tamanho Fonte',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['title', 'subtextStyle', 'fontSize'],
    bind: {type:'number', style:'max-width:150px'}
  },
  item_width:{
    v: '24',
    component: 'easie-form-input',
    label: 'Largura',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['visualMap', 'itemWidth'],
    bind: {type:'number'}
  },
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
export const map_key_ref = {
  'title_style': 'Título',
  'visual_map': 'Legenda',
  'value_configs': 'Configuração de Valores'
}
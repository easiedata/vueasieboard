export const indicator_group_c_order = {
  'label': [{section: "Estilo", components: ['label_color', 'label_font_size'], show: true}],
  'comment': [{section: "Conteúdo", components: ['comment_text'], show:true}, {section: "Estilo", components: ['comment_font_size', 'comment_font_color'], show: true}]
}

export const indicator_group_c_data = {
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
    v: '16',
    component: 'easie-form-input',
    label: 'Tamanho Fonte',
    get_value: (v) => (v + 'px'),
    get_value_back: (v) => v,
    key_list: ['label','style','font-size'],
    bind:{type:'number', style:'max-width:150px'}
  },
  comment_text: {
    v: 'Comentário',
    component: 'easie-form-input',
    label: 'Texto',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['comment','text'],
    bind:{}
  },
  comment_font_size: {
    v: '14',
    component: 'easie-form-input',
    label: 'Tamanho Fonte',
    get_value: (v) => (v + 'px'),
    get_value_back: (v) => v,
    key_list: ['comment','label','style','font-size'],
    bind:{type:'number', style:'max-width:150px'}

  },
  comment_font_color: {
    v: '#696969',
    component: 'easie-sketch-color',
    label: 'Cor',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['comment','label','style','color'],
    bind:{}
  }
}

export const indicator_group_key_ref = {
  'label': 'Rótulo Indicador',
  'comment': 'Comentário'
}
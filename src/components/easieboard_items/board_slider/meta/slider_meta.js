export const slider_c_order = {
  'title': [
    {section: "Título", components: ['title_text'], show: true}
  ]
}

export const slider_c_data = {
  title_text: {
    v: 'Título',
    component: 'easie-textarea',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['title'],
    bind: {}
  }
}
export const slider_key_ref = {
  'title': 'Título'
}
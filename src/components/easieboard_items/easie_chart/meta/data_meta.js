export const chart_data_c_order = {
  'series': [
    {section: 'Série', components:['series_color'], show:true},
  ],
  'data': [
    {section: "Texto", components: ['label_show', 'label_font_size', 'label_position', 'label_formatter'], show: true}, 
    {section: "Ênfase", components: ['emphasis_show', 'emphasis_font_size'], show: true}
  ] 
}

export const chart_data_c_data = {
  series_color:{
    v: '#fff',
    component: 'easie-sketch-color',
    label: 'Cor',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['series', 'itemStyle', 'color'],
    bind:{}
  },
  label_show:{
    v:false,
    component:'easie-switch',
    label: '',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['data', 'label', 'show'],
    bind:{
      s_label: 'Mostrar Rótulo',
    }
  },
  label_font_size: {
    v: '14',
    component: 'easie-form-input',
    label: 'Tamanho Fonte',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['data', 'label', 'fontSize'],
    bind:{type:'number', style:'max-width:150px'}
  },
  label_position:{
    v:'Em cima',
    component: 'easie-select',
    label: 'Posição',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['data', 'label', 'position'],
    bind:{ options:[
      {value:'top', label: 'Em cima'},
      {value:'inside', label: 'Dentro'},
      {value:'center', label: 'Centro'},
      {value:'bottom', label: 'Abaixo'},
      {value:'left', label: 'Esquerda'},
      {value:'right', label: 'Direita'}],
      reduce: option => option.value
    }
  },
  label_formatter:{
    v:'{c}',
    component: 'easie-form-input',
    label: 'Formatação',
    tooltip: {
      classes: ['easie-formatter'],
      placement: 'right',
      delay: { show: 100, hide: 100 },
      trigger: 'hover',
      show: false,
      content:`
      <ul class='formatter-ul'>
        <li><label> Váriaveis:</label></li>
        <li><label>{a} => Nome Dado</label></li>
        <li><label>{b} => Nome Grupo</label></li>
        <li><label>{c} => Valor Dado</label></li>
        <li><label>{d} => % Valor em pizza</label></li>
      </ul>`
    },
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['data', 'label', 'formatter'],
    bind:{}
  },
  emphasis_show:{
    v:false,
    component:'easie-switch',
    label: '',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['data', 'emphasis', 'label', 'show'],
    bind:{ s_label: 'Ênfase Rótulo'}
  },
  emphasis_font_size: {
    v: '24',
    component: 'easie-form-input',
    label: 'Tamanho Fonte',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['data', 'emphasis', 'label','fontSize'],
    bind:{type:'number', style:'max-width:150px'}
  }
}

export const chart_data_key_ref = {
  'series': 'Série do Dado',
  'data': 'Dado'
}
export const chart_c_order = {
  'title_style': [
    {section: 'Título', components: ['title_text', 'title_color', 'title_font_size'], show: true},
    {section: 'Subtítulo', components: ['subtitle_text','subtitle_color','subtitle_font_size'], show: true}
  ],

  'legend_style': [
    {section: "Texto", components: ['legend_color', 'legend_font_size'], show: true},
    {section: "Ítem", components: ['item_height', 'item_width', 'item_gap'], show: true}
  ],

  'value_axis': [
    {section: "Estilo da Linha" , components: ['line_style_color', 'line_style_type', 'line_style_width' ], show: true},
    {section: "Estilo do Marcador", components: ['axis_tick_color', 'axis_tick_width', 'axis_tick_length'], show: true},
    {section: "Estilo do Texto", components:['axis_text_color','axis_text_font_family', 'axis_text_font_size'], show: true},
    {section: "Estilo da Linha Divisória", components: ['split_line_style_color', 'split_line_style_type','split_line_style_width'], show: true}
  ],

  'category_axis': [
    {section: "Estilo da Linha", components: ['category_line_style_color', 'category_line_style_type', 'category_line_style_width'], show: true},
    {section: "Estilo do Marcador" , components: ['category_axis_tick_color', 'category_axis_tick_width', 'category_axis_tick_length'], show: true},
    {section: "Estilo do Texto", components: ['category_axis_text_color','category_axis_text_font_family', 'category_axis_text_font_size'], show: true}
  ],

  'tool_tip': [
    {section: "Interatividade", components: ['show_tool_tip', 'show_axis_pointer'], show: true}
  ],

  'chart_variations': [
    {section: "Variações do Gráfico", components: ['stack_variation', 'inverted_axis_variation'], show: true}
  ],
  
  'value_configs': [
    {section: "Visualização", components: ['show_zeros', 'show_null'], show: true}, 
    {section: "Conversão", components: ['null_to_zero'], show: true}
  ]
}

export const chart_c_data = {
  title_text: {
    v: 'Título',
    component: 'easie-form-input',
    label: 'Texto',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['chart_title'],
    bind: {}
  },
  title_color: {
    v: '#fff',
    component: 'easie-sketch-color',
    label: 'Cor',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['title_style','textStyle', 'color'],
    bind: {}
  },
  title_font_size: {
    v: '18',
    component: 'easie-form-input',
    label: 'Tamanho Fonte',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['title_style', 'textStyle', 'fontSize'],
    bind: {type:'number', style:'max-width:150px'}
  },
  subtitle_text: {
    v: 'Subtítulo',
    component: 'easie-form-input',
    label: 'Texto',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['chart_subtitle'],
    bind: {}
  },
  subtitle_color: {
    v: '#fff',
    component: 'easie-sketch-color',
    label: 'Cor',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['title_style', 'subtextStyle', 'color'],
    bind: {}
  },
  subtitle_font_size: {
    v: '12',
    component: 'easie-form-input',
    label: 'Tamanho Fonte',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['title_style', 'subtextStyle', 'fontSize'],
    bind: {type:'number', style:'max-width:150px'}
  },
  legend_color: {
    v: '#fff',
    component: 'easie-sketch-color',
    label: 'Cor',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['legend_style', 'textStyle', 'color'],
    bind: {}
  },
  legend_font_size: {
    v: '12',
    component: 'easie-form-input',
    label: 'Tamanho Fonte',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['legend_style', 'textStyle', 'fontSize'],
    bind: {type:'number', style:'max-width:150px'}
  },
  item_height:{
    v: '14',
    component: 'easie-form-input',
    label: 'Altura',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['legend_style', 'itemHeight'],
    bind: {type:'number'}
  },
  item_width:{
    v: '25',
    component: 'easie-form-input',
    label: 'Largura',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['legend_style', 'itemWidth'],
    bind: {type:'number'}
  },
  item_gap:{
    v: '10',
    component: 'easie-form-input',
    label: 'Distância',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['legend_style', 'itemGap'],
    bind: {type:'number'}
  },
  line_style_color: {
    v: '#fff',
    component: 'easie-sketch-color',
    label: 'Cor',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['value_axis_style','axisLine', 'lineStyle', 'color'],
    bind:{
    }
  },
  line_style_type: {
    v: 'solid',
    component: 'easie-form-input',
    label: 'Tipo',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['value_axis_style','axisLine', 'lineStyle', 'type'],
    bind:{}
  },
  line_style_width: {
    v: '1',
    component: 'easie-form-input',
    label: 'Largura',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['value_axis_style','axisLine', 'lineStyle', 'width'],
    bind: {type:'number'}
  },
  axis_tick_color: {
    v: '#fff',
    component: 'easie-sketch-color',
    label: 'Cor',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['value_axis_style','axisTick', 'lineStyle', 'color'],
    bind: {}
  },
  axis_tick_width: {
    v: '1',
    component: 'easie-form-input',
    label: 'Largura',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['value_axis_style','axisTick', 'lineStyle', 'width'],
    bind: {type:'number'}
  },
  axis_tick_length: {
    v: '5',
    component: 'easie-form-input',
    label: 'Comprimento',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['value_axis_style','axisTick', 'width'],
    bind: {type:'number'}
  },
  axis_text_color: {
    v: '#fff',
    component: 'easie-sketch-color',
    label: 'Cor',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['value_axis_style','axisLabel', 'color'],
    bind: {}
  },
  axis_text_font_family: {
    v: 'sans-serif',
    component: 'easie-form-input',
    label: 'Fonte',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['value_axis_style', 'axisLabel', 'fontFamily'],
    bind: {}
  },
  axis_text_font_size: {
    v: '14',
    component: 'easie-form-input',
    label: 'Tamanho',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['value_axis_style', 'axisLabel', 'fontSize'],
    bind: {type:'number', style:'max-width:150px'}
  },
  split_line_style_color: {
    v: '#fff',
    component: 'easie-sketch-color',
    label: 'Cor',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['value_axis_style','splitLine', 'lineStyle', 'color'],
    bind: {}
  },
  split_line_style_type: {
    v: 'solid',
    component: 'easie-form-input',
    label: 'Tipo',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['value_axis_style','splitLine', 'lineStyle', 'type'],
    bind: {}
  },
  split_line_style_width: {
    v: '1',
    component: 'easie-form-input',
    label: 'Largura',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['value_axis_style','splitLine', 'lineStyle', 'width'],
    bind: {type:'number'}
  },
  category_line_style_color: {
    v: '#fff',
    component: 'easie-sketch-color',
    label: 'Cor',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['category_axis_style','axisLine', 'lineStyle', 'color'],
    bind: {}
  },
  category_line_style_type: {
    v: 'solid',
    component: 'easie-form-input',
    label: 'Tipo',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['category_axis_style','axisLine', 'lineStyle', 'type'],
    bind: {}
  },
  category_line_style_width: {
    v: '1',
    component: 'easie-form-input',
    label: 'Largura',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['category_axis_style','axisLine', 'lineStyle', 'width'],
    bind: {type:'number'}
  },
  category_axis_tick_color: {
    v: '#fff',
    component: 'easie-sketch-color',
    label: 'Cor',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['category_axis_style','axisTick', 'lineStyle', 'color'],
    bind: {}
  },
  category_axis_tick_width: {
    v: '1',
    component: 'easie-form-input',
    label: 'Largura',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['category_axis_style','axisTick', 'lineStyle', 'width'],
    bind: {type:'number'}
  },
  category_axis_tick_length: {
    v: '5',
    component: 'easie-form-input',
    label: 'Comprimento',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['category_axis_style','axisTick', 'width'],
    bind: {type:'number'}
  },
  category_axis_text_color: {
    v: '#fff',
    component: 'easie-sketch-color',
    label: 'Cor',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['category_axis_style','axisLabel', 'color'],
    bind: {}
  },
  category_axis_text_font_family: {
    v: 'sans-serif',
    component: 'easie-form-input',
    label: 'Fonte',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['category_axis_style', 'axisLabel', 'fontFamily'],
    bind: {}
  },
  category_axis_text_font_size: {
    v: '14',
    component: 'easie-form-input',
    label: 'Tamanho',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['category_axis_style', 'axisLabel', 'fontSize'],
    bind: {type:'number', style:'max-width:150px'}
  },
  show_tool_tip: {
    v: true,
    component: 'easie-switch',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['t_tooltip', 'show'],
    bind: { s_label: 'Mostrar informações'}
  },
  show_axis_pointer: {
    v: true,
    component: 'easie-switch',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['t_tooltip', 'axis_pointer'],
    bind: { s_label: 'Destacar valor no eixo'}
  },
  stack_variation: {
    v: false,
    component: 'easie-switch',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['stack'],
    bind: { s_label: 'Empilhar'}
  },
  inverted_axis_variation: {
    v: false,
    component: 'easie-switch',
    get_value: (v) => v,
    get_value_back: (v) => v,
    key_list: ['inverted_axis'],
    bind: { s_label: 'Inverter Eixos'}
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

export const chart_key_ref = {
  'chart_type': 'Tipo',
  'title_style': 'Título',
  'legend_style': 'Legenda',
  'value_axis': 'Eixo Valor',
  'category_axis': 'Eixo Categoria',
  'tool_tip': 'Ao passar o Mouse',
  'chart_variations': 'Variações',
  'value_configs': 'Configuração de Valores'
}
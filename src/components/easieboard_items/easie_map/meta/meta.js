export const  brazil_chart_group_ref = {
  'AC': 'Acre',
  'AL': 'Alagoas',
  'AM': 'Amazonas',
  'AP': 'Amapá',
  'BA': 'Bahia',
  'CE': 'Ceará',
  'DF': 'Distrito Federal',
  'ES': 'Espírito Santo',
  'GO': 'Goiás',
  'MA': 'Maranhão',
  'MG': 'Minas Gerais',
  'MS': 'Mato Grosso do Sul',
  'MT': 'Mato Grosso',
  'PA': 'Pará',
  'PB': 'Paraíba',
  'PE': 'Pernambuco',
  'PI': 'Piauí',
  'PR': 'Paraná',
  'RJ': 'Rio de Janeiro',
  'RN': 'Rio Grande do Norte',
  'RO': 'Rondônia',
  'RR': 'Roraima',
  'RS': 'Rio Grande do Sul',
  'SC': 'Santa Catarina',
  'SE': 'Sergipe',
  'SP': 'São Paulo',
  'TO': 'Tocantins',
}

export const brazil_chart_group_ref_back = {
  'Acre':'AC',
  'Alagoas':'AL',
  'Amazonas':'AM',
  'Amapá':'AP',
  'Bahia':'BA',
  'Ceará':'CE',
  'Distrito Federal':'DF',
  'Espírito Santo':'ES',
  'Goiás':'GO',
  'Maranhão':'MA',
  'Minas Gerais':'MG',
  'Mato Grosso do Sul':'MS',
  'Mato Grosso':'MT',
  'Pará':'PA',
  'Paraíba':'PB',
  'Pernambuco':'PE',
  'Piauí':'PI',
  'Paraná':'PR',
  'Rio de Janeiro':'RJ',
  'Rio Grande do Norte':'RN',
  'Rondônia':'RO',
  'Roraima':'RR',
  'Rio Grande do Sul':'RS',
  'Santa Catarina':'SC',
  'Sergipe':'SE',
  'São Paulo':'SP',
  'Tocantins':'TO',
}

export const default_group_meta = {
  'label': {
    'show': false,
    'position': 'inside',
    'fontSize': '18',
    'fontWeight': 'normal',
    'color': 'rgba(0, 0, 0, 0.7)',
  },
  emphasis:{
    itemStyle: {
      areaColor: null,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowBlur: 20,
      borderWidth: 0,
      shadowColor: 'rgba(0, 0, 0, 0.5)'
    },
    'label': {
      'show': true,
      'position': 'inside',
      'formatter': function (params) {
        const brazil_chart_group_ref_back = {
          'Acre':'AC',
          'Alagoas':'AL',
          'Amazonas':'AM',
          'Amapá':'AP',
          'Bahia':'BA',
          'Ceará':'CE',
          'Distrito Federal':'DF',
          'Espírito Santo':'ES',
          'Goiás':'GO',
          'Maranhão':'MA',
          'Minas Gerais':'MG',
          'Mato Grosso do Sul':'MS',
          'Mato Grosso':'MT',
          'Pará':'PA',
          'Paraíba':'PB',
          'Pernambuco':'PE',
          'Piauí':'PI',
          'Paraná':'PR',
          'Rio de Janeiro':'RJ',
          'Rio Grande do Norte':'RN',
          'Rondônia':'RO',
          'Roraima':'RR',
          'Rio Grande do Sul':'RS',
          'Santa Catarina':'SC',
          'Sergipe':'SE',
          'São Paulo':'SP',
          'Tocantins':'TO',
        }
        var value = (params.value + '').split('.');
        value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1.');
        return  brazil_chart_group_ref_back[params.name] + ': ' + value;
      },
      'fontSize': '24',
      'fontWeight': 'normal',
      'color': 'rgba(0, 0, 0, 0.7)'
    }
  },
  itemStyle: {
    areaColor:{
      borderColor: 'rgba(0, 0, 0, 0.2)',
      color:'rgb(128, 128, 128)'
    }
  },
}

export const default_echarts_json = {
  title: {},
  tooltip:{
    trigger: 'item',
    showDelay: 0,
    transitionDuration: 0.2,
    formatter: function (params) {
        var value = (params.value + '').split('.');
        value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1.');
        return params.seriesName + '<br/>' + params.name + ': ' + value;
    }
  },
  visualMap: {},
  toolbox:{
    'show': true,
    'showTitle': true,
    'color': ['#2486be', '#2486be'],
    'x': 'left',
    'left': 35,
    'feature': {
      'dataView': {
          'show': true, 'readOnly': true, 'title': 'Dados',
          'lang': ['Dados', 'Fechar', 'Refresh']
      },
      'saveAsImage': {
          'show': true,
          'title': 'Download',
          'name': 'easie_image',
          'lang': ['Download']
      },
    }
  },
  series: [{
    name: 'aloha',
    map: 'map',
    type:'map',
    data:[]
  }]
}

export const default_item_meta = {
  title:{
    text: 'Título',
    subtext: 'Subtítulo',
    show: true,
    x: "center",
    textStyle: {
      "color": "#696969",
      "fontSize": 18,
      "fontWeight": "bold",
      "fontFamily": "sans-serif"
    },
    subtextStyle: {
      "color": "#aaaaaa",
      "fontSize": 12,
      "fontWeight": "bold",
      "fontFamily": "sans-serif"
    }
  },
  visualMap: {
    left: 'right',
    min: 0,
    max: 1,
    inRange: {
      color: ['#e0ffff', '#006edd']
    },
    text: ['Máx', 'Mín'],
    itemWidth: 24,
    calculable: true
  },
  value_configs: {
    'show_zeros': true,
    'show_null': false,
    'null_to_zero': false
  }
}
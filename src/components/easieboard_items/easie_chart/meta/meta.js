export const default_data_meta = {
    'data': {
        'label': {
            'show': false,
            'position': 'top',
            'formatter': '{c}',
            'fontSize': '14',
            'fontWeight': 'normal',
        },
        'emphasis': {
            'label':{
                'show': false,
                'fontSize': '24',
                'fontWeight': 'bold'
            }
        }
    },
    'series': {
        'emphasis': {
            'focus': 'series',
            'blurScope': 'coordinateSystem'
        },
        'itemStyle': {'color': ''},
        'markLine': {},
        'markPoint': {}
    }
}

export const COLOR_KEY_REF = ['series', 'itemStyle', 'color']

export const DEFAULT_DATA_COLORS = [
    '#003366', '#448ef6', '#fdb44b', '#80ac7b', '#6b778d', '#d04925', '#e5cf0d', '#7c4789',
    '#ff008b', '#9fd3c7', '#07a2a4', '#9a7fd1', '#6f5553', '#c9ab0'
]

export const default_chart_meta = {
    "extra": {},
    "chart_type": "bar",
    "chart_title": "Título",
    "chart_subtitle": "Subtítulo",
    "order_by_position": "position",
    "inverted_axis": false,
    "stack": false,
    "value_configs": {
        'show_zeros': true,
        'show_null': false,
        'null_to_zero': false
    },
    "t_tooltip": {
        "show": true,
        "axis_pointer": true
    },
    "title_style": {
        "show": true,
         "x": "center",
         "textStyle": {
             "color": "#696969",
             "fontSize": 18,
             "fontWeight": "bold",
             "fontFamily": "sans-serif"
        },
        "subtextStyle": {
            "color": "#aaaaaa",
            "fontSize": 12,
            "fontWeight": "bold",
            "fontFamily": "sans-serif"
        }
    },
    "legend_style": {
        "show": true,
        "textStyle": {
            "color": "#696969",
            "fontSize": 12,
            "fontWeight": "normal",
            "fontFamily": "sans-serif"
        },
        "y": "bottom",
        "x": "center",
        "icon": "roundRect",
        "itemGap": 10,
        "itemWidth": 25,
        "itemHeight": 14
    },
    "value_axis_style": {
        "min": null,
        "max": null,
        "axisLine": {
            "show": true,
            "lineStyle": {
                "color": "#aaaaaa",
                "width": 1,
                "type": "solid"
            }
        },
        "axisTick": {
            "show": true,
            "length": 5,
            "lineStyle": {
                "color": "#aaaaaa",
                "width": 1,
                "type": "solid"
            }
        },
        "axisLabel": {
            "show": true,
            "color": "#696969",
            "fontStyle": "normal",
            "fontWeight": "bold",
            "fontFamily": "sans-serif",
            "fontSize": 14,
            "margin": 8
        },
        "splitLine": {
            "show": true,
            "lineStyle": {
                "color": "#eee",
                "width": 1,
                "type": "solid"
            }
        },
        "splitArea": {
            "show": true,
            "areaStyle": {
                "color": [
                    "rgba(250,250,250,0.3)",
                    "rgba(200,200,200,0.3)"
                ]
            }
        }
    },
    "category_axis_style": {
        "axisLine": {
            "show": true,
            "lineStyle": {
                "color": "#aaaaaa",
                "width": 1,
                "type": "solid"
            }
        },
        "axisTick": {
            "show": true,
            "length": 5,
            "lineStyle": {
                "color": "#aaaaaa",
                "width": 1,
                "type": "solid"
            }
        },
        "axisLabel": {
            "show": true,
            "color": "#696969",
            "fontStyle": "normal",
            "fontWeight": "bold",
            "fontFamily": "sans-serif",
            "fontSize": 14,
            "margin": 8
        }
    }
}

export const default_toolbox = {
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
}

export const default_echarts_json = {
    'grid': {
        'height': "70%"
    },
    'legend': {},
    'title': {},
    'series': [],
    'toolbox': {},
    'tooltip': {
        'show': true,
        'trigger': 'axis',
        'axisPointer': {
            'type': 'cross',
            'label': {
                'show': true,
                'precision': 0,
                'backgroundColor': '#2486be',
            },
        }
    },
}
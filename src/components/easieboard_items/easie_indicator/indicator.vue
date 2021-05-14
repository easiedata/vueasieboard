<template>
  <div class="e-mx-4 e-my-2">
    <div class="e-d-flex e-align-items-center e-justify-content-between e-mx-4" >
      <div :style="json2style(group_list[group_index].item_meta.icon.style)">
        <font-awesome-icon :icon="group_list[group_index].item_meta.icon.name"></font-awesome-icon>
      </div>
      <div  class="e-ml-2 e-p-2 e-ml-3 indicator" ref="indicator_area">
        <div>
          <label
            :style="json2style(group_list[group_index].item_meta.label.style)">
            {{ group_list[group_index].name }}
          </label>
        </div>
        <div v-for="(val, key, i) in group_list_values[group_list[group_index].name]" class="e-d-flex e-justify-content-end" :key="i">
          <label
           v-if="val!=null"
          :style="json2style(group_list[group_index].data_list[i].item_meta.label.style)"
          >
            {{ Intl.NumberFormat('pt-BR').format(val) }}
          </label>
          <label :style="json2style(group_list[group_index].data_list[i].item_meta.label.style)" v-if="val==null">
            -
          </label>
        </div>
      </div>
    </div>
    <div class="indicator-footer e-d-flex e-ml-3 e-p-2">
      <label :style="json2style(group_list[group_index].item_meta.comment.label.style)">
        <font-awesome-icon :style="group_list[group_index].item_meta.comment.icon.style" class="e-mr-1" :icon="group_list[group_index].item_meta.comment.icon.name"></font-awesome-icon>
        {{group_list[group_index].item_meta.comment.text}}
      </label>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'indicator',
    props:{
      // value = group_list
      group_list:{required:true},
      group_index:{required:true},
      group_list_values:{required:true}
    },
    methods: {
      json2style (style_json){
        let css_style = '';
        for(let key in style_json){
          css_style += `${key}: ${style_json[key]};`
        }
        return css_style;
      }
    }
  }
</script>
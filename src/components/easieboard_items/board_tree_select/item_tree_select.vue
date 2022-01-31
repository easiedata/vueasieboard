<template>
  <div class="e-d-flex e-flex-column e-align-items-center e-justify-content-center e-w-100 e-px-1">
    <div  class="e-d-flex e-justify-content-center">
      <label v-if="!item_meta.label_tooltip.show" :style="$json2style(item_meta.label)"> {{ group_name }}</label>
      <label v-else v-tooltip="item_meta.label_tooltip['v-tooltip']"  :style="$json2style(item_meta.label)"> {{ group_name }}</label>
      <span v-if="item_meta.icon_info.show">
        <label v-tooltip="item_meta.icon_info['v-tooltip']" class="hover-text-easie e-pl-1"> <font-awesome-icon :icon="['fas', 'info-circle']"></font-awesome-icon></label>
      </span>
    </div>
    <easie-tree-select
      @input="on_input"
      v-model="item_meta.val"
      v-bind="{
        options: options,
        ...group_item_meta.select_bind
      }">
    </easie-tree-select>
  </div>
</template>

<script>
  export default {
    name: 'item-tree-select',
    props:{
      options:{required:true},
      group_item_meta:{required:true},
      group_rule:{required: true},
      group_name:{required: true},
      rule_ref:{required: true}
    },
    data(){
      return {
        item_meta: this.group_item_meta
      }
    },
    mounted(){
      this.on_input()
    },
    methods:{
      on_input(){
        let val = this.item_meta.val
        let rule = '';
        if(val== null){
          rule = '';
        }
        else if(Array.isArray(val) && this.group_item_meta.select_bind.multiple){
          rule = '( ' + val.map(v=>{ return this.rule_ref[v] }).join(' OR ') + ' )';
        }
        else{
          rule = this.rule_ref[val];
        }
        this.$emit('new_state', {
          rule: rule,
          item_meta: this.item_meta,
          value: this.item_meta.val
        });
      }
    }
  }
</script>
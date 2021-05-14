<template>
  <div class="e-px-4 e-w-100" style="height:40px; margin-top:40px;">
    <vue-slider  @drag-end="on_input" ref="slider" v-model="val" v-bind="options"></vue-slider>
  </div>
</template>

<script>
  import VueSlider from 'vue-slider-component';
  import 'vue-slider-component/theme/default.css';

  export default {
    name: 'item-slider',
    components:{
      VueSlider,
    },
    props:{
      data_list:{required:true},
      group_item_meta:{required:true},
      group_rule:{required: true}
    },
    data(){
      return {
        options: {
          dotSize: 14,
          width: 'auto',
          height: 4,
          contained: false,
          direction: this.group_item_meta.direction,
          data: this.data_list.map(k=>{return k.name}),
          dataLabel: 'label',
          dataValue: 'value',
          disabled: false,
          clickable: true,
          duration: 0.5,
          adsorb: false,
          lazy: false,
          tooltip: 'always',
          tooltipPlacement: 'top',
          tooltipFormatter: void 0,
          useKeyboard: false,
          keydownHook: null,
          dragOnClick: false,
          enableCross: true,
          fixed: false,
          minRange: void 0,
          maxRange: void 0,
          order: true,
          marks:[],
          dotOptions: void 0,
          dotAttrs: void 0,
          process: true,
          dotStyle: void 0,
          railStyle: void 0,
          processStyle: void 0,
          tooltipStyle: void 0,
          stepStyle: void 0,
          stepActiveStyle: void 0,
          labelStyle: void 0,
          labelActiveStyle: void 0,
        },
        val: this.group_item_meta.val,
        mount_slider: false,
      }
    },
    methods:{
      on_input(){
        let new_item_meta = {
          ...this.group_item_meta,
          val: this.val,
        }
        if(this.options.data.length){
          this.options.marks = [
            this.options.data[0], this.options.data[this.options.data.length-1]
          ]
        }

        let max_index = this.options.data.indexOf(this.val[1]);
        let min_index = this.options.data.indexOf(this.val[0]);
        let rule = this.data_list.slice(min_index, max_index+1).reduce((ar, opt) => {
          if(opt.rule){
            ar.push(opt.rule)
          }
          return ar
        }, []).join(' OR ');
        if(this.group_rule){
          rule = `( ${rule} ) AND (${this.group_rule})`
        }

        this.$emit('new_state', {rule: rule, item_meta: new_item_meta, value: this.val});

      }
    },
    mounted(){
      this.val = this.val.map(v=>{
        if(this.options.data.indexOf(v) >=0){
          return v;
        }
        else if(this.data_list.length){
          return this.data_list[0].name;
        }
        else{return 0}
      });
      this.on_input()
    }
  }
</script>
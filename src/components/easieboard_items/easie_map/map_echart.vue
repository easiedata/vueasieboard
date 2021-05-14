<template>
  <div ref="my_map" class="e-h-100 e-w-100"></div>
</template>

<script>
  import * as echarts from 'echarts';
  export default {
    name: 'easie-echart',
    props: {
      echarts_json: { required: true, type: Object },
      upd_chart_size: { default: 0 },
      geo_json_map:{required:false}
    },
    data() {
      return {
        myChart: {}
      };
    },
    mounted() {
      this.myChart = echarts.init(this.$refs.my_map, 'easie-custom-1');

      if(this.geo_json_map){
        echarts.registerMap('map', this.geo_json_map, {})
      }

      this.myChart.setOption(this.echarts_json);
      this.myChart.on('click', (params) => {
        if(params.seriesType == 'pie'){
          let group = params.seriesName;
          let data = params.name;
          this.$emit('clicked_series', {group: group, data: data});
          return;
        }
        if(params.componentType == 'series'){
          let group = params.name;
          let data = params.seriesName;
          this.$emit('clicked_series', {group: group, data: data});
          return;
        }
      });
      window.addEventListener('resize', this.resize);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.resize);
    },
    methods:{
      resize(){
        this.myChart.resize();
      }
    },
    watch:{
      upd_chart_size() {
        this.resize()
      }
    }
  };
</script>
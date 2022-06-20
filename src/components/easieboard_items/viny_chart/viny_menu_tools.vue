<template>
  <div>
    <div>
      <div
        v-if="edit_mode"
        class="e-d-flex e-justify-content-between e-flex-wrap e-px-4 e-pt-4"
      >
        <div class="e-d-flex e-flex-column">
          <label class="e-pb-2" style="align-self: center"> Tipos:</label>
          <div>
            <button
              v-for="chart in chart_types"
              :key="chart"
              @click="new_chart(chart)"
              class="e-btn e-ml-1"
              :class="{
                'e-btn-outline-secondary': chart_meta.chart_type != chart,
                'e-btn-outline-easie': chart_meta.chart_type == chart,
              }"
            >
              <font-awesome-icon :icon="'chart-' + chart" />
            </button>
          </div>
        </div>
        <div class="e-d-flex e-flex-column e-align-items-center">
          <label class="e-pb-2" style="align-self: center"> Ferramentas:</label>
          <div class="e-d-flex">
            <button
              @click="disp_ref.easie_tools_modal = true"
              class="e-btn e-btn-outline-secondary"
            >
              <font-awesome-icon icon="wrench" />
            </button>
            <button
              v-show="save_chart"
              @click="$emit('save_chart')"
              class="e-ml-2 e-btn e-btn-outline-secondary \"
            >
              <font-awesome-icon icon="save" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODALS -->
    <easie-item-tools
      @input="$emit('input', chart_meta)"
      v-if="disp_ref.easie_tools_modal"
      @close="close_modal"
      v-model="chart_meta"
    ></easie-item-tools>
  </div>
</template>
<script>
// self
import easieItemTools from '../../utils/easie_item_tools/easie_item_tools.vue';

export default {
  components: {
    'easie-item-tools': easieItemTools,
  },
  props: {
    save_chart: { default: true },
    edit_mode: { default: true },
    value: { required: true },
  },
  data() {
    return {
      chart_meta: this.value,
      disp_ref: {
        easie_tools_modal: false,
      },
      chart_types: ['bar', 'line', 'pie'],
    };
  },
  methods: {
    new_chart(chart) {
      this.chart_meta.chart_type = chart;
      this.$emit('input', this.chart_meta);
    },
    close_modal(modal_ref) {
      this.disp_ref[modal_ref] = false;
    },
  },
  watch: {
    value() {
      this.chart_meta = this.value;
    },
  },
};
</script>

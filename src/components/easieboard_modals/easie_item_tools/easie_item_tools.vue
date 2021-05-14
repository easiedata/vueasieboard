<template>
  <easie-modal @close="close" :width="'70%'">
    <template slot="header">Ferramentas {{item_ref[component_type]}}</template>
    <div>
      <easie-top-tabs>
        <template
          v-for="(c_order, name, index) in meta_settings[component_type]['item_meta']['c_order']" >
          <easie-tab
            :selected="index==0"
            :key="index+' '+ name"
            :name="meta_settings[component_type]['item_meta']['key_ref'][name]"
            >
            <easie-default-meta
              @new_item_meta="update_item_meta"
              :meta_key="name"
              :item_meta= "item_meta"
              :c_order="c_order"
              :show_apply="false"
              :c_data="meta_settings[component_type]['item_meta']['c_data']">
            </easie-default-meta>
          </easie-tab>
        </template>
      </easie-top-tabs>
    </div>
  </easie-modal>
</template>

<script>
     // easiedata item meta components
    import { meta_settings } from '../easie_default_meta/default_meta.js';
    import easieDefaultMeta from '../easie_default_meta/easie_default_meta.vue';

    // utils
    import {  easieModal, easieTab, easieTopTabs } from 'vueasie';

    export default {
      name: 'easie-item-tools',
      components: {
        'easie-default-meta': easieDefaultMeta,
        'easie-modal': easieModal,
        'easie-tab': easieTab,
        'easie-top-tabs': easieTopTabs
      },
      props: {
        // value -> item_meta
        c_type: { default: 'chart' },
        value: { required: true }
      },
      data() {
        return {
          item_meta: this.value,
          component_type: this.c_type,
          meta_settings: {...meta_settings},
          item_ref: {
            'chart': 'do Gráfico',
            'map': 'do Mapa',
            'indicator': 'do Indicador',
            'slider': 'do Deslizador'
          }
        };
      },
      methods: {
        close() {
          this.$emit('close', 'easie_tools_modal');
        },
        update_item_meta(new_item_meta) {
          this.$emit('input', new_item_meta['item_meta']);
        }
      }
    };
</script>
<template>
  <easie-modal @close="$emit('close', 'edit_group')" width="60%">
    <template slot="header">
      <font-awesome-icon class="e-mr-2" icon="database"></font-awesome-icon>
      Editar Grupo
    </template>
    <div>
      <easie-top-tabs>
        <easie-tab key="structure" name="Estrutura" :selected="true">
          <easie-group @new_group="emit_new_group" :initial_group="initial_group"
          :show_table_search="show_table_search">
          </easie-group>
        </easie-tab>
        <template v-for="(c_order, name, index) in group_meta['c_order']" >
          <easie-tab
            :key="index+' '+ name"
            :name="group_meta['key_ref'][name]"
            >
            <easie-default-meta
              @new_item_meta="new_item_meta"
              :meta_key="name"
              :item_meta="initial_group.item_meta"
              :c_order="c_order"
              :c_data="group_meta['c_data']"
              :apply_ref_type="'group'">
            </easie-default-meta>
          </easie-tab>
        </template>
        <easie-tab key="events" name="Ao Clicar" v-if="show_events_tab">
          <events-meta
            @new_event="new_event"
            :events_meta="initial_group.events"
            el_type="group">
          </events-meta>
        </easie-tab>
      </easie-top-tabs>
    </div>
  </easie-modal>
</template>

<script>
  import events_meta from './events_meta/events_meta.vue';
  import easiegroup from './structure_modals/easiegroup.vue';
  import { easieModal, easieTab, easieTopTabs, easieDefaultMeta } from 'vueasie';

  export default {
    name: 'edit_structure_modal',
    components:{
      'easie-modal': easieModal,
      'easie-tab':easieTab,
      'easie-top-tabs':easieTopTabs,
      'easie-default-meta':easieDefaultMeta,
      'easie-group': easiegroup,
      'events-meta': events_meta
    },
    props:{
      initial_group:{required:true},
      show_events_tab:{default:false},
      group_meta:{required:true},
      show_table_search:{default:false}
    },
    methods:{
      new_item_meta(d){
        this.$emit('new_item_meta', d)
      },
      emit_new_group(g){
        this.$emit('new_group', {
          modal:'edit_group',
          group: {...g}
        });
      },
      new_event(e){
        this.$emit('new_event', {event: e, el_type: 'group'});
      },
    }
  }
</script>
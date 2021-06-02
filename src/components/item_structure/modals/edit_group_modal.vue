<template>
  <easie-modal @close="$emit('close', 'edit_group')" width="60%">
    <template slot="header">
      <font-awesome-icon class="e-mr-2" icon="database"></font-awesome-icon>
      Editar Grupo
    </template>
    <div>
      <easie-top-tabs>
        <easie-tab key="structure" name="Estrutura" :selected="true">
          <easie-group @new_group="emit_new_group" 
            :initial_group="initial_group"
            :easie_tables_cat="easie_tables_cat"
            >
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
        <easie-tab key="events" name="Ao Clicar">
          <events-meta
            @new_event="new_event"
            :easie_tables_cat="easie_tables_cat"
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
  import easie_default_meta from '../../utils/easie_default_meta/easie_default_meta.vue';


  export default {
    name: 'edit_structure_modal',
    components:{
      'easie-group': easiegroup,
      'events-meta': events_meta,
      'easie-default-meta': easie_default_meta
    },
    props:{
      initial_group:{required:true},
      group_meta:{required:true},
      easie_tables_cat:{required:true}
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
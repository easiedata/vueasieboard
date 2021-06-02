<template>
  <easie-modal @close="$emit('close', 'edit_data')" width="85%">
    <template slot="header">
      <font-awesome-icon class="mr-2" icon="database"></font-awesome-icon>
      Editar Dado
    </template>
    <div>
      <easie-top-tabs>
        <easie-tab key="structure" name="Estrutura" :selected="true">
          <easiedata
            :easie_tables_cat="easie_tables_cat"
            :initial_data="initial_data"
            :initial_group="initial_group"
            @new_data="emit_new_data" :group_options="group_options"></easiedata>
        </easie-tab>
        <template
          v-for="(c_order, name, index) in data_meta['c_order']" >
          <easie-tab
            :key="index+' '+ name"
            :name="data_meta['key_ref'][name]"
            >
            <easie-default-meta
              @new_item_meta="new_item_meta"
              :meta_key="name"
              :item_meta= "initial_data.item_meta"
              :c_order="c_order"
              :c_data="data_meta['c_data']">
            </easie-default-meta>
          </easie-tab>
        </template>
        <easie-tab key="events" name="Ao Clicar">
          <events-meta
            @new_event="new_event"
            :easie_tables_cat="easie_tables_cat"
            :events_meta="initial_data.events">
          </events-meta>
        </easie-tab>
      </easie-top-tabs>
    </div>
  </easie-modal>
</template>

<script>
  import events_meta from './events_meta/events_meta.vue';
  import easiedata from './structure_modals/easiedata.vue';
  import easie_default_meta from '../../utils/easie_default_meta/easie_default_meta.vue';

  export default {
    name: 'edit_data_modal',
    components:{
      'easiedata': easiedata,
      'easie-default-meta': easie_default_meta,
      'events-meta': events_meta
    },
    props:{
      easie_tables_cat:{required:true},
      data_meta:{required:true},
      initial_data:{required: true},
      initial_group:{required:true},
      group_list:{required:true}
    },
    computed:{
      group_options(){
        return this.group_list.map(group =>{
          return group.name;
        })
      },
    },
    methods:{
      new_event(e){
        this.$emit('new_event', {event: e, el_type: 'data'});
      },
      emit_new_data(d){
        this.$emit('new_data', {modal:'edit_data', ...d});
      },
      new_item_meta(d){
        this.$emit('new_item_meta', d)
      }
    }
  }
</script>
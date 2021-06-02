<template>
  <easie-modal @close="$emit('close', 'edit_structure')" width="85%">
    <template slot="header">
      <font-awesome-icon class="e-mr-2" icon="database"></font-awesome-icon>
      Editar Estrutura
    </template>
    <div>
      <easie-top-tabs>
        <easie-tab name="Adicionar Dado" :selected="true">
          <easiedata @new_data="emit_new_data" :easie_tables_cat="easie_tables_cat" :group_options="group_options"></easiedata >
        </easie-tab>
        <easie-tab v-if="group_list.length" name="Grupos">
          <group-order @new_group_order="new_group_order" :group_list="group_list"></group-order>
        </easie-tab>
        <easie-tab v-if="group_list.length" name="Avançado">
          <easie-advanced @new_group_list="new_group_list" :group_list="group_list">
          </easie-advanced>
        </easie-tab>
      </easie-top-tabs>
    </div>
  </easie-modal>
</template>

<script>
  import easiedata from './structure_modals/easiedata.vue';
  import group_order from './structure_modals/group_order.vue';
  import easie_advanced from './structure_modals/easie_advanced.vue';
  

  export default {
    name: 'edit_structure_modal',
    components:{
      'easiedata': easiedata,
      'group-order': group_order,
      'easie-advanced': easie_advanced
    },
    props:{
      easie_tables_cat:{required:true},
      group_list:{required:true}
    },
    data(){
      return{
        visibility: true
      }
    },
    computed:{
      group_options(){
        return this.group_list.map(group =>{
          return group.name;
        })
      }
    },
    methods:{
      emit_new_data(d){
        d['data']['visible'] = this.visibility
        this.$emit('new_data', {modal:'edit_structure', ...d});
      },
      new_group_order(g){
        this.$emit('new_group_order', {
          modal:'edit_structure', group_list:g
        });
      },
      new_group_list(group_list){
        this.$emit('new_group_list', group_list);
      }
    }
  }
</script>
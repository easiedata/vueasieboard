<template>
  <div class="e-d-flex e-flex-column e-py-3 e-ml-2">
    <div class="e-d-flex e-align-items-center e-mb-2">
      <div class="easie-group-label-div">
        <label> Nome Grupo*:</label>
      </div>
      <input v-model="name" class="form-control e-w-100"/>
    </div>
    <div v-if="show_table_search" class="e-d-flex e-align-items-center e-justify-content-center e-mb-2">
      <div class="py-2">
        <easie-switch v-model="get_from_tb">
          Definir Regra Padrão
        </easie-switch>
      </div>
    </div>
    <div v-if="get_from_tb && show_table_search" class="e-d-flex e-align-items-center e-mb-2">
      <div class="easie-group-label-div">
        <label> Tabela: </label>
      </div>
<!--       <easie-tb-select
       class="w-100"
       v-model="table_source"
       :search="true"
       :options="user_cat_tables"
       :category_ref="{ cat_key: 'name', list_key: 'content' }"></easie-tb-select> -->
    </div>
    <div v-if="get_from_tb && show_table_search"  class="e-d-flex e-align-items-center e-mt-4 e-mb-2">
      <div class="easie-group-label-div">
        <label> Filtro:</label>
      </div>
      <div>
        <filter-rule v-model="rule" :table_name="table_source"></filter-rule>
      </div>
    </div>
    <div class="e-d-flex e-align-items-center e-justify-content-center e-mt-4 e-mb-2">
      <button
        @click="emit_group"
        class="e-btn e-btn-light hover-bg-easie hover-text-white e-w-50"
        style="border: 1px solid lightgray;">
        Confirmar
        <font-awesome-icon icon="save"></font-awesome-icon>
      </button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  // structures
  import filter_rule from 'vueasie';
  // // utils
  // import easieTbSelect from '@/components/utils/easie_select/easie_select';

  export default {
    name: 'easieGroup',
    components: {
      // easieTbSelect,
      'filter-rule': filter_rule
    },
    props:{
      initial_group: {required:true},
      show_table_search: {default:false}
    },
    data(){
      return {
        table_source: this.initial_group.table_source,
        get_from_tb: this.initial_group.table_source!='',
        rule: this.initial_group.rule,
        name: this.initial_group.name,
        item_meta: this.initial_group.item_meta
      }
    },
    computed:{
      // ...mapGetters({
      //   'user_cat_tables': 'sel_cat_user_tables'
      // }),
    },
    methods:{
      emit_group(){
        if(this.name){
          let table_source = this.table_source;
          if(!this.get_from_tb || !this.show_table_search){
            table_source = '';
          }
          this.$emit('new_group', {
            name: this.name,
            rule: this.rule,
            table_source: table_source,
            item_meta: this.item_meta,
            data_list: this.initial_group.data_list,
            sort: this.initial_group.sort
          })
        }
        else{
          this.$notify({'text': 'Nome do Grupo é Obrigatório'})
        }
      }
    },
    watch:{
      get_from_tb(){
        if(this.get_from_tb){
          if(!this.table_source){
            // this.table_source = this.user_cat_tables[0].content[0].val;
          }
        }
        else {
          this.table_source = '';
        }
      }
    }
  }
</script>

<style>
  .easie-group-label-div{
    min-width:100px;
  }
</style>
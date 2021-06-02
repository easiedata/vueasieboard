<template>
  <div class="e-d-flex e-flex-column e-py-3 e-ml-2">
    <div class="e-d-flex e-align-items-center e-mb-2">
      <div class="easie-group-label-div">
        <label> Grupo*</label>
      </div>
      <easie-form-input v-model="name"></easie-form-input>
    </div>
    <div class="e-w-100 e-py-3">
      <easie-switch class="e-justify-content-center" v-model="get_from_tb"> Filtrar</easie-switch>
    </div>
    <div v-if="get_from_tb&&easie_tables_cat.length" class="e-d-flex e-align-items-center e-justify-content-center e-w-100 e-pb-3">
      <label class="e-mr-2"> Tabela: </label>
      <easie-tree-select class="e-w-50" v-model="table_source" :options="easie_tables_cat">
      </easie-tree-select>
    </div>
    <div class="e-w-100 e-pb-3 e-ml-2" v-if="get_from_tb&&easie_tables_cat.length">
      <div class="e-d-flex e-align-items-center e-justify-content-center">
        <label class="e-mr-2"> Filtro* </label>
        <easie-ace v-model="rule"
          @init="init"
          lang="sql"
          class="easie-editor-wrapper"
          height="60px"
          width="100%"/>
      </div>
    </div>
    <div class="e-d-flex e-justify-content-center e-w-100 e-pb-3" v-if="get_from_tb&&!easie_tables_cat.length">
      <label class=""> Para filtrar necessário ter acesso a tabelas no easiedata</label>
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

  // // utils
  // import easieTbSelect from '@/components/utils/easie_select/easie_select';

  export default {
    name: 'easieGroup',
    props:{
      initial_group: {required:true},
      easie_tables_cat: {required:true}
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
    methods:{
      init(editor) {
        editor.renderer.setScrollMargin(3, 0);
        editor.setOptions({
          printMargin: true,
          wrap: true,
          scrollPastEnd: 0.5,
        });
      },
      emit_group(){
        if(this.name){
          let table_source = this.table_source;
          if(!this.get_from_tb || !this.easie_tables_cat.length){
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
        if(this.table_source=='' && this.easie_tables_cat.length){
          this.table_source = this.easie_tables_cat[0].children[0].id;
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
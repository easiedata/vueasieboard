<template>
  <div class="e-d-flex e-flex-column e-py-3">
    <div class="e-d-flex e-align-items-center e-mb-2">
      <div class="add-data-section-title e-py-1 e-mr-2">
        <label> #1 Grupo</label>
      </div>
      <div class="add-section-area section-border e-d-flex pb-4">
        <div class="add-data-section-body sel-group e-d-flex e-flex-column e-ml-1">
          <div v-if="group_options.length" class="e-d-flex e-align-items-center e-mb-3">
            <div class="e-d-flex e-align-items-center add-data-group-opt">
              <easie-radio v-model="group_mode" opt="old" name="add-data-group-opt" >
              </easie-radio>
              <label
                @click="group_mode='old'"
                class="hover-text-easie e-ml-2"
                :class="{'text-easie':group_mode=='old'}"> Criado:</label>
            </div>
            <span class="e-w-100" @click="group_mode='old'">
              <easie-select
                @click="group_mode='old'"
                class="e-w-100"
                v-model="select_group"
                :options="group_options"
                >
              </easie-select>
            </span>
          </div>
          <div class="e-d-flex e-align-items-center e-mb-2">
            <div class="e-d-flex add-data-group-opt">
              <easie-radio v-if="group_options.length" v-model="group_mode" opt="new" name="add-data-group-opt" ></easie-radio>
              <label
                @click="group_mode='new'"
                class="hover-text-easie e-ml-2"
                :class="{'text-easie':(group_mode=='new' && group_options.length)}"> Novo*</label>
            </div>
            <easie-form-input
              @click="group_mode='new'"
              v-model="input_group"
              placeholder="Nome Grupo"></easie-form-input>
          </div>
        </div>
      </div>
    </div>
    <div class="e-my-4">
      <div class="e-d-flex e-align-items-center">
        <div class="add-data-section-title e-py-2 e-mr-2">
          <label> #2 Dado</label>
        </div>
        <div class="add-section-area section-border e-d-flex e-flex-wrap e-pb-2">
          <div class="add-data-section-body e-d-flex e-flex-grow-1 e-flex-column e-ml-2">
            <div class="e-d-flex e-align-items-center e-mb-2">
              <div class="add-data-opt">
                <label> Nome*</label>
              </div>
              <easie-form-input v-model="data.name" placeholder="Nome Dado"></easie-form-input>
            </div>
            <div class="e-d-flex e-flex-grow e-align-items-center e-mb-1">
              <div class="add-data-opt">
                <label> Valor*</label>
              </div>
              <easie-textarea
              v-model="data.operation"
              class="e-w-100" :rows="2" placeholder="Digite Fórmula ou Valor"></easie-textarea>
            </div>
          </div>
          <div class="e-w-100 e-py-3">
            <easie-switch class="e-justify-content-center" v-model="get_from_tb"> Filtrar</easie-switch>
          </div>
          <div v-if="get_from_tb&&easie_tables_cat.length" class="e-d-flex e-align-items-center e-justify-content-center e-w-100 e-pb-3">
            <label class="e-mr-2"> Tabela: </label>
            <easie-tree-select class="e-w-50" v-model="data.table_source" :options="easie_tables_cat">
            </easie-tree-select>
          </div>
          <div class="e-w-100 e-pb-3 e-ml-2" v-if="get_from_tb&&easie_tables_cat.length">
            <div class="e-d-flex e-align-items-center e-justify-content-center">
              <label class="e-mr-2"> Filtro* </label>
              <easie-ace v-model="data.rule"
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
          <div class="e-w-100">
            <easie-switch class="e-justify-content-center" v-model="visibility"> Visível</easie-switch>
          </div>
        </div>

      </div>

    </div>
    <div class="e-d-flex e-align-items-center">
      <div class="add-data-section-title e-py-1 e-mr-2">
        <label> #3 Salvar</label>
      </div>
      <div class="add-data-section-body e-d-flex e-align-items-center e-justify-content-center">
        <easie-radio-list
          v-model="apply"
          :list_items="apply_ref"
          :list_label="apply_label">
        </easie-radio-list>
      </div>
      <div class="add-data-section-body e-d-flex e-align-items-center e-justify-content-center">
        <button
          @click="emit_data"
          class="e-btn e-btn-light hover-bg-easie hover-text-white e-w-75"
          style="border: 1px solid lightgray;">
          Confirmar
          <font-awesome-icon icon="save"> </font-awesome-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { easieTreeSelect } from 'vueasie';

  export default {
    name: 'easiedata',
    components:{easieTreeSelect},
    props:{
      easie_tables_cat:{required:true},
      initial_data: {
        default:() => { return {
            name: '',
            rule: '',
            operation: '',
            table_source: '',
            item_meta: {}
          }
        }
      },
      initial_group:{default: ''},
      group_options:{required:true}
    },
    data(){
      return{
        data: {...this.initial_data},
        select_group: this.initial_group,
        input_group: '',
        get_from_tb: this.initial_data.table_source != '',
        visibility: true,
        group_mode: 'old',
        apply_label: 'Aplicar para:',
        apply: 'self',
        apply_ref:[
            {
              val: 'self',
              label: 'Apenas este dado',
            },
            {
              val: 'group',
              label: 'Dados deste grupo'
            },
            {
              val: 'data',
              label: 'Dados equivalantes a este'
            },
            {
              val: 'all',
              label: 'Todos os dados'
            }
        ]
      }
    },
    computed:{
      sel_group(){
        if(this.group_mode == 'old'){
          return this.select_group;
        }
        else if(this.group_mode == 'new'){
          return this.input_group;
        }
        return '';
      }
    },
    mounted(){
      if(!this.group_options.length || !this.select_group){
        this.group_mode = 'new';
        this.select_group = this.group_options[0];
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
      emit_data(){
        if(!(!this.sel_group || !this.data.name || !this.data.operation)){
          let table_source = this.data['table_source']
          if(!this.get_from_tb || this.easie_tables_cat.length==0){
            table_source = '';
          }
          this.$emit('new_data', {
            initial_data: this.initial_data,
            initial_group: this.initial_group,
            data: {...this.data, 'table_source': table_source, 'visible': this.visibility},
            group: this.sel_group,
            apply: this.apply,
          })
        }
        else{
          this.$notify({text: 'Campos obrigatórios não preenchidos!'})
        }
      }
    },
    watch:{
      get_from_tb(){
        if(this.data.table_source== '' && this.easie_tables_cat.length && get_from_tb){
          this.data.table_source = this.easie_tables_cat[0].children[0].id;
        }
      }
    }
  }
</script>

<style>
  .add-section-area {
    width:90%;
  }

  .section-border {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }

  .add-data-section-title {
    min-width: 60px;
  }

  .add-data-section-title label{
    font-weight:normal;
    font-size:12px;
  }

  .add-data-section-body {
    min-width:300px;
    width:40%;
  }
  .add-data-section-body.sel-group{
    width:75%;
  }

  .add-data-section-filter {
    min-width:300px;
    width:50%;
  }

  .add-data-opt{
    min-width:90px;
  }

  .add-data-group-opt {
    min-width:90px;
  }

  @media only screen and (max-width: 600px) {
    .add-data-section-title{
      display:none;
    }
    .add-data-filter-gap{
      display:none;
    }
  }
</style>
<template>
  <div>
    <div class="e-d-flex e-flex-grow-1">
      <div class="e-py-2">
        <div class="e-d-flex e-align-items-center">
          <easie-radio-list
            @input="change_event"
            v-model="content_type"
            :list_items="[{val: 'table', label: 'Tabela'}, {val: 'easieboard', label: 'easieboard'}]"
            list_label="Ao clicar mostrar:">
          </easie-radio-list>
        </div>
      </div>
    </div>
    <div v-if="easieboards.length==0&&content_type=='easieboard'">
      <label> Você não possui easieboards</label>
    </div>
    <div v-if="easie_tables_cat.length==0&&content_type=='table'">
      <label> Você não possui tabelas</label>
    </div>
    <div v-if="content_type=='table'&&easie_tables_cat.length">
      <div  class="e-d-flex e-align-items-center e-justify-content-center e-w-100 e-pb-3">
        <label class="e-mr-2"> Tabela: </label>
        <easie-tree-select  v-model="event.content_name" :options="easie_tables_cat">
        </easie-tree-select>
      </div>
    </div>
    <div class="e-mt-2" v-if="content_type=='easieboard'&&easieboards.length">
      <div class="e-py-2">
        <div>
          <label>Escolha o easieboard:</label>
        </div>
        <easie-select
          v-model="event.content_name"
          :options="easieboards"
          icon="fa fa-chalkboard"
          ></easie-select>
      </div>
      <div class="e-py-2">
        <label>
          Obs: O easiebaord aparecerá em uma tela modal, com o filtro desse elemento aplicado.
        </label>
      </div>
    </div>
    <div class="e-d-flex e-align-items-center e-justify-content-center e-py-3">
      <easie-radio-list
        v-model="apply"
        list_label="Aplicar evento para:"
        :list_items="apply_ref">
      </easie-radio-list>
    </div>
    <div class="e-d-flex e-align-items-center e-justify-content-center e-py-3" style="min-width:300px">
      <button
        @click="new_event('click')"
        class="e-btn e-btn-light hover-bg-easie hover-text-white e-w-50"
        style="border: 1px solid lightgray;">
        Confirmar
        <font-awesome-icon icon="save"></font-awesome-icon>
      </button>
    </div>
  </div>
</template>

<script>
  const apply_ref = {
    data:[
      {
        val: 'self',
        label: 'Apenas este dado'
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
        label: 'Todos dados e grupos'
      }
    ],
    group:[
      {
        val: 'self',
        label: 'Apenas este grupo'
      },
      {
        val: 'all',
        label: 'Todos os grupos'
      }
    ]
  }

  export default {
    name: 'events_meta',
    props:{
      easie_tables_cat: {required:true},
      events_meta:{required:true},
      el_type:{default: 'data'}
    },
    data(){
      return {
        content_type: this.$get_json_key(['click', 'content_type'], this.events_meta, ''),
        event: this.$get_json_key(['click'], this.events_meta, {content_type: '', content_name: ''}),
        show_easieboards: 'click' in this.events_meta,
        easieboards: [],
        apply: 'self',
        apply_ref: {...apply_ref[this.el_type]}
      }
    },
    mounted(){
      this.get_easieboards()
    },
    methods:{
      change_event(){
        if(this.content_type == 'easieboard'){
          this.event.content_name = this.easieboards[0];
        }
        else{
          this.event.content_name = this.easie_tables_cat[0].children[0].id;
        }
      },
      get_easieboards() {
        this.axios.get('/easieboards').then(res => {
          this.easieboards = res['data']['data']['board_clear'].map(b=>{
            return [b.name, b.owner].join(' ')
          });
          if(this.easieboards.length && this.event.content_name==''){
            this.event.content_name = this.easieboards[0];
          }
        })
        .catch(error => {
          this.$default_error_handle(error.response.data);
        });
      },
      new_event(type){
        let new_event = {}
        new_event[type] = {...this.event, content_type: this.content_type};
        this.$emit('new_event', {
          event: new_event,
          apply: this.apply,
          key: type,
        })
      }
    }
  }
</script>
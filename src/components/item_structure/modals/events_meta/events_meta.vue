<template>
  <div>
    <div class="e-d-flex e-flex-grow-1">
      <div class="e-py-2">
        <easie-switch v-model="show_easieboards">
          Ao clicar mostrar easieboard:
        </easie-switch>
      </div>
    </div>
    <div v-if="show_msg">
      <label> Você não possui easieboards</label>
    </div>
    <div class="e-mt-2" v-if="show_select">
      <div class="e-py-2">
        <div>
          <label>Escolha o easieboard:</label>
        </div>
        <easie-select
          v-model="sel_board"
          :options="easieboards"
          icon="fa fa-chalkboard"
          ></easie-select>
      </div>
      <div class="e-py-2">
        <label>
          Obs: O easiebaord aparecerá em uma tela modal, com o filtro desse elemento aplicado.
        </label>
      </div>
      <div class="e-d-flex e-align-items-center e-justify-content-center e-py-3">
        <div>
          <label> Aplicar evento para:</label>
          <div v-for="ref in apply_ref[el_type]" :key="ref.val" class="e-d-flex e-align-items-center
            add-data-group-opt">
            <easie-radio v-model="apply" :opt="ref.val" name="edit-easiedata-chart-label">
            </easie-radio>
            <label
              @click="apply=ref.val"
              class="hover-text-easie ml-2"
              :class="{'text-easie':apply==ref.val}"> {{ref.label}}
            </label>
          </div>
        </div>
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
  </div>
</template>

<script>
  import { easieSelect, easieRadio, easieSwitch } from 'vueasie';

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
    components: {
      'easie-select': easieSelect,
      'easie-radio': easieRadio,
      'easie-switch': easieSwitch
    },
    props:{
      events_meta:{required:true},
      el_type:{default: 'data'}
    },
    data(){
      return {
        show_easieboards: 'click' in this.events_meta,
        easieboards: [],
        sel_board: this.$get_json_key(['click'], this.events_meta, ''),
        apply: 'self',
        apply_ref: {...apply_ref}
      }
    },
    computed:{
      show_select(){
        if(this.easieboards.length && this.show_easieboards){
          return true;
        }
        return false;
      },
      show_msg(){
        if(this.show_easieboards && this.easieboards.length==0){
          return true;
        }
        return false;
      }
    },
    mounted(){
      this.get_easieboards()
    },
    methods:{
      get_easieboards() {
        this.axios.get('/easieboards').then(res => {
          this.easieboards = res['data']['data']['board_clear'].map(b=>{
            return [b.name, b.owner].join(' ')
          });
          if(this.easieboards.length && this.sel_board!=''){
            this.sel_board = this.easieboards[0];
          }
        })
        .catch(error => {
          this.$default_error_handle(error.response.data);
        });
      },
      new_event(type){
        let new_event = {}
        new_event[type] = '';
        if(this.show_select && this.sel_board){
          new_event[type] = this.sel_board;
        }
        this.$emit('new_event', {
          event: new_event,
          apply: this.apply,
          key: type,

        })
      }
    }
  }
</script>
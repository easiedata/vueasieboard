<template>
  <div class="e-d-flex e-flex-column e-py-3">
    <easie-hr v-model="show_advanced_code" hr_label="Edição avançada de grupos e dados"/>
    <div v-if="show_advanced_code" class="e-pr-4 e-pl-4 e-pb-4 e-pt-3 e-mb-3">
      <div class="e-pb-1">
        <label> Editar Grupos e Dados</label>
      </div>
      <easie-ace
        v-model="edition_code"
        class="easie-editor-wrapper"
        height="220px"
        lang="javascript"
        />
    </div>
    <div v-if="show_advanced_code" class="e-d-flex e-align-items-center e-justify-content-center e-py-2" style="min-width:300px">
      <button
        @click="save_changes"
        class="e-btn e-btn-light hover-bg-easie hover-text-white e-w-50"
        style="border: 1px solid lightgray;">
        Confirmar
        <font-awesome-icon icon="save"
        ></font-awesome-icon>
      </button>
    </div>
  </div>
</template>

<script>
  import { easieAce, easieHr } from 'vueasie'


  const default_code = `this.new_group_list = this.group_list.map(g => {
    //formate grupos aqui
    g.data_list = g.data_list.map(d =>{
      // formate dados aqui
      return d;
    })
    return g;
  })`

  export default {
    name: 'easie-advanced',
    components:{
      easieAce,
      easieHr
    },
    props: {
      group_list: {required:true}
    },
    data(){
      return {
        edition_code: default_code,
        show_advanced_code: true,
        new_group_list: JSON.parse(JSON.stringify(this.group_list))
      }
    },
    mounted(){
      this.new_group_list = JSON.parse(JSON.stringify(this.group_list));
    },
    methods:{
      save_changes(){
        try{
          let valid_code = eval(this.edition_code);
          this.$notify({text: 'Configuração Aplicada', type: 'success'})
          this.$emit('new_group_list', this.new_group_list)
        } catch(err){
          this.$notify({text: 'Código de Configuração Inválido'})
          return;
        }
      },
    }
  }
</script>
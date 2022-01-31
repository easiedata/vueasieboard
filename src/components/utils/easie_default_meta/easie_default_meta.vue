<template>
  <div>
    <div class="e-mt-4 e-ml-2" v-for="(row,index) in c_order" :key="index">
      <easie-hr v-model="row['show']" :hr_label="row['section']">
      </easie-hr>
      <div class="e-d-flex e-flex-wrap e-ml-3">
        <div class="e-py-2 e-px-2" v-for="c in row['components']" :key="c">
          <div v-if="row['show']">
            <div v-if="'label' in c_data[c]">
              <label v-if="!('tooltip' in c_data[c])"> {{c_data[c].label}}</label>
              <label v-else v-tooltip="c_data[c].tooltip" > {{c_data[c].label}} </label>
            </div>
            <component
              @input="new_meta(c_data[c].key_list, c_data[c].get_value($event))"
              v-model="c_data_val[c]"
              :is="c_data[c].component"
              v-bind="c_data[c].bind"
              >
            </component>
          </div>
        </div>
      </div>
    </div>
    <div class="e-mt-2 e-py-3 e-px-2">
      <easie-hr v-model="show_advanced_settings" hr_label="Configurações avançadas">
      </easie-hr>
      <div v-if="show_advanced_settings">
        <div class="e-py-2 e-mr-2">
          <label>JSON</label>
          <easie-ace v-model="item_meta_string"
            @init="init_editor"
            lang="json"
            class="easie-editor-wrapper"
            height="300px"/>
        </div>
      </div>
    </div>
    <div v-if="show_apply" class="e-py-2">
      <easie-radio-list
        v-model="apply"
        :list_items="apply_ref[apply_ref_type]"
        :list_label="apply_label">
      </easie-radio-list>
    </div>
    <div class="e-d-flex e-align-items-center e-justify-content-center e-py-3" style="min-width:300px">
      <button
        @click="new_item_meta"
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

  export default {
    name: 'easie-default-meta',
    props:{
      meta_key:{required:true},
      item_meta:{required:true},
      c_order:{required:true},
      c_data:{required:true},
      show_apply:{default:true},
      apply_ref_type:{default:'data'}
    },
    data(){
      return {
        valid_meta: true,
        show_advanced_settings:false,
        apply_label: 'Aplicar Configurações para:',
        apply: 'self',
        apply_ref:{
          data: [
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
        },
        c_data_val: this.get_c_data_val(),
        meta_val: JSON.parse(JSON.stringify(this.item_meta, null, '\t')),
        item_meta_string: JSON.stringify(this.item_meta, null, '\t')
      }
    },
    methods:{
      get_c_data_val(){
        let c_data_v = {}
        for(let c in this.c_data){
          let key_list = this.c_data[c].key_list;
          let val = this.c_data[c].get_value_back(this.$get_json_key(key_list, this.item_meta, this.c_data[c].v));
          c_data_v[c] = val;
        }
        return c_data_v;
      },
      new_meta(key_list, v){
        this.$recursive_set_key(this.meta_val,  key_list, v);
        this.item_meta_string = JSON.stringify(this.meta_val, null, '\t');
      },
      new_item_meta(){
        if(!this.valid_meta){
          this.$notify({text: 'Configuração Inválida'})
          return;
        }
        this.$notify({text: 'Configuração Aplicada', type: 'success'})
        this.$emit('new_item_meta', {
          item_meta: JSON.parse(this.item_meta_string),
          apply: this.apply,
          key: this.meta_key
        })
      },
      init_editor(editor) {
        editor.renderer.setScrollMargin(3, 0);
        editor.setOptions({
          printMargin: true,
          wrap: true,
          scrollPastEnd: 0.5,
        });
      }
    },
    watch:{
      item_meta_string(){
        try{
          this.meta_val = JSON.parse(this.item_meta_string);
          this.valid_meta = true;
        } catch(err){
          this.valid_meta = false;
        }
      }
    }
  }
</script>


<style lang="scss">

  .easie-formatter .tooltip-inner {
    background-color: lightgray;
    min-width:240px
  }
  .easie-formatter .tooltip-arrow {
    border-color: lightgray;
  }
  .formatter-ul {
    list-style-type: none;
    padding-left:0px;
    min-width:240px
  }
</style>
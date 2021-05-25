<template>
  <div id="app" class="app-vue">
    <template>
      <base-layout/>
      <easie-app-container>
        <template slot="title">
          <label class="e-mr-1">
              Criação de Componentes
          </label>
        </template>
        <div class="e-ml-2 e-mt-3 e-mr-2">
          <div class="e-mt-3">
            <easie-hr v-model="visible.component_type" hr_label="Tipo Componente">
            </easie-hr>
            <div
              class="e-d-flex e-flex-row e-flex-wrap e-mt-2 e-ml-3">
              <div v-for="cr in creation_order" :key="cr">
                <button
                  @click="new_component_type(cr)"
                  v-show="visible.component_type"
                  class="e-btn e-m-1 e-mt-2"
                  :class="btn_class[mode==cr]">
                  {{ creation_data[cr].label }}
                </button>
              </div>
            </div>
          </div>
          <div class="e-mt-3">
            <easie-hr v-model="visible.group_list_values" hr_label="Estrutura">
            </easie-hr>
            <div class="e-ml-3 e-py-2" v-show="visible.group_list_values">
              <div class="e-py-2 e-mr-4">
                <label class="e-mr-1 e-mt-1 e-mb-1">JSON</label>
                <easie-ace v-model="group_list_string"
                  @init="init_editor"
                  lang="json"
                  class="easie-editor-wrapper"
                  height="300px"/>
              </div>
              <div class="e-d-flex e-align-items-center e-justify-content-center e-py-3" style="min-width:50px">
                <button
                  @click="new_group_list_values"
                  class="e-btn e-btn-light hover-bg-easie hover-text-white e-w-50"
                  style="border: 1px solid lightgray;">
                  Gerar componente
                  <font-awesome-icon icon="cog"
                  ></font-awesome-icon>
                </button>
              </div>
            </div>
          </div>
          <div class="e-mt-3">
            <easie-hr v-model="visible.component" hr_label="Componente">
            </easie-hr>
            <div class="e-mt-2 e-mb-4 e-ml-3" v-show="visible.component">
              <div class="e-d-flex e-pt-3">
                <item-data-structure class="e-mt-4 e-mr-2"
                  @input="new_data_structure"
                  v-model="group_list"
                  ref="item_data_structure"
                  @change_mode="change_item_data_mode"
                  :show_opts="false"
                  :meta_settings="meta_settings[mode]">
                </item-data-structure>
                <component
                  v-if="show_component"
                  class="component-area e-pt-3 e-px-2 e-flex-grow-1"
                  :value="{group_list: group_list, item_meta: item_meta}"
                  @upd_group_list="upd_group_list"
                  @save_component="save_component"
                  :key="component_key"
                  ref="dyn_component"
                  :style="creation_data[mode].div_style" :is="creation_data[mode].component"
                  :values_function= "creation_data[mode].values_function">
                </component>
                <div v-if="!show_component" class="component-unavailable e-d-flex e-align-items-center e-justify-content-center e-p-3 e-mr-4">
                  <h4 class="e-p-4">
                    Para criar o componente clique em "estrutura de dados" e adicione dados ou escreva o JSON da lista de grupos e clique em "gerar componente"
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </easie-app-container>
    </template>
  </div>
</template>

<script>
  import { meta_settings } from '../src/components/easieboard_modals/easie_default_meta/default_meta.js';

  import { chart_create_meta } from '../src/components/easieboard_items/easie_chart/meta/create_meta.js';
  import { indicator_create_meta } from '../src/components/easieboard_items/easie_indicator/meta/create_meta.js';
  import { select_create_meta } from '../src/components/easieboard_items/board_select/meta/create_meta.js';

  // import { select_group_c_order, select_group_c_data, select_group_key_ref } from './components/new_component/group_meta.js';
  import baseLayout from './components/base_layout/base_layout.vue';

  import easieIndicator from '../src/components/easieboard_items/easie_indicator/easie_indicator.vue';
  import easieChart from '../src/components/easieboard_items/easie_chart/easie_chart.vue';
  import boardSelect from '../src/components/easieboard_items/board_select/board_select.vue';
  
  import itemDataStructure from '../src/components/item_structure/item_data_structure.vue';
  // import new_component from './components/new_component/new_component.vue';

  const default_group_list = {
    "Group 1":{
      "Data 1":12
    },
    "Group 2":{
      "Data 1":16,
      "Data 2":8
    },
    "Group 3":{
      "Data 1":12,
      "Data 2":22
    }
  }

  export default {
    name: 'App',
    components: {
      itemDataStructure,
      easieIndicator,
      boardSelect,
      easieChart
      // 'new-component': new_component,
    },
    data(){
      return {
        component_key: 0,
        meta_settings: {
          // new: {
          //   group:{ c_data: select_group_c_data, c_order: select_group_c_order, key_ref: select_group_key_ref},
          //   data: { c_data: {}, c_order: {}, key_ref: {}},
          //   item_meta:{c_data: {}, c_order: {}, key_ref: {}}
          // },
          ...meta_settings
        },
        group_list_values: {},
        group_list: [],
        item_meta: {},
        group_list_string: JSON.stringify(default_group_list, null, '\t'),
        mode: 'indicator',
        show_component: false,
        visible:{
          group_list_values: true,
          component: true,
          component_type: true
        },
        btn_class:{
          true: 'e-btn e-mr-1 e-btn-outline-easie',
          false: 'e-btn e-mr-1 e-btn-outline-secondary hover-btn-easie'
        },
        creation_order: [
          'indicator', 'chart', 'select'
        ],
        creation_data: {
          chart: {
            ...chart_create_meta,
            values_function: (vm, loading, call_back) => {
              loading.hide()
              this.new_group_list_values_structure();
              call_back({error: false, data: { group_list_values: this.group_list_values}});
            }
          },
          indicator: {
            ...indicator_create_meta,
            values_function: (vm, loading, call_back) => {
              loading.hide()
              this.new_group_list_values_structure();
              call_back({error: false, data: { group_list_values: this.group_list_values}});
            }
          },
          select: { ...select_create_meta}
          // new:{
          //   values_function: (v_self, hide_loading, call_back) => {
          //     hide_loading()
          //     v_self.group_list_values = this.group_list_values
          //     call_back()
          //   }
          // }
        }
      }
    },
    methods:{
      new_component_type(type){
        this.mode = type
        this.$nextTick(() => {
          if(this.$refs.item_data_structure.group_list.length){
            this.group_list = this.$refs.item_data_structure.group_list;
            this.item_meta = {};
            this.component_key++;
            this.$nextTick(() => {
              setTimeout(() => {
                this.$refs.dyn_component.reload();
              }, 1000);
            });
          }
        })
      },
      new_group_list_values(){
        try{
          this.component_key = 0;
          this.group_list_values = JSON.parse(this.group_list_string);
          this.new_group_list()
          this.new_group_list_values_structure();
          this.new_data_structure();
          this.$notify({text: 'Componente gerado com sucesso', type: 'success'})
        } catch(err){
          this.$notify({text: 'Configuração inválida para gerar componente'})
        }
      },
      new_data_structure(group_list=false){
        if(group_list != false){
          this.group_list = group_list;
        }
        if(this.group_list.length==0){
          this.show_component = false;
          return;
        }
        this.show_component = true;

        this.$refs.item_data_structure.group_list = this.group_list;
        this.component_key++;
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.dyn_component.reload();
          }, 1000);
        });
      },
      new_group_list(){
        this.group_list = []
        let groups = Object.keys(this.group_list_values)
        for (let group in groups){
          let new_g = {}
          new_g['name'] = groups[group]
          new_g['rule'] = ''
          new_g['sort'] = 'manual';
          new_g['table_source'] = '';
          new_g['item_meta'] = {}
          new_g['data_list'] = [];
          new_g['events'] = {};
          let data_list = Object.keys(this.group_list_values[new_g['name']])
          for (let data in data_list){
            let new_d = {}
            new_d['name'] = data_list[data]
            new_d['rule'] = ''
            new_d['operation'] = this.group_list_values[new_g['name']][new_d['name']]
            new_d['visible'] = true
            new_d['events'] = {}
            new_d['item_meta'] = {}
            new_g['data_list'].push(new_d)
          }
          this.group_list.push(new_g)
        }
      },
      new_group_list_values_structure(){
        this.group_list_values = {}
        let groups = this.group_list;
        for (let index_group in groups){
          let group = groups[index_group]
          this.group_list_values[group['name']] = {}
          for (let data_index in group['data_list']){
            let data = group['data_list'][data_index]
            this.group_list_values[group['name']][data['name']] = data['operation']
          }
        }
        let str_glv_novo = JSON.stringify(this.group_list_values, null, '\t')
        this.group_list_string = str_glv_novo
      },
      upd_group_list(group_list){
        this.group_list = group_list;
        this.$refs.item_data_structure.group_list = group_list;
      },
      init_editor(editor) {
        editor.renderer.setScrollMargin(3, 0);
        editor.setOptions({
          printMargin: true,
          wrap: true,
          scrollPastEnd: 0.5,
        });
      },
      save_component(d){
        // this.$notify({text:' Item editado com sucesso', type:'success'})
      },
      change_item_data_mode(){
        this.$refs.dyn_component.resize()
      }
    }
  }
</script>

<style>
  .component-unavailable {
    max-height: 110px;
    min-height: 110px;
    border: 1px solid rgba(36,134,190, 0.7);
  }
  .component-unavailable h4{
    color: rgba(36,134,190, 0.7);
    font-size: 18px !important;
  }
</style>
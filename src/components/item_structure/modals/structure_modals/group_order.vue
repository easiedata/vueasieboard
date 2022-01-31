<template>
  <div class="e-d-flex e-flex-column">
    <div class="e-d-flex e-justify-content-center e-my-3">
      <label> Arraste para reposicionar:</label>
    </div>
    <div class="e-d-flex e-justify-content-center groups-reorder-rows e-my-3">
      <draggable
        class="item-group-list-data-wrapper"
        :list="groups"
        ghost-class="ghost"
        :sort="true">
        <!-- <div class="item-group-list-data-wrapper"> -->
          <div class="item-group-list-row e-d-flex e-flex-grow"
            v-for="(g, index) in groups"
            :key="index">
            <span class="e-d-flex e-align-items-left e-w-75">
              <span class="e-d-flex  e-align-items-center data-badge-count e-my-2 e-mx-1">
                {{index+1}}
              </span>
              <span  class="e-d-flex e-w-100 easiedata-group-el e-p-1">
                <tooltip-label :key="index"  class="hover-text-easie" :value="g.name">
                </tooltip-label>
              </span>
            </span>
          </div>
        <!-- </div> -->
      </draggable>
    </div>
    <div class="e-d-flex e-align-items-center e-justify-content-center">
      <button
        @click="$emit('new_group_order', groups)"
        class="e-btn e-btn-light e-hover-bg-easie hover-text-white e-w-50"
        style="border: 1px solid lightgray;">
        Confirmar
        <font-awesome-icon icon="save"></font-awesome-icon>
      </button>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';

  export default {
    name: 'group_order',
    components:{
      'draggable': draggable,
    },
    props:{
      group_list:{required:true}
    },
    data(){
      return {
        groups: this.group_list
      }
    }
  }
</script>

<style>
  .groups-reorder-rows .item-group-list-data-wrapper{
    max-height:700px;
    overflow-y: scroll;
  }

  .groups-reorder-rows .item-group-list-row {
    cursor:grab !important;
    min-width: 300px;
  }

  @media only screen{
    .groups-reorder-rows .item-group-list-data-wrapper{
      max-height:275px;
    }
  }

</style>
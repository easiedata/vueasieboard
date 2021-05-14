<template>
  <nav class="easie-navbar navbar sticky-top e-bg-white e-d-flex e-flex-column e-p-0 e-pt-2 e-w-100">
    <div class="e-d-flex e-flex-row e-flex-wrap e-w-100 e-pb-1">
      <span class="e-ml-4">
        <span class=" e-d-flex e-align-items-center">
          <a href="/criar">
            <img
            class="e-w-100 e-mt-3 e-mb-2" style="max-width: 140px;"
              src="../../assets/img/easiedata.png" />
          </a>
        </span>
      </span>
      <div class="e-w-100">
        <nav class="navbar bottom-navbar bg-easie e-d-flex e-justify-content-center">
          <div class="e-p-2 app_link e-text-white">
            <font-awesome-icon icon="magic"></font-awesome-icon>
            Criar
          </div>
        </nav>
      </div>
    </div>
  </nav>
</template>
<script>
  export default {
    name: 'base_layout'
  };
</script>

<style>
  .easie-navbar {
    z-index: 900 !important;
  }
  .navbar.bottom-navbar{
    padding:0px;
    line-height:1.25;
  }
  .sidebar-logo-area {
    display: flex;
    width: 250px;
    background: transparent !important;
    margin-bottom: 5px;
  }
</style>
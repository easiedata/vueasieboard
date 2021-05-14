import Vue from 'vue'
import App from './App.vue'
import easiedata from 'vueasie'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMagic, faPlus, faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import '../node_modules/vueasie/src/assets/scss/styles.scss'

library.add(faMagic, faPlus, faCog)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Loading, {color: '#2486be'});

Vue.config.productionTip = false
Vue.use(easiedata);

new Vue({
  render: h => h(App),
}).$mount('#app')

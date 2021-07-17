import Vue from 'vue'
import Vuetify from "vuetify";
import App from './App.vue'
import router from './router'
import store from './store'
import 'vuetify/dist/vuetify.min.css'
import {Vuelidate} from "vuelidate/src";

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  render: h => h(App)
}).$mount('#app');

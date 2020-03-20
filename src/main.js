import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import boUi from "./packages";
Vue.use(boUi);

new Vue({
  render: h => h(App),
}).$mount('#app')

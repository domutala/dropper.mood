import Vue from 'vue';
import App from './App.vue';
import dropdown from './index';

Vue.use(dropdown);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');

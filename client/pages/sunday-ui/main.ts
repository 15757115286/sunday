import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import { routes } from './router';

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  routes
});
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
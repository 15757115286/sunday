import Vue from 'vue';
import App from './App';
import { add } from './utils';
add(1, 2);

console.log(App);
new Vue({
    el:'#app',
    render: (h) => { return h(App) }
});
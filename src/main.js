import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/index.scss';
import clickOutside from './directives/click-outside.js';

const app = createApp(App);
app.use(router);
app.use(store);
app.directive('click-outside', clickOutside);
app.mount('#app');
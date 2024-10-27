import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Importing the main scss file
// import './styles/main.scss'; 

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
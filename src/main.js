import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; //index.js 는 생략 가능
import store from './store';

createApp(App).use(router).use(store).mount('#app')

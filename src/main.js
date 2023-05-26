import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; //index.js 는 생략 가능

createApp(App).use(router).mount('#app')

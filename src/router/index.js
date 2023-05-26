import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/index.vue';
import Todos from '../pages/todos/index.vue';
import Todo from '../pages/todos/_id.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/todos',
            name: 'Todos',
            component: Todos
        },
        {
            path: '/todos/:id', // " :[변수명] " // 이렇게 정의한 route의 연결 파일은 _(언더바)를 붙여 생성
            name: 'Todo',
            component: Todo
        }
    ]
});

// 1 / home 2 /todos 3 /todos/create 4 /todos/:id

export default router;
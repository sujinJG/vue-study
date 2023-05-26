<template>
  <h1>To-Do Page</h1>
  <div v-if="loading"> Loading... </div>
  <form 
    v-else
    @submit.prevent="onSave">
    <div class="row">
        <div class="col-6">
            <div class="form-group">
                <label> Todo Subject</label>
                <input
                    v-model="todo.subject" 
                    type="text" class="form-control">
            </div>
        </div>
        <div class="col-6">
            <div class="col-6">
                <div class="form-group">
                    <label> Status </label>
                    <div>
                        <button 
                            type="button"
                            class="btn"
                            :class="todo.completed ? 'btn-success': 'btn-danger'"
                            @click="toggleTodoStatus">
                            {{todo.completed ? 'Completed' : 'Imcompleted' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <button 
        :disabled="!todoUpdated"
        type="submit" 
        class="btn btn-primary">
        저장
    </button>
    <button 
        class="btn btn-outline-dark ml-2"
        @click="moveToTodoListPage">
        취소
    </button>
  </form>
</template>

<script>
import axios from 'axios';
import {useRoute, useRouter} from 'vue-router';
import {ref} from '@vue/reactivity';
import { computed } from 'vue';
import _ from 'lodash';

export default {
    setup(){
        const route = useRoute();
        const router = useRouter();
        const todo = ref(null);
        const originalTodo = ref(null);
        const loading = ref(true);
        const todoId  = route.params.id;

        const getTodo=async()=>{
            const res = await axios.get(`http://localhost:3000/todos/${todoId}`);
            todo.value = {...res.data}; // {...[data]}로 독립된 객체로 값만 복사
            originalTodo.value = {...res.data};

            loading.value = false;
        }

        const todoUpdated = computed(()=>{
            return !_.isEqual(todo.value, originalTodo.value);
        })

        getTodo();

        const toggleTodoStatus =()=>{
            todo.value.completed = !todo.value.completed;
        }

        const moveToTodoListPage=()=>{
            router.push({
                name: 'Todos'
            })
        }

        const onSave=async()=>{
            const res = await axios.put(`http://localhost:3000/todos/${todoId}`, {
                subject: todo.value.subject,
                completed: todo.value.completed
            });

            originalTodo.value = {...res.data};
        }

        return {
            todo
            , loading
            , toggleTodoStatus
            , moveToTodoListPage
            , onSave
            , todoUpdated
        }
        
        
    }
}
</script>

<style>

</style>
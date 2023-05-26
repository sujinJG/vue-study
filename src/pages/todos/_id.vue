<template>
  <h1>To-Do Page</h1>
  <div v-if="loading"> Loading... </div>
  <form v-else>
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

        <button type="submit" class="btn btn-primary">저장</button>
        <button 
            class="btn btn-outline-dark ml-2"
            @click="moveToTodoListPage">
            취소
        </button>
    </div>
  </form>
</template>

<script>
import axios from 'axios';
import {useRoute, useRouter} from 'vue-router';
import {ref} from '@vue/reactivity';

export default {
    setup(){
        const route = useRoute();
        const router = useRouter();
        const todo = ref(null);
        const loading = ref(true);

        const getTodo=async()=>{
            const res = await axios.get('http://localhost:3000/todos/'+route.params.id);
            todo.value = res.data;

            loading.value = false;
        }

        getTodo();

        const toggleTodoStatus =()=>{
            todo.value.completed = !todo.value.completed;
        }

        const moveToTodoListPage=()=>{
            router.push({
                name: 'Todos'
            })
        }

        return {
            todo
            , loading
            , toggleTodoStatus
            , moveToTodoListPage
        }
        
        
    }
}
</script>

<style>

</style>
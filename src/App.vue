<template>
  <div class="container">
    <h2>To-Do List</h2>
    
    <!-- 자식 컴포넌트의 이벤트를 부모 컴포넌트에 연결 -->
    <TodoSimpleForm @add-todo="addTodo" />
    
    <div v-if="!todos.length">
      추가된 Todo가 없습니다.
    </div>

    <div v-for="(todo, index) in todos" :key="todo.id" class="card mt-2">
      <div class="card-body p-2 d-flex align-items-center">
        <div class="form-check flex-grow-1">
          <input 
            class="form-check-input" 
            type="checkbox" 
            v-model="todo.completed">
          <label
            :class="{todo: todo.completed}"
            class="form-check-label" for="todo.subject" >
            {{todo.subject}}
          </label>
        </div>
        <div>
          <button @click="deleteTodo(index)" class="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { ref } from 'vue'; 
  import TodoSimpleForm from './components/TodoSimpleForm.vue';

  export default {
    components : { //가져온 컴포넌트를 등록
      TodoSimpleForm
    },
    setup(){
      const todos = ref([]);

      const addTodo=(todo)=>{ //자식 컴포넌트가 emit하여 보내온 값을 받음
        todos.value.push(todo);
      }

      const deleteTodo =(index)=>{
        todos.value.splice(index, 1);
      }

      return {
        addTodo
        , todos
        , deleteTodo
      };
    }
  }
</script>

<style>
  .todo {
    color : gray;
    text-decoration: line-through;
  }
</style>
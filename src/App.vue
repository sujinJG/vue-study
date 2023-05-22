<template>
  <div class="container">
    <h2>To-Do List</h2>
    <TodoSimpleForm />
    
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
      const todo = ref('');
      const todos = ref([]);
      const hasError = ref(false);

      const onSubmit=()=>{
        if(todo.value === ''){
          hasError.value = true;
        }else{
          hasError.value = false;
          todos.value.push({
            id : Date.now(),
            subject:  todo.value,
            completed : false
          });
          todo.value = "";
        }
      }; 

      const deleteTodo =(index)=>{
        todos.value.splice(index, 1);
      }

      return {
        todo
        , onSubmit
        , todos
        , hasError
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
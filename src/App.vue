<template>
  <div class="container">
    <h2>To-Do List</h2>
    <form class="d-flex" @submit.prevent="onSubmit">
      <div class="flex-grow-1 mr-2">
        <input
          class="form-control"
          type="text" 
          v-model="todo"
          placeholder="Type new to-do"
        />
      </div>
      <div>
        <button
          class="btn btn-primary"
          type = "onSubmit"
        >
            Add
        </button>
      </div>
    </form>
    {{todos}}
  </div>
</template>

<script>
  import { ref } from 'vue'; 
  export default {
    setup(){
      const todo = ref('');
      const todos = ref([]);

      const onSubmit=()=>{
        // e.preventDefault();
        todos.value.push({
          id : Date.now(),
          subject:  todo.value
        });
        todo.value = "";
      }; 

      return {
        todo
        , onSubmit
        , todos
      };
    }
  }
</script>

<style>
  .name {
    color :red
  }
</style>
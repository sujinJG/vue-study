<template>
  <div class="container">
    <h2>To-Do List</h2>
    
    <input
      class="form-control"
      type="text" 
      v-model="searchText"
      placeholder="Search"
    />
  <hr>
    <TodoSimpleForm @add-todo="addTodo" />
    <div style="color: red">{{err}}</div>

    <div v-if="!todos.length">
      There is nothings to display
    </div>

    <TodoList 
      :todos="filteredTodos" 
      @toggle-todo="toggleTodo" 
      @delete-todo="deleteTodo"/>

  </div>
</template>

<script>
  import { ref, computed } from 'vue'; 
  import TodoSimpleForm from './components/TodoSimpleForm.vue';
  import TodoList from './components/TodoList.vue';
  import axios from 'axios';

  export default {
    components : { 
      TodoSimpleForm
      , TodoList
    },
    setup(){
      const todos = ref([]);
      const err = ref('');

      const addTodo=(todo)=>{
        //데이터베이스 todo를 저장
        err.value = '';
        axios.post('http://localhost:3000/todos',{
          subject: todo.subject,
          completed: todo.completed
        }).then(res=>{
          todos.value.push(res.data);
        }).catch(err=>{ //예외처리
          console.log(err);
          err.value = 'Something went wrong';
        })
      }

      const deleteTodo =(index)=>{
        todos.value.splice(index, 1);
      }

      const toggleTodo=(index)=>{
        todos.value[index].completed = ! todos.value[index].completed
      }

      const searchText = ref('');
      const filteredTodos = computed(()=>{
        if(searchText.value){
          return todos.value.filter(todo =>{
            return todo.subject.includes(searchText.value);
          })
        }

        return todos.value;
      })

      return {
        addTodo
        , todos
        , deleteTodo
        , toggleTodo
        , searchText
        , filteredTodos
        , err
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
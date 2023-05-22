<template>
  <div class="container">
    <h4>Count {{count}}</h4>
    <h4>double Count Computed {{doubleCountComputed}}</h4>
    <h4>double Count Computed {{doubleCountComputed}}</h4>
    <h4>double Count Method {{doubleCountMethod()}}</h4>
    <h4>double Count Method {{doubleCountMethod()}}</h4>
    <button @click="count++"> Add One </button>

    <h2>To-Do List</h2>
    
    <!-- 자식 컴포넌트의 이벤트를 부모 컴포넌트에 연결 -->
    <TodoSimpleForm @add-todo="addTodo" />
    
    <div v-if="!todos.length">
      추가된 Todo가 없습니다.
    </div>

    <!-- 컴포넌트 :[prop명]="접근허용할 변수명" -->
    <TodoList :todos="todos" @toggle-todo="toggleTodo" @delete-todo="deleteTodo"/>

  </div>
</template>

<script>
  import { ref, computed } from 'vue'; 
  import TodoSimpleForm from './components/TodoSimpleForm.vue';
  import TodoList from './components/TodoList.vue';

  export default {
    components : { //가져온 컴포넌트를 등록
      TodoSimpleForm
      , TodoList
    },
    setup(){
      const todos = ref([]); //다른 컴포넌트에서도 사용하기 때문에 이동할 수 없음

      const addTodo=(todo)=>{ //자식 컴포넌트가 emit하여 보내온 값을 받음
        todos.value.push(todo);
      }

      const deleteTodo =(index)=>{
        todos.value.splice(index, 1);
      }

      const toggleTodo=(index)=>{
        todos.value[index].completed = ! todos.value[index].completed
      }

      const count = ref(1);
      const doubleCountComputed = computed(()=>{
        console.log('computed');
        return count.value * 2;
      })

      const doubleCountMethod=()=>{
        console.log('method');
        return count.value *2;
      }

      return {
        addTodo
        , todos
        , deleteTodo
        , toggleTodo
        , count
        , doubleCountComputed
        , doubleCountMethod
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
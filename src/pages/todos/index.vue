<template>
  <router-view />
  <div class="container">
    <h2>To-Do List</h2>

    <input
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="Search"
      @keyup.enter="searchTodo"
    />
    <hr />
    <TodoSimpleForm @add-todo="addTodo" />
    <div style="color: red">{{ err }}</div>

    <div class="mt-1" v-if="!todos.length">There is nothings to display</div>

    <TodoList
      :todos="todos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
    <hr />
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" v-if="currentPage !== 1">
            <a class="page-link cursor-p" @click="getTodos(currentPage-1)"> Previous </a>
        </li>
        <li v-for="page in numberOfPages" :key="page" class="page-item" :class="currentPage === page ? ' active' : ''">
          <a class="page-link" href="#" @click="getTodos(page)">{{page}}</a>
        </li>
        <li class="page-item" v-if="numberOfPages !== currentPage">
          <a class="page-link cursor-p" @click="getTodos(currentPage+1)">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  import { ref, computed, watch } from "vue";
  import TodoSimpleForm from "@/components/TodoSimpleForm.vue";
  import TodoList from "@/components/TodoList.vue"; //@ : 프로젝트 src 폴더 경로를 뜻함
  import axios from "axios";

  export default {
    components: {
      TodoSimpleForm,
      TodoList,
    },
    setup() {
      const todos = ref([]);
      const err = ref("");
      const numberOfTodos = ref(0);
      const limit = 5;
      const currentPage = ref(1);
      const searchText = ref("");

      const numberOfPages = computed(()=>{
        return Math.ceil(numberOfTodos.value/limit);
      })

      const getTodos = async (page = currentPage.value) => {
        currentPage.value = page;
        try {
          const res = await axios.get(
            `http://localhost:3000/todos?subject_like=${searchText.value}&_page=${page}&_limit=${limit}&_sort=id&_order=desc`
          );

          numberOfTodos.value = res.headers['x-total-count'];
          todos.value = res.data;
        } catch (error) {
          console.log(error);
          err.value = "Fail to load";
        }
      };

      getTodos();

      let timeout = null
      watch(searchText, ()=>{
        clearTimeout(timeout); //timeout 초기화
        timeout = setTimeout(()=>{
          getTodos(1);
        }, 1200);
      });

      const searchTodo=()=>{
        clearTimeout(timeout); //timeout 초기화
        getTodos(1);
      }

      // const filteredTodos = computed(() => {
      //   if (searchText.value) {
      //     return todos.value.filter((todo) => {
      //       return todo.subject.includes(searchText.value);
      //     });
      //   }
      //   return todos.value;
      // });

      const addTodo = async (todo) => {
        err.value = "";
        try {
          // const res = await axios.post("http://localhost:3000/todos", {
          await axios.post("http://localhost:3000/todos", {
            subject: todo.subject,
            completed: todo.completed,
          });

          getTodos();
        } catch (error) {
          console.log(err);
          err.value = "Something went wrong";
        }
      };

      const deleteTodo = async (index) => {
        err.value = "";
        const id = todos.value[index].id;
        try {
          await axios.delete("http://localhost:3000/todos/" + id);
          getTodos(1);
        } catch (err) {
          console.log(err);
          err.value = "Something went wrong";
        }
      };

      const toggleTodo = async (index, checked) => {
        err.value = "";
        const id = todos.value[index].id;
        try {
          await axios.patch("http://localhost:3000/todos/" + id, {
            completed: checked
          });
          todos.value[index].completed = checked;
        } catch (err) {
          console.log(err);
          err.value = "Something went wrong";
        }
      };

      return {
        addTodo,
        todos,
        deleteTodo,
        toggleTodo,
        searchText,
        // filteredTodos,
        err,
        getTodos,
        numberOfPages,
        currentPage,
        searchTodo
      };
    },
  };
</script>

<style>
.todo {
  color: gray;
  text-decoration: line-through;
}
.cursor-p{
  cursor: pointer;
}
</style>
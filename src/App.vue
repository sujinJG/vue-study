<template>
  <div class="container">
    <h2>To-Do List</h2>

    <input
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="Search"
    />
    <hr />
    <TodoSimpleForm @add-todo="addTodo" />
    <div style="color: red">{{ err }}</div>

    <div v-if="!todos.length">There is nothings to display</div>

    <TodoList
      :todos="filteredTodos"
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
  import TodoSimpleForm from "./components/TodoSimpleForm.vue";
  import TodoList from "./components/TodoList.vue";
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

      watch([currentPage, numberOfTodos], (currentPage, prev)=>{
        console.log(currentPage, prev);
      });

      const numberOfPages = computed(()=>{
        return Math.ceil(numberOfTodos.value/limit);
      })

      const getTodos = async (page = currentPage.value) => {
        currentPage.value = page;
        try {
          const res = await axios.get(
            `http://localhost:3000/todos?_page=${page}&_limit=${limit}`
          );
          
          numberOfTodos.value = res.headers['x-total-count'];
          todos.value = res.data;
        } catch (error) {
          console.log(error);
          err.value = "Fail to load";
        }
      };

      getTodos();

      const addTodo = async (todo) => {
        err.value = "";
        try {
          // const res = await axios.post("http://localhost:3000/todos", {
          await axios.post("http://localhost:3000/todos", {
            subject: todo.subject,
            completed: todo.completed,
          });

          // todos.value.push(res.data);
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
          todos.value.splice(index, 1);

          getTodos();
        } catch (err) {
          console.log(err);
          err.value = "Something went wrong";
        }
      };

      const toggleTodo = async (index) => {
        err.value = "";
        const id = todos.value[index].id;
        try {
          await axios.patch("http://localhost:3000/todos/" + id, {
            completed: !todos.value[index].completed,
          });
          todos.value[index].completed = !todos.value[index].completed;
        } catch (err) {
          console.log(err);
          err.value = "Something went wrong";
        }
      };

      const searchText = ref("");
      const filteredTodos = computed(() => {
        if (searchText.value) {
          return todos.value.filter((todo) => {
            return todo.subject.includes(searchText.value);
          });
        }

        return todos.value;
      });

      return {
        addTodo,
        todos,
        deleteTodo,
        toggleTodo,
        searchText,
        filteredTodos,
        err,
        getTodos,
        numberOfPages,
        currentPage
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
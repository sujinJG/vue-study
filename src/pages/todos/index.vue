<template>
  <router-view />

    <div class="container">
      <div class="d-flex justify-content-between mb-3">
        <h2>To-Do List</h2>
        <button class="btn btn-primary" @click="moveToCreatePage"> create Todo </button>
      </div>
  
      <input
        class="form-control"
        type="text"
        v-model="searchText"
        placeholder="Search"
        @keyup.enter="searchTodo"
      />
      <hr />
      <div style="color: red">{{ err }}</div>
  
      <div class="mt-1" v-if="!todos.length">There is nothings to display</div>
  
      <TodoList
        :todos="todos"
        @toggle-todo="toggleTodo"
        @delete-todo="deleteTodo"
      />
      <hr />
      <Pagination 
        v-if="todos.length"
        :numberOfPages="numberOfPages"
        :currentPage="currentPage"
        @click="getTodos"/>
    </div>
</template>

<script>
  import { ref, computed, watch } from "vue";
  import TodoList from "@/components/TodoList.vue"; //@ : 프로젝트 src 폴더 경로를 뜻함
  import axios from "@/axios";
  import {useToast} from "@/composables/toast";
  import { useRouter} from "vue-router";
  import Pagination from '@/components/Pagination.vue';

  export default {
    components: {
      TodoList,
      Pagination
    },
    setup() {
      const todos = ref([]);
      const err = ref("");
      const numberOfTodos = ref(0);
      const limit = 5;
      const currentPage = ref(1);
      const searchText = ref("");
      const router = useRouter();

      const {
          toastMessage,
          toastAlertType,
          showToast,
          triggerToast,
        } = useToast();

      const numberOfPages = computed(()=>{
        return Math.ceil(numberOfTodos.value/limit);
      })

      const getTodos = async (page = currentPage.value) => {
        currentPage.value = page;
        try {
          const res = await axios.get(
            `todos?subject_like=${searchText.value}&_page=${page}&_limit=${limit}&_sort=id&_order=desc`
          );

          numberOfTodos.value = res.headers['x-total-count'];
          todos.value = res.data;
        } catch (error) {
          triggerToast('Something went wrong', 'danger');
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

      const addTodo = async (todo) => {
        err.value = "";
        try {
          await axios.post("todos", {
            subject: todo.subject,
            completed: todo.completed,
          });

          getTodos();
        } catch (error) {
          triggerToast('Something went wrong', 'danger');
          err.value = "Something went wrong";
        }
      };

      const deleteTodo = async (id) => {
        err.value = "";
        try {
          await axios.delete("todos/" + id);
          getTodos(1);
        } catch (err) {
          triggerToast('Something went wrong', 'danger');
          err.value = "Something went wrong";
        }
      };

      const toggleTodo = async (index, checked) => {
        err.value = "";
        const id = todos.value[index].id;
        try {
          await axios.patch("todos/" + id, {
            completed: checked
          });
          todos.value[index].completed = checked;
        } catch (err) {
          triggerToast('Something went wrong', 'danger');
          err.value = "Something went wrong";
        }
      };

      const moveToCreatePage=()=>{
        router.push({
          name: 'TodoCreate'
        })
      }

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
        searchTodo,

        toastMessage,
        toastAlertType,
        showToast,
        moveToCreatePage
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
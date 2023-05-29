<template>
    <h1>To-Do Page</h1>
    <div v-if="loading">Loading...</div>
    
    <form v-else @submit.prevent="onSave">
        <div class="row">
            <div class="col-6">
                <div class="form-group">
                    <label> Todo Subject</label>
                    <input v-model="todo.subject" type="text" class="form-control" />
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
                                :class="todo.completed ? 'btn-success' : 'btn-danger'"
                                @click="toggleTodoStatus">
                                {{ todo.completed ? "Completed" : "Imcompleted" }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button :disabled="!todoUpdated" type="submit" class="btn btn-primary">저장</button>
        <button class="btn btn-outline-dark ml-2" @click="moveToTodoListPage">취소</button>
    </form>
    <Toast 
        v-if="showToast"
        :message="toastMessage"
        :type="toastAlertType"/>
</template>

<script>
import axios from "axios";
import { useRoute, useRouter} from "vue-router";
import { ref } from "@vue/reactivity";
import { computed, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from "vue";
import _ from "lodash";
import Toast from "@/components/Toast.vue";

export default {
  components: {
    Toast,
  },

  setup() {
    onBeforeMount(()=>{ //컴포넌트가 마운트되기 전에 호출
        console.log(document.querySelector('#kossie'));
    })

    onMounted(()=>{ //컴포넌트가 마운트된 후 호출
        console.log(document.querySelector('#kossie'));
    })

    onBeforeUpdate(()=>{ //DOM 트리 업데이트 전 호출
        console.log("onBeforeUpdate");
    })

    onUpdated(()=>{ //DOM 트리 업데이트 후 호출
        console.log("onUpdated");
    })

    onBeforeUnmount(()=>{ //컴포넌트가 메모리에서 빠지기 전 호출
        console.log("onBeforeUnmount");
    })

    onUnmounted(()=>{ //컴포넌트가 메모리에서 빠진 후 호출
        console.log("onUnmounted");
    })

    const route = useRoute();
    const router = useRouter();
    const todo = ref(null);
    const originalTodo = ref(null);
    const loading = ref(true);
    const todoId = route.params.id;
    const showToast = ref(false);
    const toastMessage = ref('');
    const toastAlertType = ref('');

    const getTodo = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/todos/${todoId}`);
            todo.value = { ...res.data }; // {...[data]}로 독립된 객체로 값만 복사
            originalTodo.value = { ...res.data };
      
            loading.value = false;
        } catch (error) {
            triggerToast('Something went wrong', 'danger');
        }
    };

    const todoUpdated = computed(() => {
      return !_.isEqual(todo.value, originalTodo.value);
    });

    getTodo();

    const toggleTodoStatus = () => {
      todo.value.completed = !todo.value.completed;
    };

    const moveToTodoListPage = () => {
      router.push({
        name: "Todos",
      });
    };

    const triggerToast = (message, type) => {
      showToast.value = true;
      toastMessage.value=message;
      toastAlertType.value = type;

      setTimeout(()=>{
        toastMessage.value = "";
        showToast.value = false;
      }, 3000);
    };

    const onSave = async () => {
        try {
            const res = await axios.put(`http://localhost:3000/todos/${todoId}`, {
              subject: todo.value.subject,
              completed: todo.value.completed,
            });

            originalTodo.value = { ...res.data };
            triggerToast('Successfully saved!');
        } catch (error) {
            triggerToast('Something went wrong', 'danger');
        }

    };

    return {
      todo,
      loading,
      toggleTodoStatus,
      moveToTodoListPage,
      onSave,
      todoUpdated,
      showToast,
      toastMessage,
      toastAlertType
    };
  },
};
</script>

<style>
</style>
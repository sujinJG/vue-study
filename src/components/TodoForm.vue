<template>
  <div v-if="loading">Loading...</div>
    
    <form v-else @submit.prevent="onSave">
        <div class="row">
            <div class="col-6">
                <div class="form-group">
                    <label> Todo Subject</label>
                    <input v-model="todo.subject" type="text" class="form-control" />
                    <div v-if="subjectErr" style="color:red">{{subjectErr}}</div>
                </div>
            </div>
            <div v-if="editing" class="col-6">
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
            <div class="col-12">
                <div class="form-group">
                    <label> body </label>
                    <textarea v-model="todo.body" class="form-control" cols="30" rows=5 ></textarea>
                </div>
            </div>
        </div>
        <button :disabled="!todoUpdated" type="submit" class="btn btn-primary">{{editing ? 'Update' : 'Create'}}</button>
        <button class="btn btn-outline-dark ml-2" @click="moveToTodoListPage">Cancle</button>
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
import { computed } from "vue";
import _ from "lodash";
import Toast from "@/components/Toast.vue";
import {useToast} from "@/composables/toast";

export default {
  components: {
    Toast,
  },
  props: {
    editing : {
        type: Boolean,
        default: false
    }
  },

  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const todo = ref({
        subject: '',
        completed: false,
        body: ''
    });
    const originalTodo = ref(null);
    const loading = ref(false);
    const todoId = route.params.id;

    const {
          toastMessage,
          toastAlertType,
          showToast,
          triggerToast,
    } = useToast();

    const subjectErr = ref('');

    const getTodo = async () => {
        loading.value = true;
        try {
            const res = await axios.get(`http://localhost:3000/todos/${todoId}`);
            todo.value = { ...res.data }; 
            originalTodo.value = { ...res.data };
        } catch (error) {
            triggerToast('Something went wrong', 'danger');
        } finally{
            loading.value = false;
        }
    };

    const todoUpdated = computed(() => {
      return !_.isEqual(todo.value, originalTodo.value);
    });

    if(props.editing){
        getTodo();
    }

    const toggleTodoStatus = () => {
      todo.value.completed = !todo.value.completed;
    };

    const moveToTodoListPage = () => {
      router.push({
        name: "Todos",
      });
    };

    const onSave = async () => {
        subjectErr.value = '';
        if(!todo.value.subject){
            subjectErr.value = 'Subject is Required';
            return;
        }
        let res;
        const data = {
                  subject: todo.value.subject,
                  completed: todo.value.completed,
                  body : todo.value.body
                }
        try {
            if(props.editing){
                res = await axios.put(`http://localhost:3000/todos/${todoId}`, data);
            }else{
                res = await axios.post(`http://localhost:3000/todos`, data);
                
                todo.value.subject = '';
                todo.value.body = '';
            }

            originalTodo.value = { ...res.data };
            const message = 'Succefully '+ (props.editing ? 'Updated' : 'Create');
            triggerToast(message);
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
      toastAlertType,
      subjectErr
    };
  },
};
</script>

<style>

</style>
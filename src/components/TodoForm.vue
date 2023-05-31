<template>
  <div v-if="loading">Loading...</div>
    
    <form v-else @submit.prevent="onSave">
        <div class="row">
            <div class="col-6">
                <Input 
                    lable="Subject"
                    v-model:subject = "todo.subject"
                    :error="subjectErr"
                />
                <!-- <div class="form-group">
                    <label> Todo Subject</label>
                    <input v-model="todo.subject" type="text" class="form-control" />
                    <div v-if="subjectErr" class="text-red">{{subjectErr}}</div>
                </div> -->
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
</template>

<script>
// import axios from "axios";
import axios from "@/axios";
import { useRoute, useRouter} from "vue-router";
import { ref } from "@vue/reactivity";
import { computed, onUpdated } from "vue";
import _ from "lodash";
import {useToast} from "@/composables/toast";
import Input from '@/components/Input.vue';

export default {
  components: {
    Input
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
            const res = await axios.get(`todos/${todoId}`);
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
                res = await axios.put(`todos/${todoId}`, data);
            }else{
                res = await axios.post('todos', data);
                
                todo.value.subject = '';
                todo.value.body = '';
            }

            originalTodo.value = { ...res.data };
            const message = 'Succefully '+ (props.editing ? 'Updated' : 'Create');
            triggerToast(message);

            if(!props.editing){
                router.push({
                    name: 'Todos'
                })
            }
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
      subjectErr,
    };
  },
};
</script>

<style scoped>
    .text-red{
        color:red;
    }

    .fade-enter-active, .fade-leave-active{
        transition: all 0.5s ease;
    }

    .fade-enter-from, .fade-leave-to{
        opacity: 0;
        transform: translateY(-30px);
    }

    .fade-enter-to, .fade-leave-from{
        opacity: 1;
        transform: translateY(0px);
    }
</style>

<style>
    .text-red-all{
        color:darkred;
    }
</style>
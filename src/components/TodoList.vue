<template>
  <!-- <div v-for="(todo, index) in todos" :key="todo.id" class="card mt-2"> -->
    <List
      :items="todos">
      <template #default="{item, index}">
        <div 
          class="card-body p-2 d-flex align-items-center"
          style="cursor: pointer;"
          @click="moveToPage(item.id)">
          <div class="flex-grow-1">
            <input 
              class="input" 
              type="checkbox" 
              :checked="item.completed"
              @change.stop="toggleTodo(index, $event)"
              @click.stop=""
              >
            <span
              class="ml-2 mr-2"
              :class="{todo: item.completed}">
              {{item.subject}}
            </span>
          </div>
          <div>
            <button @click.stop="openModal(item.id)" class="btn btn-danger">Delete</button>
          </div>
        </div>
      </template>
    <!-- </div> -->
  </List>
    <teleport to="#modal">
      <Modal v-if="showModal" @close="closeModal" @delete="deleteTodo">
        <!-- slot 부분 -->
        <template v-slot:title>Delete Todo!!</template> 
        <template v-slot:body>Are you sure?</template> 
        <template v-slot:footer>delete</template> 
      </Modal>
    </teleport>
</template>

<script>
  import {useRouter} from 'vue-router';
  import Modal from '@/components/DeleteModal.vue'
  import {ref, getCurrentInstance} from 'vue';
  import List from '@/components/List.vue'

  export default {
      components:{
        Modal,
        List
      },
    // props: ['todos'] //부모 컴포넌트에서 보낸 변수에 접근할 수 있도록 선언
      props : { //부모 컴포넌트에서 보낸 변수를 오브젝트로 선언하여 타입과 필수여부 설정
          todos: {
              type: Array,
              required: true
          }
      },
      emits: ['toggle-todo', 'delete-todo'],
      // setup(props, context){
      setup(){
        const {emit} = getCurrentInstance();
        const router = useRouter();
        const showModal = ref(false);
        const todoDeleteId = ref(null);
        const toggleTodo =(index, event)=>{
          // context.emit('toggle-todo', index);
          emit('toggle-todo', index, event.target.checked);
        }
        const deleteTodo=()=>{
          // context.emit('delete-todo', index);
          emit('delete-todo', todoDeleteId.value);

          showModal.value = false;
          todoDeleteId.value = null;
        }
        const moveToPage=(todoId)=>{
          // router.push('/todos/'+todoId);

          //Object > url이 변경되어도 index.js에서만 수정해주면 됨
          router.push({
            name: 'Todo', //index.js에 정의한 route
            params: {
              id: todoId //index.js에 정의한 대로 파라미터 명 : 값
            }
          })
        }

        const openModal=(id)=>{
          console.log(showModal.value)
          todoDeleteId.value = id;
          showModal.value = true;
          console.log(showModal.value)
        }

        const closeModal=()=>{
          todoDeleteId.value = null;
          showModal.value = false;
        }

        return {
          toggleTodo, deleteTodo, moveToPage
          , showModal , openModal, closeModal
        }
      }
  }
</script>

<style>

</style>
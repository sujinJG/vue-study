<template>
    <form @submit.prevent="onSubmit">
      <div class="d-flex">
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
      </div>
      <div v-show="hasError" style="color:red;">this field cannot be empty</div>
    </form>
</template>

<script>
    import { ref } from 'vue'; 
    export default{
      emits: ['add-todo'],
      setup(){ //context < 부모컴포넌트로 데이터를 보낼때 필요
          const {emit} = getCurrentInstance();
          const todo = ref('');
          const hasError = ref(false);

          const onSubmit=()=>{
              if(todo.value === ''){
              hasError.value = true;
              }else{
                  emit('add-todo', {
                      id: Date.now(),
                      subject: todo.value,
                      completed: false
                  })
                  hasError.value = false;
                  todo.value = "";
              }
          }; 

          return {
              todo
              , hasError
              , onSubmit
          }
      }
    }
</script>

<style></style>
<template>
  <div v-for="(todo, index) in todos" :key="todo.id" class="card mt-2">
      <div class="card-body p-2 d-flex align-items-center">
        <div class="form-check flex-grow-1">
          <input 
            class="form-check-input" 
            type="checkbox" 
            v-model="todo.completed">
          <label
            :class="{todo: todo.completed}"
            class="form-check-label" for="todo.subject" >
            {{todo.subject}}
          </label>
        </div>
        <div>
          <button @click="deleteTodo(index)" class="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    // props: ['todos'] //부모 컴포넌트에서 보낸 변수에 접근할 수 있도록 선언
    props : { //부모 컴포넌트에서 보낸 변수를 오브젝트로 선언하여 타입과 필수여부 설정
        todos: {
            type: Array,
            required: true
        }
    }
}
</script>

<style>

</style>
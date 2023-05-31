<template>
  <div>Home Page</div>
  <div>{{ count }}</div>
  <button @click="count++">add</button>
</template>

<script>
import {useCount} from '@/composables/count'
export default {
  setup(){
    const {count} = useCount();  // 구조분해해서 접근할 경우 reactivity를 잃음
    

    return {
      count
    }
  }
}
</script>

<style>

</style>
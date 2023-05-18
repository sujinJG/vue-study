<template>
  <div class="name">{{name}}</div>
</template>

<script>
  export default {
    setup(){
      const name = 'Kossie coder';
      return {
        name
      };
    }
  }
</script>

<style>
  .name {
    color :red
  }
</style>
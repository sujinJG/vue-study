<template>
  <div class="name">{{greet}}</div>
</template>

<script>
  export default {
    setup(){
      const name = 'Kossie coder';

      const greeting =(name)=>{ //eslint-disable-line no-unused-vars
        return 'Hello '+name;
      };

      const greet = greeting(name);

      return {
        greet
      };
    }
  }
</script>

<style>
  .name {
    color :red
  }
</style>
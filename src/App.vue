<template>
  <Navbar />
  <div class="container">
    <router-view />
  </div>
  <Transition name="slide">
    <Toast 
      :message="'hello'"
      :type="'success'"/>
  </Transition>
</template>

<script>
import Toast from '@/components/Toast.vue';
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Toast, Navbar
  },
};
</script>

<style scoped>
 
</style>
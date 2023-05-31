<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" :to="{name: 'Home'}">Kossie Coder</router-link>
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="nav-link" :to="{name: 'Todos'}"> Todos  <span class="sr-only">(current)</span> </router-link>
      </li>
    </ul>
  </nav>
  <div class="container">
    <router-view />
  </div>
  <Transition name="slide">
    <Toast 
      v-if="showToast"
      :message="toastMessage"
      :type="toastAlertType"/>
  </Transition>
</template>

<script>
import Toast from '@/components/Toast.vue';
import {useToast} from "@/composables/toast";
import {useStore} from 'vuex';

export default {
  components: {
    Toast
  },

  setup (){
    const store = useStore();
    console.log(store.state)
    const {
          toastMessage,
          toastAlertType,
          showToast,
          triggerToast,
    } = useToast();

    console.log(showToast.value);

    return {
      toastMessage,
      toastAlertType,
      showToast,
      triggerToast,
    }
  }
};
</script>

<style scoped>
  .text-red{
        color:red;
    }

    .slide-enter-active, .slide-leave-active{
        transition: all 0.5s ease;
    }

    .slide-enter-from, .slide-leave-to{
        opacity: 0;
        transform: translateY(-30px);
    }

    .slide-enter-to, .slide-leave-from{
        opacity: 1;
        transform: translateY(0px);
    }
</style>
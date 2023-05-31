<template>
  <transition name="home">
    <base-loader v-if="isLoading"></base-loader>
    <auth-component v-else-if="!isAutherized"></auth-component>
    <list-todo v-else></list-todo>
  </transition>
</template>

<script>
import { Auth } from 'aws-amplify';
import AuthComponent from './Components/Auth/AuthComponent.vue';
import { useTodoStore } from './store/TodoStore.js';
import ListTodo from './Components/TodoCRUD/ListTodo.vue';
import BaseLoader from './Components/BaseLoader.vue'
import { useAuthentication } from './store/Auth.js';
export default {
  components: {
    AuthComponent,
    ListTodo,
    BaseLoader
  },
  data() {
    return {
      AuthStore: useAuthentication(),
      TodoStore: useTodoStore()
    }
  },
  methods: {
    async signOut() {
      const user = await Auth.signOut();
      console.log(user);
    },
  },
  computed: {
    isAutherized() {
      console.log(this.AuthStore.isAuthenticated);
      return this.AuthStore.isAuthenticated;
    },
    isLoading(){
      return this.AuthStore.isLoading;
    }
  },
  async created() {
    this.AuthStore.setLoading(true);
    await this.AuthStore.checkAuthentication();
    this.AuthStore.setLoading(false);
  }
}
</script>
<style >
* {
  box-sizing: content-box;
  padding: 0;
  margin: 0;
}
.home-enter-from {
    opacity: 0;
}

.home-enter-active {
    transition: all 0.5s ease-in-out;
}

.home-enter-to {
    opacity: 1;
}
</style>


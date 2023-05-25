<template>
  <base-loader v-if="isLoading"></base-loader>
  <auth-component v-else-if="!isAutherized"></auth-component>
  <list-todo v-else></list-todo>

  <!-- <Authenticator>
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.username }}!</h1>
      <button @click="signOut">Sign Out</button>
    </template>
  </Authenticator> -->
</template>

<script>
// import { Authenticator } from "@aws-amplify/ui-vue";
import { Auth } from 'aws-amplify';
// import "@aws-amplify/ui-vue/styles.css";
import AuthComponent from './Components/Auth/AuthComponent.vue';
import { useTodoStore } from './store/TodoStore.js';
import ListTodo from './Components/TodoCRUD/ListTodo.vue';
import BaseLoader from './Components/BaseLoader.vue'
import { useAuthentication } from './store/Auth.js';
export default {
  components: {
    // Authenticator,
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
  mounted() {
    console.log(this.TodoStore.getTodos);
  },
  async created() {
    this.isLoading = true;
    await this.AuthStore.checkAuthentication();
    this.isLoading = false;
  }
}
</script>
<style>
* {
  padding: 0;
  margin: 0;
}
</style>


<template>
  <h2 v-if="isLoading">Loading.....</h2>
  <auth-component v-else-if="!isAutherized"></auth-component>
  <list-todo v-else></list-todo>
  <button @click="signOut">Sign Out</button>
  
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
import {useTodoStore} from './store/TodoStore.js';
import ListTodo from './Components/TodoCRUD/ListTodo.vue';
export default {
  components: {
    // Authenticator,
    AuthComponent,
    ListTodo,
  },
  data() {
    return {
      isAutherized: false,
      isLoading: false,
      TodoStore : useTodoStore()
    }
  },
  methods: {
  //   async signIn() {
  //     const user = await Auth.signIn(this.username, this.password);
  //     console.log(user);
  //   },
    async signOut() {
      const user = await Auth.signOut();
      console.log(user);
    },
  //   async signUp() {
  //     const username = this.username;
  //     const password = this.password;
  //     const email = this.email;
  //     try {
  //       const { user } = await Auth.signUp({
  //         username,
  //         password,
  //         attributes: {
  //           email,
  //         },
  //         autoSignIn: { // optional - enables auto sign in after user is confirmed
  //           enabled: true,
  //         }
  //       });
  //       console.log(user);
  //     } catch (error) {
  //       console.log('error signing up:', error);
  //     }
  //   },
  //   async confirmSignUp() {
  //     try {
  //       const result = await Auth.confirmSignUp(this.username,this.code,{
  //         autoSignIn: {
  //           enabled: true,
  //         }
  //       });
  //       console.log(result);
  //     } catch (error) {
  //       console.log('error confirming sign up', error);
  //     }
  //   }
  },
  
  mounted() {
    console.log(this.TodoStore.getTodos);
  },
  async created() {
    console.log(Auth);
    try {
      this.isLoading = true;
      const userData = await Auth.currentUserInfo();
      if(Object.keys(userData).length){
        this.isAutherized = true;
        console.log(Object.keys(userData))
      }
      this.isLoading = false;
      console.log(userData);
    } catch (e) {
      this.isAutherized = false;
      this.isLoading= false;
    }
  }
}
</script>
<style>
* {
  padding: 0;
  margin: 0;
}
</style>


<template>
    <h2>List Items</h2>
    <ul>
        <li v-for="item in TodoStore.getTodos" :key="item.id">
            <span>{{item.todo}}</span> - <span>{{item.description}}</span>
        </li>
    </ul>
    <button @click="AuthStore.signOut">Sign Out</button>
</template>

<script>
import { useTodoStore } from '../../store/TodoStore.js'
import {useAuthentication} from '../../store/Auth.js'
export default {
    data() {
        return {
            TodoStore: useTodoStore(),
            AuthStore : useAuthentication()
        }
    }
}
</script>
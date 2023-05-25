<template>
    <h2>List Items</h2>
    <ul>
        <li v-for="item in TodoStore.getTodos" :key="item.id">
            <span>{{item.todo}}</span> - <span>{{item.description}}</span>
        </li>
    </ul>
</template>

<script>
import { useTodoStore } from '../../store/TodoStore.js'
export default {
    data() {
        return {
            TodoStore: useTodoStore()
        }
    }
}
</script>
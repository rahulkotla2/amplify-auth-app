import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todoStore',{
    state(){
        return {
            todos: [],
        }
    },
    getters : {
        getTodos(state){
            return state.todos;
        }
    },
    actions : {
        setTodos(items){
           this.todos = items;
        }
    }
})
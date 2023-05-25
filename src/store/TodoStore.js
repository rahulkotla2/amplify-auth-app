import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todoStore',{
    state(){
        return {
            todos: [
                {
                    id: '1',
                    todo: 'Complete Work on Pinia',
                    description: 'Read Pinia Documentation'
                },
                {
                    id: '2',
                    todo: 'Complete Work on Amplify',
                    description: 'Read Amplify Documentation and Practice Auth'
                }]
        }
    },
    getters : {
        getTodos(state){
            return state.todos;
        }
    }
})
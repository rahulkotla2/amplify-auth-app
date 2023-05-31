<template>
    <transition name="dialog">
        <div class="container" v-if="!VerifyingEmail">
            <p class="h1 mb-3 text-center fw-bold">Hello {{ username }}</p>
            <div class="m-3">
                <div
                    class="d-flex flex-column col-10 offset-1 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon3">Title</span>
                        <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4"
                            v-model="title">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon3">Desription</span>
                        <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4"
                            v-model="description">
                    </div>
                    <button type="button" class="btn btn-success" v-if="!isUpdating" @click="createTodo">Add Todo</button>
                    <button type="button" class="btn btn-success" v-else @click="updateTodo">Update Todo</button>
                    <todo-loader v-if="isTodoLoading"></todo-loader>
                    <transition>
                        <p class="mt-3 text-center" v-if="!isTodoLoading && !todos.length">No Todos Add some to See</p>
                    </transition>
                    <transition>
                        <div class="card mt-5" v-if="!isTodoLoading">
                            <ul class="list-group list-group-flush">
                                <li v-for="todo in todos" :key="todo.id"
                                    class="list-group-item d-flex flex-column flex-md-row align-items-center justify-content-between">
                                    <span class="fw-bold">{{ todo.title }}</span>
                                    -
                                    <span class="col-md-5 col-12 mb-sm-3 mb-md-0">{{ todo.description }}</span>
                                    <div class="d-flex">
                                        <button type="button" @click="editTodo(todo.id)" v-if="!(isUpdating == todo.id)"
                                            class="btn btn-warning me-2">Edit</button>
                                        <button type="button" @click="cancleUpdate" v-else
                                            class="btn btn-secondary me-2">Cancle</button>
                                        <button type="button" class="btn btn-danger"
                                            @click="deleteTodo(todo.id)">Delete</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </transition>
                    <transition>
                        <div v-if="!isTodoLoading" class="mt-3 col d-flex justify-content-between">
                            <button :disabled="AuthStore.emailVerified" @click="sendVerificationCode" class="btn  col-5"
                                :class="{ 'btn-outline-success': AuthStore.emailVerified, 'btn-outline-warning': !AuthStore.emailVerified }"><span
                                    v-if="AuthStore.emailVerified">Email Verified</span><span v-else>Verify
                                    Email</span></button>
                            <button v-if="!isTodoLoading" @click="AuthStore.signOut"
                                class="btn btn-outline-primary col-5">SignOut</button>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </transition>
    <transition name="dialog">
        <verify-model v-if="VerifyingEmail" @cancle-model="VerifyingEmail = !VerifyingEmail"></verify-model>
    </transition>
</template>

<script>
import TodoLoader from '../TodoLoader.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { useTodoStore } from '../../store/TodoStore.js'
import { useAuthentication } from '../../store/Auth.js'
import { API, Auth } from 'aws-amplify';
import { getUser } from '../../graphql/queries';
import { createUser, createTodo, updateTodo, deleteTodo } from '../../graphql/mutations'
export default {
    components: {
        TodoLoader,
    },
    data() {
        return {
            // todos: [],
            TodoStore: useTodoStore(),
            AuthStore: useAuthentication(),
            title: '',
            description: '',
            isUpdating: null,
            id: '',
            username: '',
            isTodoLoading: false,
            VerifyingEmail: false
        }
    },
    computed: {
        todos() {
            return this.TodoStore.getTodos;
        }
    },
    methods: {
        async sendVerificationCode() {
            try {
                const data = await Auth.verifyCurrentUserAttribute('email');
                console.log(data);
                this.VerifyingEmail = true;
            } catch (e) {
                alert(e.message);
            }
        },
        editTodo(id) {
            this.isUpdating = id;
            const result = this.todos.find((item) => item.id === id);
            console.log(result);
            this.title = result.title;
            this.description = result.description;
        },
        cancleUpdate() {
            this.isUpdating = null;
            this.title = ''
            this.description = '';
            console.log('cancleUpdate')
        },
        async createTodo() {
            const { title, description, id } = this;
            if (!title || !description || !id) {
                alert("Todo Fields Can't be Empty,Please Fill them and try again")
                return;
            }
            this.isTodoLoading = true;
            const todo = { userTodosId: id, title, description };
            await API.graphql({
                query: createTodo,
                variables: { input: todo }
            });
            this.title = '';
            this.description = '';
            await this.getTodos();
            this.isTodoLoading = false;
            console.log('Create Todo');
        },
        async updateTodo() {
            const id = this.isUpdating;
            this.isTodoLoading = true
            try {
                const newTodo = { id, title: this.title, description: this.description };
                await API.graphql({
                    query: updateTodo,
                    variables: { input: newTodo }
                });
                this.filterTodo(id, 'update');
                this.title = ''
                this.description = '';
                this.UpdatedVariable = null;
                this.isTodoLoading = false;
            }
            catch (e) {
                console.log(e);
            }
            this.isUpdating = null;
        },
        async deleteTodo(id) {
            this.isTodoLoading = true;
            try {
                await API.graphql({
                    query: deleteTodo,
                    variables: { input: { id } }
                });
                this.filterTodo(id, 'delete');
                this.isTodoLoading = false;
            }
            catch (e) {
                console.log(e);
            }
        },
        async getTodos() {
            const searchId = this.id;
            const user = await API.graphql({
                query: getUser,
                variables: { id: searchId },
            });
            const fetchedTodos = user.data.getUser.todos.items
            this.TodoStore.setTodos(fetchedTodos);
        },
        async checkUserPresent() {
            const id = this.id;
            const result = await API.graphql({
                query: getUser,
                variables: { id }
            });
            if (result.data.getUser) return true;
            return false;
        },
        async createUserIn() {
            const { id, username: name } = this;
            if (!id || !name) return;
            const todo = { id, name };
            //this.todos = [...this.todos, todo];
            const result = await API.graphql({
                query: createUser,
                variables: { input: todo }
            });
            console.log(result);
            this.name = '';
            this.description = '';
        },
        filterTodo(id, operation) {
            this.todos.forEach((todo, num) => {
                if (operation === 'update' && todo.id === id) {
                    todo.title = this.title;
                    todo.description = this.description;
                } else if (operation === 'delete' && todo.id === id) {
                    this.todos.splice(num, 1)
                }
            })
        }
    },
    async created() {
        try {
            this.isTodoLoading = true;
            const data = await Auth.currentUserInfo();
            this.username = data.username;
            this.id = data.id;
            if (data.attributes.email_verified) {
                this.AuthStore.setEmailVerified(true);
            }
            if (data.attributes.phone_number) {
                this.AuthStore.setMobileVerified(true);
            }
            const userPresent = await this.checkUserPresent()
            if (!userPresent) {
                this.createUserIn();
            }
            await this.getTodos();
            this.isTodoLoading = false;
            console.log(data);

        } catch (error) {
            console.log(error);
        }
        console.log('Username and Password from created', this.username, this.id);
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300&display=swap');

* {
    font-family: 'Merriweather', serif;
}

.v-enter-from {
    transform: translateY(50px);
    opacity: 0;
}

.v-enter-active {
    transition: all 0.5s ease-in-out;
}

.v-enter-to {
    transform: translateY(0px);
    opacity: 1;
}

.dialog-enter-from,
.dialog-leave-to {
    opacity: 0;
}

.dialog-enter-active,
.dialog-leave-active {
    transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
    opacity: 1;
}</style>


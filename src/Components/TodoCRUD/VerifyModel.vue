<template>
    <div class="content">
            <div class="mb-3 wrap" v-if="true">
                <h1 class="text-center">Verify Your Email</h1>
                <div>
                    <label for="code" class="form-label">Enter Your code to Verify</label>
                    <input type="text" class="form-control" v-model="emailCode" id="code" placeholder="Enter the Code" required>
                    <div class="d-flex justify-content-evenly mt-3">
                        <button class="btn btn-secondary mt-3 col-5 " @click="verifyEmail">Verify</button>
                        <button class="btn btn-secondary mt-3 col-5 " @click="$emit('cancle-model')">Cancle</button>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { useAuthentication } from '../../store/Auth.js';
import { Auth } from 'aws-amplify';
export default {
    emits: ['cancle-model'],
    data() {
        return {
            AuthStore: useAuthentication(),
            emailCode: '',
        }
    },
    methods: {
        async verifyEmail() {
            if (this.emailCode == '') {
                alert("Code Cant be Empty");
                return
            }
            try {
                const data = await Auth.verifyCurrentUserAttributeSubmit('email', this.emailCode)
                console.log(data,Auth);
                this.AuthStore.checkAuthentication();
                this.$emit('cancle-model');
            } catch (e) {
                alert(e.message);
            }
        }
    }
}
</script>

<style scoped>
* {
    box-sizing: border-box;
}

.content {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: rgba(216, 211, 211, 0.522);
}

.wrap {
    width: 50vw;
    height: 60vh;
    background-color: whitesmoke;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    border-radius: 30px;
}
</style>
<template>
    <div class="content">
        <div class="main">
            <input type="checkbox" id="chk" aria-hidden="true">
            <div class="signup" v-if="!isConfirmSignup">
                <label for="chk" aria-hidden="true">Sign up</label>
                <input type="text" name="txt" placeholder="User name" required="" v-model="signupUsername">
                <input type="email" name="email" placeholder="Email" required="" v-model="signupEmail">
                <input type="password" name="pswd" placeholder="Password" required="" v-model="signupPassword">
                <button @click="signup">Sign up</button>
            </div>
            <div class="login" v-if="!isConfirmSignup">
                <label for="chk" aria-hidden="true">Login</label>
                <input type="txt" name="txt" placeholder="Email" required="" v-model="loginUsername">
                <input type="password" name="pswd" placeholder="Password" required="" v-model="loginPassword">
                <button @click="signIn">Login</button>
            </div>
            <div class="signup" v-if="isConfirmSignup">
                <label for="chk" aria-hidden="true">Confirm Sign Up</label>
                <input type="text" name="Code" placeholder="Verification Code" required="" v-model="confirmsignupCode">
                <button @click="confirmSignup">Confirm Signup</button>
            </div>
        </div>
    </div>
</template>
<script>
import { Auth } from 'aws-amplify';
import { useAuthentication } from '../../store/Auth.js';
export default {
    data() {
        return {
            signupUsername: '',
            signupEmail: '',
            signupPassword: '',
            loginUsername: '',
            loginPassword: '',
            confirmsignupUsername: '',
            confirmsignupCode: '',
            isConfirmSignup: false,
            AuthStore : useAuthentication(),

        }
    },
    methods: {
        async signup() {
            const username = this.signupUsername;
            const password = this.signupPassword;
            const email = this.signupEmail;
            console.log(username,password,email);
            try {
                const { user } = await Auth.signUp({
                    username,
                    password,
                    attributes: {
                        email,
                    },
                    autoSignIn: {
                        enabled: true,
                    }
                });
                this.confirmsignupUsername = this.signupUsername;
                this.isConfirmSignup = true;
                this.resetData('signupUsername','signupEmail','signupPassword');
                console.log(user);
            } catch (error) {
                console.log('error signing up:', error);
            }
        },
        async confirmSignup() {
            try {
                const result = await Auth.confirmSignUp(this.confirmsignupUsername, this.confirmsignupCode, {
                    autoSignIn: {
                        enabled: true,
                    }
                });
                this.isConfirmSignup = false;
                console.log(result);
            } catch (error) {
                console.log('error confirming sign up', error);
            }
        },
        async signIn() {
            // try{
            //     const user = await Auth.signIn(this.loginUsername, this.loginPassword);
            //     await this.AuthStore.checkAuthentication();
            //     console.log(user);
            // }catch(error){
            //     console.log(error);
            // }
            this.AuthStore.signIn(this.loginUsername,this.loginPassword);
        },
        async signOut() {
            const user = await Auth.signOut();
            console.log(user);
        },
        resetData(...data) {
            for (const item of data) {
                this[item] = '';
            }
        }
    }
}
</script>

<style scoped>
.content {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-family: 'Jost', sans-serif;
    background: linear-gradient(45deg,#E2D1F9,white);
}

.main {
    width: 500px;
    height: 500px;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 5px 20px 50px #000;
    /* background: linear-gradient(45deg,#cc2b5e , #753a88); */
    background: linear-gradient(135deg,#42275a , #734b6d);
}

#chk {
    display: none;
}

.signup {
    position: relative;
    width: 100%;
    height: 100%;
}

label {
    color: #fff;
    font-size: 2.3em;
    justify-content: center;
    display: flex;
    margin: 60px;
    font-weight: bold;
    cursor: pointer;
    transition: .5s ease-in-out;
}

input {
    width: 60%;
    height: 20px;
    background: #e0dede;
    justify-content: center;
    display: flex;
    margin: 20px auto;
    padding: 10px;
    border: none;
    outline: none;
    border-radius: 5px;
}

button {
    width: 60%;
    height: 40px;
    margin: 10px auto;
    justify-content: center;
    display: block;
    color: #fff;
    background: #573b8a;
    font-size: 1em;
    font-weight: bold;
    margin-top: 20px;
    outline: none;
    border: none;
    border-radius: 5px;
    transition: .2s ease-in;
    cursor: pointer;
}

button:hover {
    background: #6d44b8;
}

.login {
    height: 460px;
    background: #eee;
    border-radius: 60% / 10%;
    transform: translateY(-180px);
    transition: .8s ease-in-out;
}

.login label {
    color: #573b8a;
    transform: scale(.6);
}

#chk:checked~.login {
    transform: translateY(-500px);
}

#chk:checked~.login label {
    transform: scale(1);
}

#chk:checked~.signup label {
    transform: scale(.6);
}
</style>
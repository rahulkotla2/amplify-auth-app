<template>
    <div class="content">
        <div class="main">
            <input type="checkbox" id="chk" aria-hidden="true">
            <transition>
                <div class="signup" v-if="!(isConfirmSignup || isforgotPassword)">
                    <label class="signupLabel" for="chk" aria-hidden="true">Sign up</label>
                    <google-signup @click="federatedSignin"></google-signup>
                    <input class="input" type="text" name="txt" placeholder="User name" required=""
                        v-model.trim="signupUsername">
                    <input class="input" type="email" name="email" placeholder="Email" required=""
                        v-model.trim="signupEmail">
                    <input class="input" type="password" name="pswd" placeholder="Password" required=""
                        v-model.trim="signupPassword">
                    <button @click="signup">Sign up</button>
                </div>
            </transition>
            <transition>
                <div class="login" v-if="!(isConfirmSignup || isforgotPassword)">
                    <label for="chk" aria-hidden="true">Login</label>
                    <input class="input" type="txt" name="txt" placeholder="Username" required=""
                        v-model.trim="loginUsername">
                    <input class="input" type="password" name="pswd" placeholder="Password" required=""
                        v-model.trim="loginPassword">
                    <button @click="signIn">Login</button>
                    <button class="forgotPass" @click="forgotPassword">forgot password</button>
                </div>
            </transition>
            <transition>
                <div class="signup" v-if="(isConfirmSignup || isforgotPassword)">
                    <transition>
                        <div v-if="isConfirmSignup">
                            <label for="chk" aria-hidden="true">Confirm Sign Up</label>
                            <input class="input" type="text" name="Code" placeholder="Verification Code" required=""
                                v-model.trim="confirmsignupCode">
                            <p class="alertCode" v-if="falseCode">Wrong Verification Code try Again</p>
                            <button @click="confirmSignup">Confirm Signup</button>
                            <button @click="resendVerificationCode">Resend Verification Code</button>
                        </div>
                        <div v-else>
                            <label for="chk" aria-hidden="true">Enter Username</label>
                            <div v-if="!fogotVerificationSent">
                                <input class="input" type="text" name="Code" placeholder="Enter Username" required=""
                                    v-model.trim="forgotPassUsername">
                                <button @click="forgotUserSendCode">Send Verification Code</button>
                            </div>
                            <div v-else>
                                <input class="input" type="text" name="Code" placeholder="Enter Verification Code"
                                    required="" v-model.trim="forgotPassCode">
                                <input class="input" type="password" name="Code" placeholder="Enter New Password"
                                    required="" v-model.trim="forgotPassNewPassword">
                                <button @click="forgotUserVerifyCode">Confirm Verification Code</button>
                            </div>
                        </div>
                    </transition>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import { Auth } from 'aws-amplify';
import { useAuthentication } from '../../store/Auth.js';
import GoogleSignup from '../SignupCompoenents/GoogleSignup.vue';
export default {
    components: {
        GoogleSignup,
    },
    data() {
        return {
            signupUsername: '',
            signupEmail: '',
            signupPassword: '',
            loginUsername: '',
            loginPassword: '',
            forgotPassUsername: '',
            forgotPassCode: '',
            forgotPassNewPassword: '',
            confirmsignupUsername: '',
            confirmsignupCode: '',
            isConfirmSignup: false,
            isforgotPassword: false,
            fogotVerificationSent: false,
            falseCode: false,
            AuthStore: useAuthentication(),

        }
    },
    methods: {
        async resendVerificationCode() {
            try {
                await Auth.resendSignUp(this.confirmsignupUsername);
                console.log('code resent successfully');
            } catch (err) {
                console.log('error resending code: ', err);
            }
        },
        async forgotUserVerifyCode() {
            try {
                if (this.forgotPassCode == '' || this.forgotPassNewPassword == '') {
                    alert('Fields Cannot be Empty');
                    return
                }
                const user = await Auth.forgotPasswordSubmit(this.forgotPassUsername, this.forgotPassCode, this.forgotPassNewPassword);
                this.isforgotPassword = false;
                this.fogotVerificationSent = false;
                console.log(user);
            }
            catch (e) {
                console.log(e);
                alert(e.message);
            }
        },
        async forgotUserSendCode() {
            try {
                if (this.forgotPassUsername == '') {
                    alert('Fields Cannot be Empty');
                    return
                }
                const user = await Auth.forgotPassword(this.forgotPassUsername);
                console.log(user);
                this.fogotVerificationSent = true;
            } catch (e) {
                alert(e.message)
            }
        },
        forgotPassword() {
            this.isforgotPassword = true;
        },
        async federatedSignin() {
            console.log(Auth);
            const result = await Auth.federatedSignIn({ provider: "Google" })
            console.log(result);
        },
        async signup() {
            const username = this.signupUsername;
            const password = this.signupPassword;
            const email = this.signupEmail;
            if (username == '' || password == '' || email == '') {
                alert('Signup fields Cannot be Empty');
                return
            }
            console.log(username, password, email);
            try {
                const { user } = await Auth.signUp({
                    username,
                    password,
                    attributes: {
                        email,
                    }
                });
                this.confirmsignupUsername = this.signupUsername;
                this.isConfirmSignup = true;
                this.resetData('signupUsername', 'signupEmail', 'signupPassword');
                console.log(user);
            } catch (error) {
                alert(error.message);
            }
        },
        async confirmSignup() {
            try {
                if (this.confirmsignupCode == '') {
                    alert('Code Field Cannot be Empty');
                    return
                }
                const result = await Auth.confirmSignUp(this.confirmsignupUsername, this.confirmsignupCode);
                this.isConfirmSignup = false;
                console.log(result);
                alert(`User Creation is ${result}`);

            } catch (error) {
                this.falseCode = true;
            }
        },
        async signIn() {
            try {
                const username = this.loginUsername;
                const password = this.loginPassword;
                if (username == '' || password == '') {
                    alert('Login fields Cannot be Empty');
                    return
                }
                this.AuthStore.signIn(this.loginUsername, this.loginPassword);
            }
            catch (e) {
                alert(e.message)
            }
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
.forgotPass {
    width: 25%;
    height: 30px;
    margin: 10px auto;
    justify-content: center;
    display: block;
    color: #fff;
    background: #573b8a;
    font-size: 0.7em;
    font-weight: 300;
    margin-top: 20px;
    outline: none;
    border: none;
    border-radius: 5px;
    transition: .2s ease-in;
    cursor: pointer;
}

.alertCode {
    color: whitesmoke;
    text-align: center;
}

.content {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-family: 'Jost', sans-serif;
    background: linear-gradient(45deg, #E2D1F9, white);
}

.main {
    width: 500px;
    height: 500px;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 5px 20px 50px #000;
    /* background: linear-gradient(45deg,#cc2b5e , #753a88); */
    background: linear-gradient(135deg, #42275a, #734b6d);
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

.signupLabel {
    margin: 30px;
}

.input {
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
    transform: translateY(-150px);
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

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.v-enter-active,
.v-leave-active {
    transition: all 0.5s ease-in-out;
}

.v-enter-to,
.v-leave-to {
    opacity: 1;
}
</style>
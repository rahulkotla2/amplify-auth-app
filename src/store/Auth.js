import { defineStore } from 'pinia';
import { Auth } from 'aws-amplify';

export const useAuthentication = defineStore('auth', {
    state() {
        return {
            isAuthenticated: false,
            isLoading: false,
            emailVerified: false,
        }
    },
    actions: {
        setEmailVerified(value) {
            this.emailVerified = value;
        },
        setMobileVerified(value) {
            this.mobileVerified = value;
        },
        async checkAuthentication() {
            this.isLoading = true;
            try {
                // const userData = 
                const data = await Auth.currentAuthenticatedUser();
                console.log(data,'current auth user');
                this.isAuthenticated = true;
                this.isLoading = false;
            } catch (e) {
                this.isAuthenticated = false;
                this.isLoading = false;
                console.log(e);
            }
        }, async signIn(username, password) {
            try {
                this.isLoading = true;
                const user = await Auth.signIn(username, password);
                await this.checkAuthentication();
                this.isLoading = false;
                console.log(user);
            } catch (error) {
                this.isLoading = false;
                alert(error.message);
            }
        },
        async signOut() {
            try {
                this.isLoading = true;
                const user = await Auth.signOut();
                await this.checkAuthentication();
                console.log(user);
            } catch (e) {
                alert(e.message);
            }
        },
        setLoading(value) {
            this.isLoading = value;
        }

    }
})
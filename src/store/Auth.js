import { defineStore } from 'pinia';
import { Auth } from 'aws-amplify';

export const useAuthentication = defineStore('auth', {
    state() {
        return {
            isAuthenticated: false,
            isLoading: false,
        }
    },
    actions: {
        async checkAuthentication() {
            this.isLoading = true;
            try {
                // const userData = 
                await Auth.currentAuthenticatedUser();
                this.isAuthenticated = true;
                this.isLoading = false;
            } catch (e) {
                this.isAuthenticated = false;
                this.isLoading = false;
                console.log(e);
            }
        }, async signIn(username, password) {
            this.isLoading = true;
            try {
                const user = await Auth.signIn(username, password);
                await this.checkAuthentication();
                this.isLoading = false;
                console.log(user);
            } catch (error) {
                console.log(error);
                this.isLoading = false;
            }
        },
        async signOut() {
            this.isLoading = true;
            const user = await Auth.signOut();
            await this.checkAuthentication();
            console.log(user);
        },
        setLoading(value) {
            this.isLoading = value;
        }

    }
})
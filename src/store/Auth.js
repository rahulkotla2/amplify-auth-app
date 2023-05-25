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
                const userData = await Auth.currentUserInfo();
                if (Object.keys(userData).length) {
                    this.isAuthenticated = true;
                    console.log(Object.keys(userData))
                    this.isLoading = false;
                }
                console.log(userData, 'Auth Data');
            } catch (e) {
                this.isAuthenticated = false;
                this.isLoading = false;
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
    }
})
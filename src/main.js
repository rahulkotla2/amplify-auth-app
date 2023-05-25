import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'


import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const app = createApp(App)
app.use(createPinia())
app.mount('#app')

import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import VerifyModel from './Components/TodoCRUD/VerifyModel.vue'
library.add(faUserSecret,faGoogle)

import { Amplify } from 'aws-amplify';
import awsconfig from './awsUpdateConfig';

Amplify.configure(awsconfig);

const app = createApp(App)
// app.useComponent('font-awesome-icon', FontAwesomeIcon)
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('verify-model', VerifyModel);
app.use(createPinia())
app.mount('#app')

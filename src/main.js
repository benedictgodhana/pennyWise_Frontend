import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.min.css'
import VueTelInput from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'



const vuetify=createVuetify({
    components
    
})

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.use(VueTelInput);
app.mount('#app')

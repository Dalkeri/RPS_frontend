import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHand, faHandScissors, faHandBackFist } from '@fortawesome/free-solid-svg-icons'

import './assets/main.css'

library.add(faHand, faHandScissors, faHandBackFist)


createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import Icon from '@kfl-vue/components/icon'
import '@kfl-vue/theme-chalk/src/index.scss'
import KflTree from '@kfl-vue/components/tree'
import KflCheckbox from '@kfl-vue/components/checkbox'
import KflHtmlPreview from '@kfl-vue/components/html-preview'
import { createAutoRouter } from '@kfl-vue/utils/autoRouter'


const app = createApp(App)

const plugins = [Icon, KflTree, KflCheckbox, KflHtmlPreview]

plugins.forEach((plugin) => app.use(plugin))
const router = createAutoRouter()

app.use(router)
app.mount('#app')

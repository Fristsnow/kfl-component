import { createApp } from 'vue'
import App from './App.vue'
import Icon from '@kfl-ui/components/icon'
import '@kfl-ui/theme-chalk/src/index.scss'
import KflTree from '@kfl-ui/components/tree'
import KflCheckbox from '@kfl-ui/components/checkbox'
import KflHtmlPreview from '@kfl-ui/components/html-preview'
import {createRouterFromGlobs, type PageConfig} from '@kfl-ui/utils/autoRouter'

const app = createApp(App)

const plugins = [Icon, KflTree, KflCheckbox, KflHtmlPreview]

plugins.forEach((plugin) => app.use(plugin))

const pages = {
    ...import.meta.glob('/src/views/**/page.ts', { eager: true, import: 'default' }),
} as Record<string, PageConfig>;

const components = import.meta.glob('/src/views/**/index.vue');

const router = createRouterFromGlobs(pages, components);

console.log(router, "router")

app.use(router)

app.mount('#app')

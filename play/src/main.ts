/*
 * @Author: FirstsnowLucky firstsnow1119@163.com
 * @Date: 2025-04-16 12:08:26
 * @LastEditors: FirstsnowLucky firstsnow1119@163.com
 * @LastEditTime: 2025-05-23 12:24:02
 * @FilePath: \kfl-component\play\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import App from './App.vue'
import Icon from '@kfl-ui/components/icon'
import '@kfl-ui/theme-chalk/src/index.scss'
import KflTree from '@kfl-ui/components/tree'
import KflCheckbox from '@kfl-ui/components/checkbox'
import KflHtmlPreview from '@kfl-ui/components/html-preview'
import { createAutoRouter } from '@kfl-ui/utils/autoRouter'


const app = createApp(App)

const plugins = [Icon, KflTree, KflCheckbox, KflHtmlPreview]

plugins.forEach((plugin) => app.use(plugin))
const router = createAutoRouter({mode: 'ts'})

app.use(router)
app.mount('#app')

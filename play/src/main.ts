/*
 * @Author: FirstsnowLucky firstsnow1119@163.com
 * @Date: 2025-04-16 12:08:26
 * @LastEditors: FirstsnowLucky firstsnow1119@163.com
 * @LastEditTime: 2025-04-16 17:27:39
 * @FilePath: \kfl-component\play\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import App from './App.vue'
import Icon from '@kfl-vue/components/icon'
import '@kfl-vue/theme-chalk/src/index.scss'
import KflTree from '@kfl-vue/components/tree'
import KflCheckbox from '@kfl-vue/components/checkbox'
import KflHtmlPreview from '@kfl-vue/components/html-preview'

const app = createApp(App)

const plugins = [Icon, KflTree, KflCheckbox, KflHtmlPreview]

plugins.forEach((plugin) => app.use(plugin))

app.mount('#app')

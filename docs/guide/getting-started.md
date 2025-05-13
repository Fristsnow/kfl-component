# 快速开始

本节将介绍如何在项目中使用 KFL-UI。

## 用法

### 完整引入

```js
import { createApp } from 'vue'
import App from './App.vue'
import KFLUI from 'kfl-ui'
import 'kfl-ui/dist/index.css'

const app = createApp(App)
app.use(KFLUI)
app.mount('#app')

```

### 按需引入

```js
import { createApp } from 'vue'
import App from './App.vue'
import { KflButton, KflIcon } from 'kfl-ui'
import 'kfl-ui/dist/index.css'

const app = createApp(App)
app.component('KflButton', KflButton)
app.component('KflIcon', KflIcon)
// ...
app.mount('#app')

```
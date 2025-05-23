# 📦 kfl-router - Vue 自动路由生成工具

`kfl-router` 是一个专为 Vue 3 + Vite 项目打造的自动路由生成组件工具，基于目录结构和 `page.ts` 文件自动构建符合约定式的路由配置。

---

## ✨ 功能特性

* 📁 基于 `/src/views/**` 目录自动生成路由配置
* ⚙️ 支持父子路由结构定义（通过 `page.ts` 中的 `children` 字段）
* 🚀 零配置使用，只需在 `main.ts` 中引入即可
* ✅ 使用 TypeScript 编写，类型安全
* 🧠 默认启用调试日志，便于开发中查看自动路由结构

---

## 📦 安装

```bash
pnpm add kfl-ui
# 或者
npm install kfl-ui
# 或者
yarn add kfl-ui
```

---

## 🛠️ 使用方式

### 1. 创建页面结构

```bash
src/
└─ views/
   └─ dashboard/
      ├─ page.ts
      └─ index.vue
```

### 2. 在 `page.ts` 中定义元信息（可选）

```ts
// src/views/dashboard/page.ts
export default {
  title: '控制台',
  meta: {
    requiresAuth: true
  },
  children: [
    {
      path: 'stats',
      name: 'dashboard-stats',
      meta: { title: '统计信息' }
    }
  ]
}
```

### 3. 在 `main.ts` 中引入自动路由

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { createAutoRouter } from 'kfl-router'

const app = createApp(App)

// 自动注册路由
const router = createAutoRouter({
  base: '/', // 可选，设置基础路径
  debug: import.meta.env.DEV // 可选，仅开发环境下输出路由信息
})

app.use(router)
app.mount('#app')
```

---

## 📁 自动扫描规则说明

* 自动扫描路径：`/src/views/**/page.ts`
* 同级必须存在：`index.vue` 组件
* 子路由：通过 `page.ts` 的 `children` 字段声明，路径自动拼接

---

## 🧩 高级配置（可选）

```ts
createAutoRouter({
  base: '/app/', // 修改路由基础路径
  debug: false   // 关闭控制台输出
})
```

---

## 🧪 示例生成路由结构

若目录如下：

```
/views
└─ user/
   ├─ page.ts
   └─ index.vue
└─ user/profile/
   ├─ page.ts
   └─ index.vue
```

自动生成结果类似：

```ts
[
  {
    path: '/user',
    name: 'user',
    component: () => import('/src/views/user/index.vue'),
    meta: { ... },
    children: [
      {
        path: 'profile',
        name: 'user-profile',
        component: () => import('/src/views/user/profile/index.vue'),
        meta: { ... }
      }
    ]
  }
]
```

---

## 📜 类型定义参考

```ts
export interface PageConfig {
  title?: string;
  icon?: string;
  meta?: RouteMeta;
  children?: {
    path: string;
    name: string;
    meta?: RouteMeta;
  }[];
}
```

---

## 🧼 注意事项

* 所有路径必须是 `/src/views/` 开头（vite 限制）
* `page.ts` 必须是默认导出对象
* 每个 `index.vue` 必须存在，否则路由生成失败

---

## 📄 License

MIT License © 2025-present FirstSnow

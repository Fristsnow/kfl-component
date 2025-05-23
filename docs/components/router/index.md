# createRouterFromGlobs

## 简介

`createRouterFromGlobs` 是一个基于 Vue Router 4 的自动化路由生成工具，适用于使用 Vite + Vue 3 构建的项目，借助 `import.meta.glob` 自动解析页面结构并生成标准路由配置，支持嵌套路由、重定向、自定义元信息等特性。

---

## 安装

```bash
npm install @kfl-ui/utils
# 或者
pnpm add @kfl-ui/utils
```

---

## 目录规范

项目页面结构需遵循如下约定：

```
src/
└── views/
    ├── home/
    │   ├── page.ts       # 页面配置
    │   └── index.vue     # 页面组件
    └── user/
        ├── page.ts
        ├── index.vue
        └── profile/
            ├── page.ts
            └── index.vue
```

---

## 页面配置（page.ts）

```ts
// /src/views/user/page.ts
export default {
  meta: {
    title: '用户中心',
    requiresAuth: true
  },
  redirect: '/user/profile',
  children: [
    { path: 'profile', name: 'user-profile', meta: { title: '个人资料' } },
    { path: 'settings', name: 'user-settings', meta: { title: '设置' } }
  ]
}
```

---

## 快速开始

### 导入页面配置与组件

```ts
const pages = import.meta.glob('/src/views/**/page.ts', {
  eager: true,
  import: 'default'
}) as Record<string, PageConfig>

const components = import.meta.glob('/src/views/**/index.vue')
```

### 创建路由对象

```ts
import { createRouterFromGlobs } from '@kfl-ui/utils'

const router = createRouterFromGlobs(pages, components)
```

### 注册到 Vue 应用中

```ts
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(router).mount('#app')
```

---

## 路由配置扩展

* 父路由可配置 `meta`、`redirect`。
* 子路由支持 `name`、`meta` 配置。
* 支持嵌套路由，自动根据目录结构生成层级。

---

## PageConfig 类型定义

```ts
export interface PageConfig {
  title?: string
  icon?: string
  meta?: Record<string, any>
  redirect?: string
  requiresAuth?: boolean
  children?: {
    path: string
    name: string
    meta?: Record<string, any>
  }[]
}
```

---

## 示例效果

访问 `/user` 自动重定向到 `/user/profile`，并渲染 `user/index.vue` 作为父组件，同时 `user/profile/index.vue` 作为子路由内容显示。

确保你的父组件内使用 `<RouterView />` 占位符：

```vue
<!-- user/index.vue -->
<template>
  <div>
    <h1>用户中心</h1>
    <RouterView />
  </div>
</template>
```

---

## 注意事项

* 子组件 `index.vue` 必须存在且路径匹配 `子路径/index.vue`。
* 若组件未按路径规则放置，将导致渲染失败。
* 该工具假设页面结构为物理目录嵌套，逻辑与文件结构一致。

---

## 常见问题

### 父路由组件未显示内容？

请确认父组件中存在 `<RouterView />`，否则不会渲染子路由。

### 为什么我看到父组件和子组件重复渲染？

请避免在父组件中使用 `redirect` 配置后立即跳转，应在 `App.vue` 或 Layout 层中控制默认展示逻辑。

---

## 开发者支持

* Vue 版本：3.x
* Vue Router：4.x
* TypeScript：推荐
* 构建工具：Vite（必须支持 `import.meta.glob`）

---

## License

MIT © KFL UI


<!--
 * @Author: FirstsnowLucky firstsnow1119@163.com
 * @Date: 2025-05-13 11:26:16
 * @LastEditors: FirstsnowLucky firstsnow1119@163.com
 * @LastEditTime: 2025-05-13 11:26:20
 * @FilePath: \kfl-component\README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# KFL-UI 组件库

## 简介

KFL-UI 是一个基于 Vue 3 的轻量级组件库，提供了一系列易用、美观的UI组件，帮助开发者快速构建现代化的Web应用界面。

## 特性

- 🚀 基于 Vue 3 和 TypeScript 开发
- 📦 提供丰富的基础组件
- 🎨 可定制的主题
- 📚 详细的文档和示例

## 组件

目前包含的组件：

- 基础组件
  - Icon 图标
- 数据展示
  - Tree 树形控件
- 表单组件
  - Checkbox 复选框
- 特殊组件
  - html-preview 代码预览

## 安装

```bash
npm install kfl-ui
# 或
yarn add kfl-ui
# 或
pnpm add kfl-ui
```

## 快速开始

```js
import { createApp } from 'vue'
import App from './App.vue'
import KflUI from 'kfl-ui'
import 'kfl-ui/dist/style.css'

const app = createApp(App)
app.use(KflUI)
app.mount('#app')
```

## 文档

访问我们的[文档网站](https://github.com/Fristsnow/kfl-component)获取更多信息。

## 许可证

[MIT](LICENSE)
# HtmlPreview HTML预览

用于预览HTML代码的组件，支持缩放和自定义尺寸。

## 基础用法

基础的HTML预览功能。

```vue
<template>
  <kfl-html-preview :html-code="htmlCode" />
</template>

<script setup>
import { ref } from 'vue'

const htmlCode = ref(`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { 
          margin: 0; 
          padding: 16px; 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: #f5f7fa;
        }
        h1 { color: #409eff; }
      </style>
    </head>
    <body>
      <h1>Hello KFL-UI</h1>
      <p>这是一个HTML预览组件示例</p>
    </body>
  </html>
`)
</script>
```

## 自定义缩放比例

通过 `scale` 属性可以自定义预览窗口的缩放比例，取值范围为 0.1 到 0.88。

```vue
<template>
  <kfl-html-preview :html-code="htmlCode" :scale="0.5" />
</template>
```

## 完整示例

下面是一个完整的示例，展示了如何使用 HTML 预览组件的所有功能。

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div>
      <h3>HTML 代码</h3>
      <textarea v-model="code" rows="10" style="width: 100%;"></textarea>
    </div>
    
    <div>
      <h3>预览效果 (缩放比例: {{ scale }})</h3>
      <input type="range" v-model="scale" min="0.1" max="0.88" step="0.01" />
      <kfl-html-preview :html-code="code" :scale="Number(scale)" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const scale = ref(0.41)
const code = ref(`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        margin: 0;
        padding: 20px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        min-height: 100vh;
      }
      .container {
        max-width: 800px;
        margin: 0 auto;
        background-color: white;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #409eff;
        margin-top: 0;
      }
      .btn {
        background-color: #409eff;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
      }
      .btn:hover {
        background-color: #66b1ff;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>KFL-UI 组件库</h1>
      <p>这是一个基于 Vue 3 的组件库，提供了丰富的 UI 组件。</p>
      <button class="btn">了解更多</button>
    </div>
  </body>
</html>
`)
</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 | 可选值 |
| --- | --- | --- | --- | --- |
| html-code | HTML 代码内容 | string | - | - |
| scale | 缩放比例 | number | 0.41 | 0.1 - 0.88 |

### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| load | iframe 加载完成时触发 | event: Event |
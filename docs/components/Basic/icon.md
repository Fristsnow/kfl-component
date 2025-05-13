# Icon 图标

图标组件，用于展示各种图标。

## 图标颜色

使用 `color` 属性设置图标颜色。

```vue
<template>
  <kfl-icon color="#3eaf7c"></kfl-icon>
  <kfl-icon color="#409eff"></kfl-icon>
  <kfl-icon color="#f56c6c"></kfl-icon>
</template>
```

## 图标大小

使用 `size` 属性设置图标大小。

```vue
<template>
  <kfl-icon size="16"></kfl-icon>
  <kfl-icon size="24"></kfl-icon>
  <kfl-icon size="32"></kfl-icon>
</template>
```

## 自定义类名

使用 `class` 属性添加自定义类名。

```vue
<template>
  <kfl-icon class="custom-icon"></kfl-icon>
</template>
```

## 图标集合

``` shell
npm i -D @vicons/ionicons5

```
### xicons图标文档 [ionicons5](https://www.xicons.org/#/)

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 图标颜色 | string | - |
| size | 图标大小，单位为px | number / string | - |
| class | 自定义类名 | string | - |

### 插槽

| 插槽名 | 说明 |
| --- | --- |
| default | 图标内容，可用于自定义图标 |

## 类型定义

```ts
interface IconProps {
  color?: string
  size?: number | string
  class?: string
}
```

## 样式定制

组件提供了以下 CSS 变量：

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| --kfl-icon-size | 图标默认大小 | 16px |
| --kfl-icon-color | 图标默认颜色 | currentColor |

## 最佳实践

### 1. 结合按钮使用

```vue
<template>
  <kfl-button>
    <kfl-icon size="14" />
    搜索
  </kfl-button>
</template>
```
# Checkbox 复选框

在一组备选项中进行多选。

## 基础用法

单独使用可以表示两种状态之间的切换。

```vue
<template>
  <kfl-checkbox v-model="checked">选项</kfl-checkbox>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)
</script>
```

## 禁用状态

复选框不可用状态。

```vue
<template>
  <kfl-checkbox v-model="checked1" disabled>禁用</kfl-checkbox>
  <kfl-checkbox v-model="checked2" disabled>禁用选中</kfl-checkbox>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked1 = ref(false)
const checked2 = ref(true)
</script>
```

## 中间状态

`indeterminate` 属性用以表示 checkbox 的不确定状态。

```vue
<template>
  <kfl-checkbox v-model="checked" :indeterminate="true">部分选中</kfl-checkbox>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(true)
</script>
```
## 事件示例

```vue
<template>
  <kfl-checkbox v-model="checked" @change="handleChange">选项</kfl-checkbox>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref<boolean>(false)

const handleChange = (value: boolean) => {
  console.log(`选中状态${value}`)
}
</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 选中项绑定值 | boolean | false |
| disabled | 是否禁用 | boolean | false |
| indeterminate | 设置不确定状态，仅负责样式控制 | boolean | false |
| name | 原生 name 属性 | string | - |

### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 当绑定值变化时触发的事件 | (value: boolean) |

### 插槽

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义默认内容 |
```
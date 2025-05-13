# Tree 树形控件

用清晰的层级结构展示信息，可展开或折叠。

## 基础用法

基础的树形结构展示。

```vue
<template>
  <kfl-tree
    :data="data"
    :props="{
      children: 'children',
      label: 'label'
    }"
    node-key="id"
  />
</template>

<script setup lang="ts">
const data = [
  {
    id: '1',
    label: '一级 1',
    children: [
      {
        id: '1-1',
        label: '二级 1-1',
        children: [
          {
            id: '1-1-1',
            label: '三级 1-1-1'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    label: '一级 2',
    children: [
      {
        id: '2-1',
        label: '二级 2-1'
      },
      {
        id: '2-2',
        label: '二级 2-2'
      }
    ]
  }
]
</script>
```

## 完整功能

展示树形控件的所有功能特性。

```vue
<template>
  <kfl-tree
    :data="data"
    empty-text="暂无数据"
    node-key="id"
    :props="{
      children: 'children',
      label: 'label',
      disabled: 'disabled',
      isLeaf: 'isLeaf'
    }"
    :default-expand-all="false"
    :expand-on-click-node="true"
    :show-checkbox="true"
    :indent="24"
    @node-click="handleNodeClick"
    @node-expand="handleNodeExpand"
    @check-change="handleCheckChange"
  />
</template>

<script setup lang="ts">
const data = [
  {
    id: '1',
    label: '一级 1',
    disabled: false,
    children: [
      {
        id: '1-1',
        label: '二级 1-1',
        disabled: true,
        children: [
          {
            id: '1-1-1',
            label: '三级 1-1-1',
            isLeaf: true
          }
        ]
      }
    ]
  },
  {
    id: '2',
    label: '一级 2',
    children: [
      {
        id: '2-1',
        label: '二级 2-1',
        isLeaf: true
      },
      {
        id: '2-2',
        label: '二级 2-2'
      }
    ]
  }
]

const handleNodeClick = (node: TreeNode) => {
  console.log('节点被点击：', node)
}

const handleNodeExpand = (node: TreeNode) => {
  console.log('节点被展开：', node)
}

const handleCheckChange = (node: TreeNode, checked: boolean) => {
  console.log('节点选中状态变化：', node, checked)
}
</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 展示数据 | array | [] |
| empty-text | 内容为空的时候展示的文本 | string | '暂无数据' |
| props | 配置选项，具体看下表 | object | - |
| node-key | 每个树节点用来作为唯一标识的属性 | string | 'id' |
| show-checkbox | 节点是否可被选择 | boolean | false |
| expand-on-click-node | 是否在点击节点的时候展开或者收缩节点 | boolean | true |
| default-expand-all | 是否默认展开所有节点 | boolean | false |
| indent | 相邻级节点间的水平缩进，单位为像素 | number | 16 |

### props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 指定节点标签为节点对象的某个属性值 | string | 'label' |
| children | 指定子树为节点对象的某个属性值 | string | 'children' |
| disabled | 指定节点选择框是否禁用为节点对象的某个属性值 | string | 'disabled' |
| isLeaf | 指定节点是否为叶子节点 | string | 'isLeaf' |

### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| node-click | 节点被点击时的回调 | (node: TreeNode) |
| node-expand | 节点被展开时的回调 | (node: TreeNode) |
| check-change | 节点选中状态发生变化时的回调 | (node: TreeNode, checked: boolean) |
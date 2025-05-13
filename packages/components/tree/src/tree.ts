import type { ExtractPropTypes, PropType } from 'vue'

export interface TreeNodeData {
  [key: string]: any
}

export interface TreeNode {
  key: string | number
  label: string
  children?: TreeNode[]
  isLeaf?: boolean
  disabled?: boolean
  checked?: boolean
  indeterminate?: boolean
  expanded?: boolean
  data: TreeNodeData
}

export const treeProps = {
  data: {
    type: Array as PropType<TreeNodeData[]>,
    default: () => []
  },
  emptyText: {
    type: String,
    default: '暂无数据'
  },
  props: {
    type: Object as PropType<{
      children?: string
      label?: string
      disabled?: string
      isLeaf?: string
    }>,
    default: () => ({
      children: 'children',
      label: 'label',
      disabled: 'disabled',
      isLeaf: 'isLeaf'
    })
  },
  nodeKey: {
    type: String,
    default: 'id'
  },
  expandOnClickNode: {
    type: Boolean,
    default: true
  },
  showCheckbox: {
    type: Boolean,
    default: false
  },
  defaultExpandAll: {
    type: Boolean,
    default: false
  },
  indent: {
    type: Number,
    default: 16
  }
} as const

export type TreeProps = ExtractPropTypes<typeof treeProps>

export const treeEmits = {
  'node-click': (node: TreeNode) => node instanceof Object,
  'node-expand': (node: TreeNode) => node instanceof Object,
  'check-change': (node: TreeNode, checked: boolean) => node instanceof Object && typeof checked === 'boolean'
}
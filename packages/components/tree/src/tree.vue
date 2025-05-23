<template>
  <div :class="bem.b()">
    <div v-if="!data || data.length === 0" :class="bem.e('empty-block')">
      {{ emptyText }}
    </div>
    <div v-else :class="bem.e('inner')">
      <tree-node-component
        v-for="node in normalizedData"
        :key="node.key"
        :node="node"
        :props="props.props"
        :indent="indent"
        :show-checkbox="showCheckbox"
        :expand-on-click-node="expandOnClickNode"
        @node-click="handleNodeClick"
        @node-expand="handleNodeExpand"
        @check-change="handleCheckChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { createNamespace } from '@kfl-ui/utils/create'
import { treeProps, treeEmits } from './tree'
import type { TreeNode, TreeNodeData } from './tree'
import TreeNodeComponent from './tree-node.vue'

defineOptions({ name: 'kfl-tree' })

const bem = createNamespace('tree')
const props = defineProps(treeProps)
const emit = defineEmits(treeEmits)

const currentNode = ref<TreeNode | null>(null)

const treeData = ref<TreeNode[]>([])

const normalizedData = computed(() => {
  const normalize = (data: TreeNodeData[]): TreeNode[] => {
    return data.map((item) => {
      const children = item[props.props.children || 'children']
      const hasChildren = children && children.length > 0

      const nodeData: TreeNode = {
        key: item[props.nodeKey],
        label: item[props.props.label || 'label'],
        isLeaf: !hasChildren,
        disabled: item[props.props.disabled || 'disabled'],
        expanded: false,
        checked: false,
        indeterminate: false,
        data: item
      }

      if (hasChildren) {
        nodeData.children = normalize(children)
      }

      return nodeData
    })
  }

  treeData.value = normalize(props.data)
  return treeData.value
})

const handleNodeClick = (node: TreeNode) => {
  currentNode.value = node
  if (props.expandOnClickNode && !node.isLeaf) {
    const targetNode = treeData.value.find(n => n.key === node.key)
    if (targetNode) {
      targetNode.expanded = !targetNode.expanded
      handleNodeExpand(targetNode)
    }
  }
  emit('node-click', node)
}

const handleNodeExpand = (node: TreeNode) => {
  emit('node-expand', node)
}

const handleCheckChange = (node: TreeNode, checked: boolean) => {
  emit('check-change', node, checked)
}
</script>

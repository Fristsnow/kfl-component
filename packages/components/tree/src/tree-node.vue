<!--
 * @Author: FirstsnowLucky firstsnow1119@163.com
 * @Date: 2025-04-16 16:42:45
 * @LastEditors: FirstsnowLucky firstsnow1119@163.com
 * @LastEditTime: 2025-04-16 17:17:55
 * @FilePath: \kfl-component\packages\components\tree\src\tree-node.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div :class="[bem.b()]">
    <div :class="bem.e('content')" @click="handleClick">
      <kfl-icon
        v-if="!node.isLeaf && node.children && node.children.length > 0"
        :class="[
          bem.e('expand-icon'),
          { expanded: node.expanded }
        ]"
        @click.stop="handleExpandIconClick"
      >
        <svg viewBox="0 0 1024 1024">
          <path d="M320 192l384 320-384 320z"/>
        </svg>
      </kfl-icon>

      <kfl-checkbox v-if="showCheckbox" :model-value="node.checked" :indeterminate="node.indeterminate"
        :disabled="node.disabled" @change="handleCheckChange" />

      <span :class="bem.e('label')">{{ node.label }}</span>
    </div>

    <div v-show="node.expanded" :class="bem.e('children')">
      <tree-node v-for="child in node.children" :key="child.key" :node="child" :level="level + 1" :indent="indent"
        :show-checkbox="showCheckbox" :expand-on-click-node="expandOnClickNode"
        @node-click="handleChildNodeClick" @node-expand="handleChildNodeExpand"
        @check-change="handleChildCheckChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import { createNamespace } from '@kfl-vue/utils/create'
import type { TreeNode } from './tree'

const bem = createNamespace('tree')

const props = defineProps({
    node: {
        type: Object as PropType<TreeNode>,
        required: true
    },
    level: {
        type: Number,
        default: 0
    },
    indent: {
        type: Number,
        default: 16
    },
    showCheckbox: Boolean,
    expandOnClickNode: Boolean
})

const emit = defineEmits(['node-click', 'node-expand', 'check-change'])

const isCurrent = computed(() => false)

const handleClick = () => {
    if (!props.node.disabled) {
        emit('node-click', props.node)
        if (props.expandOnClickNode && !props.node.isLeaf) {
            handleExpandIconClick()
        }
    }
}

const handleExpandIconClick = () => {
    if (!props.node.disabled) {
        props.node.expanded = !props.node.expanded
        emit('node-expand', props.node)
    }
}

const handleCheckChange = (value: boolean) => {
    if (!props.node.disabled) {
        props.node.checked = value
        emit('check-change', props.node, value)
    }
}

const handleChildNodeClick = (node: TreeNode) => {
    emit('node-click', node)
}

const handleChildNodeExpand = (node: TreeNode) => {
    emit('node-expand', node)
}

const handleChildCheckChange = (node: TreeNode, checked: boolean) => {
    emit('check-change', node, checked)
}
</script>
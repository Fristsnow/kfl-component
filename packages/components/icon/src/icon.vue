<!--
 * @Author: FirstsnowLucky firstsnow1119@163.com
 * @Date: 2025-04-16 14:13:32
 * @LastEditors: FirstsnowLucky firstsnow1119@163.com
 * @LastEditTime: 2025-04-16 15:08:33
 * @FilePath: \kfl-component\packages\components\icon\src\icon.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <i :class="bem.b()" :style="style">
        <slot></slot>
    </i>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { createNamespace } from '@kfl-ui/utils/create';
import { iconProps } from './icon';

defineOptions({ name: "kfl-icon" })

const bem = createNamespace('icon');

const props = defineProps(iconProps)
const style = computed(() => {
    if (!props.size && !props.color) return {}

    return {
        ...(props.size ? { fontSize: props.size + 'px' } : {}),
        ...(props.color ? { color: props.color } : {})
    }
})
</script>

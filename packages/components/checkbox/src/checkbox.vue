<!--
 * @Author: FirstsnowLucky firstsnow1119@163.com
 * @Date: 2025-04-16 16:48:10
 * @LastEditors: FirstsnowLucky firstsnow1119@163.com
 * @LastEditTime: 2025-05-23 11:17:26
 * @FilePath: \kfl-component\packages\components\checkbox\src\checkbox.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <label
    :class="[
      bem.b(),
      bem.m(size),
      {
        'is-disabled': disabled,
        'is-checked': isChecked,
        'is-indeterminate': indeterminate
      }
    ]"
  >
    <span
      :class="[
        bem.e('input'),
        {
          'is-disabled': disabled,
          'is-checked': isChecked,
          'is-indeterminate': indeterminate
        }
      ]"
    >
      <input
        type="checkbox"
        :class="bem.e('original')"
        :value="label"
        :disabled="disabled"
        :indeterminate="indeterminate"
        v-model="model"
        @change="handleChange"
      />
      <span :class="bem.e('inner')"></span>
    </span>
    <span :class="bem.e('label')" @click.prevent>
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createNamespace } from '@kfl-ui/utils/create'
import type { CheckboxProps } from './checkbox'
import { checkboxEmits } from './checkbox'

defineOptions({ name: 'kfl-checkbox' })

const bem = createNamespace('checkbox')

// 修改 props 的定义方式
const props = defineProps<CheckboxProps>()
const emit = defineEmits(checkboxEmits)

const model = computed({
  get() {
    return props.modelValue
  },
  set(val: boolean) {
    emit('update:modelValue', val)
  }
})

const isChecked = computed(() => model.value)

const handleChange = () => {
  emit('change', model.value)
}
</script>
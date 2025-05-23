// import type { PropType } from 'vue'

export interface CheckboxProps {
  modelValue?: boolean
  disabled?: boolean
  indeterminate?: boolean
  label?: string | number | boolean
  size?: 'large' | 'default' | 'small'
}

export const checkboxEmits = {
  'update:modelValue': (value: boolean) => typeof value === 'boolean',
  'change': (value: boolean) => typeof value === 'boolean'
}

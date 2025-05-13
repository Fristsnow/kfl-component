import { withInstall } from '@kfl-vue/utils/with-install'
import _Checkbox from './src/checkbox.vue'

const Checkbox = withInstall(_Checkbox)

export default Checkbox

declare module 'vue' {
  export interface GlobalComponents {
    KflCheckbox: typeof Checkbox
  }
}
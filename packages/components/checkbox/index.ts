/*
 * @Author: FirstsnowLucky firstsnow1119@163.com
 * @Date: 2025-04-16 16:48:19
 * @LastEditors: FirstsnowLucky firstsnow1119@163.com
 * @LastEditTime: 2025-05-23 11:18:07
 * @FilePath: \kfl-component\packages\components\checkbox\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { withInstall } from '@kfl-ui/utils/with-install'
import _Checkbox from './src/checkbox.vue'

const Checkbox = withInstall(_Checkbox)

export default Checkbox

declare module 'vue' {
  export interface GlobalComponents {
    KflCheckbox: typeof Checkbox
  }
}
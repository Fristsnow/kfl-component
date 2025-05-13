/*
 * @Author: FirstsnowLucky firstsnow1119@163.com
 * @Date: 2025-04-16 16:24:09
 * @LastEditors: FirstsnowLucky firstsnow1119@163.com
 * @LastEditTime: 2025-04-16 16:33:03
 * @FilePath: \kfl-component\packages\components\tree\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import _Tree from './src/tree.vue'

import { withInstall } from '@kfl-vue/utils/with-install';

const Tree = withInstall(_Tree);

export default Tree;

declare module 'vue' {
    export interface GlobalComponents {
        KflTree: typeof Tree;
    }
}
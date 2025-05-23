import _Icon from './src/icon.vue';
import { withInstall } from '@kfl-ui/utils/with-install';

const Icon = withInstall(_Icon);

export default Icon;    // 导出组件

export * from './src/icon';

declare module 'vue' {
    export interface GlobalComponents {
        KflIcon: typeof Icon;
    }
}
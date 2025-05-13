import { Plugin } from 'vue';

export type SFCWithInstall<T> = T & Plugin;

export const withInstall = <T>(comp: T) => {
    (comp as SFCWithInstall<T>).install = (app: any) => {
        const { name } = comp as unknown as { name: string };
        app.component(name, comp); // 注册组件为全局组件
    }
    return comp as SFCWithInstall<T>;
}

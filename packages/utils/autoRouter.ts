import { createRouter, createWebHistory, type Router, type RouteRecordRaw, type RouteMeta } from 'vue-router'

export interface PageConfig {
  title?: string
  icon?: string
  meta?: RouteMeta
  children?: {
    path: string
    name: string
    meta?: RouteMeta
  }[]
  [key: string]: any
}

export interface AutoRouterOptions {
  base?: string
  debug?: boolean
  isTs?: boolean
}

/**
 * 创建自动路由（根据项目语言自动选择扫描后缀）
 */
export function createAutoRouter(options: AutoRouterOptions = {}): Router {
  const { base = '/', debug = true, isTs = true } = options;

  const pages = isTs
      ? import.meta.glob<PageConfig>('/src/views/**/page.ts', { eager: true, import: 'default' })
      : import.meta.glob<PageConfig>('/src/views/**/page.js', { eager: true, import: 'default' });

  // 组件导入不变
  const components = import.meta.glob('/src/views/**/index.vue');

  const normalizePath = (path: string): string => {
    return path.replace('/src/views', '').replace(isTs ? '/page.ts' : '/page.js', '') || '/'
  }
  const getRouteName = (path: string): string => {
    return path.split('/').filter(Boolean).join('-') || 'index'
  }

  const routeMap: Record<string, RouteRecordRaw> = {}

  for (const [pagePath, config] of Object.entries(pages)) {
    const compPath = pagePath.replace(isTs ? 'page.ts' : 'page.js', 'index.vue')
    const routePath = normalizePath(pagePath)
    const name = getRouteName(routePath)

    routeMap[routePath] = {
      path: routePath,
      name,
      component: components[compPath],
      meta: config.meta || {},
      children: []
    }
  }

  for (const [pagePath, config] of Object.entries(pages)) {
    const routePath = normalizePath(pagePath)
    if (config?.children) {
      config.children.forEach(child => {
        const fullChildPath = `${routePath}/${child.path}`
        const childCompPath = `/src/views${fullChildPath}/index.vue`
        const childPagePath = `/src/views${fullChildPath}/${isTs ? 'page.ts' : 'page.js'}`
        const childConfig = pages[childPagePath] || {}

        routeMap[routePath].children?.push({
          path: child.path,
          name: child.name,
          component: components[childCompPath],
          meta: child.meta || childConfig.meta || {}
        })
      })
    }
  }

  const routes = Object.values(routeMap)

  if (debug) {
    console.log(routes, '自动生成的路由')
  }

  return createRouter({
    history: createWebHistory(base),
    routes,
    scrollBehavior() {
      return { top: 0 }
    }
  })
}

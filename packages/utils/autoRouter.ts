// utils/autoRouter.ts

import {createRouter, createWebHistory, type Router} from 'vue-router'

export interface PageConfig {
    title?: string
    icon?: string
    meta?: any
    redirect?: string           // 新增重定向字段
    requiresAuth?: boolean      // 是否需要登录权限示例
    children?: {
        path: string
        name: string
        meta?: any
    }[]

    [key: string]: any
}

export function createRouterFromGlobs(
  pages: Record<string, PageConfig>,
  components: Record<string, () => Promise<any>>,
  base = '/'
): Router {
  const normalizePath = (path: string): string =>
    path.replace('/src/views', '').replace(/\/page\.(ts|js)$/, '') || '/'

  const getRouteName = (path: string): string =>
    path.split('/').filter(Boolean).join('-') || 'index'

  const routeMap: Record<string, any> = {}

  const childrenPaths = new Set<string>()

  // 第一次遍历：创建父级路由
  for (const [pagePath, config] of Object.entries(pages)) {
    const routePath = normalizePath(pagePath)
    const compPath = pagePath.replace(/page\.(ts|js)$/, 'index.vue')

    const route: any = {
      path: routePath,
      name: getRouteName(routePath),
      component: components[compPath],
      meta: config.meta || {},
      children: []
    }

    // 如果有 redirect，添加到 children 而不是放 route 上（避免覆盖 component）
    if (config.redirect) {
      route.children.push({
        path: '',
        redirect: config.redirect
      })
    }

    routeMap[routePath] = route
  }

  // 第二次遍历：挂载子路由到其父路由
  for (const [pagePath, config] of Object.entries(pages)) {
    const parentPath = normalizePath(pagePath)

    if (config?.children?.length) {
      config.children.forEach(child => {
        const fullPath = `${parentPath}/${child.path}`.replace(/\/+/g, '/')
        const compPath = `/src/views${fullPath}/index.vue`
        const childConfig =
          pages[`/src/views${fullPath}/page.ts`] || pages[`/src/views${fullPath}/page.js`] || {}

        const childRoute = {
          path: child.path,
          name: child.name,
          component: components[compPath],
          meta: child.meta || childConfig.meta || {}
        }

        routeMap[parentPath]?.children?.push(childRoute)
        childrenPaths.add(`/src/views${fullPath}/page.ts`)
        childrenPaths.add(`/src/views${fullPath}/page.js`)
      })
    }
  }

  // 构造 routes 数组，过滤掉被作为子路由的页面（防止被顶层注册）
  const routes = Object.entries(pages)
    .filter(([pagePath]) => !childrenPaths.has(pagePath))
    .map(([pagePath]) => {
      const routePath = normalizePath(pagePath)
      return routeMap[routePath]
    })

  return createRouter({
    history: createWebHistory(base),
    routes,
    scrollBehavior: () => ({ top: 0 })
  })
}

// utils/autoRouter.ts

import { createRouter, createWebHistory, type Router } from 'vue-router'

interface PageConfig {
  title?: string
  icon?: string
  meta?: any
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

  for (const [pagePath, config] of Object.entries(pages)) {
    const compPath = pagePath.replace(/page\.(ts|js)$/, 'index.vue')
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
        const fullPath = `${routePath}/${child.path}`
        const compPath = `/src/views${fullPath}/index.vue`
        const childConfig = pages[`/src/views${fullPath}/page.ts`] || pages[`/src/views${fullPath}/page.js`] || {}

        routeMap[routePath].children.push({
          path: child.path,
          name: child.name,
          component: components[compPath],
          meta: child.meta || childConfig.meta || {}
        })
      })
    }
  }

  return createRouter({
    history: createWebHistory(base),
    routes: Object.values(routeMap),
    scrollBehavior: () => ({ top: 0 })
  })
}

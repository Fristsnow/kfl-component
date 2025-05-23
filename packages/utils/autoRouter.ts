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
  mode?: 'ts' | 'js' | 'auto' // 手动指定类型或自动推断
}

/**
 * 创建自动路由（支持 .ts/.js 自动检测）
 */
export function createAutoRouter(options: AutoRouterOptions = {}): Router {
  const {
    base = '/',
    debug = true,
    mode = 'auto'
  } = options

  // 两套 page.ts / page.js 配置
  const pagesTs = import.meta.glob<PageConfig>('/src/views/**/page.ts', {
    eager: true,
    import: 'default'
  })

  const pagesJs = import.meta.glob<PageConfig>('/src/views/**/page.js', {
    eager: true,
    import: 'default'
  })

  // 两套组件
  const components = import.meta.glob('/src/views/**/index.vue')

  let pages: Record<string, PageConfig> = {}
  if (mode === 'ts') {
    pages = pagesTs
  } else if (mode === 'js') {
    pages = pagesJs
  } else {
    pages = Object.keys(pagesTs).length > 0 ? pagesTs : pagesJs
  }

  const normalizePath = (path: string): string => {
    return path.replace('/src/views', '').replace(/\/page\.(ts|js)$/, '') || '/'
  }

  const getRouteName = (path: string): string => {
    return path.split('/').filter(Boolean).join('-') || 'index'
  }

  const routeMap: Record<string, RouteRecordRaw> = {}

  // 主路由
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

  // 子路由
  for (const [pagePath, config] of Object.entries(pages)) {
    const routePath = normalizePath(pagePath)
    if (config?.children) {
      config.children.forEach(child => {
        const fullChildPath = `${routePath}/${child.path}`
        const childCompPath = `/src/views${fullChildPath}/index.vue`
        const childPagePathTs = `/src/views${fullChildPath}/page.ts`
        const childPagePathJs = `/src/views${fullChildPath}/page.js`
        const childConfig = pages[childPagePathTs] || pages[childPagePathJs] || {}

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
    console.log('自动生成的路由:', routes)
  }

  return createRouter({
    history: createWebHistory(base),
    routes,
    scrollBehavior() {
      return { top: 0 }
    }
  })
}

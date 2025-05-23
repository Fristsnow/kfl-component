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
  language?: 'ts' | 'js' | 'auto'  // 新增语言选项
}

/**
 * 创建自动路由（固定扫描 /src/views）
 */
export function createAutoRouter(options: AutoRouterOptions = {}): Router {
  const {
    base = '/',
    debug = true,
    language = 'auto'  // 默认为自动检测
  } = options

  // 检测项目语言
  let fileExtension = 'ts'
  
  if (language === 'auto') {
    try {
      // 尝试检测项目中是否存在 tsconfig.json 文件
      // 由于无法直接检测文件系统，我们使用一个间接方法
      // 尝试导入 .ts 文件，如果失败则使用 .js
      const hasTsFiles = import.meta.glob('src/**/*.ts', { eager: false })
      fileExtension = Object.keys(hasTsFiles).length > 0 ? 'ts' : 'js'
      
      if (debug) {
        console.log(`自动检测到项目使用 ${fileExtension === 'ts' ? 'TypeScript' : 'JavaScript'}`)
      }
    } catch (e) {
      // 如果检测失败，默认使用 TypeScript
      fileExtension = 'ts'
      if (debug) {
        console.log('语言检测失败，默认使用 TypeScript')
      }
    }
  } else {
    // 使用用户指定的语言
    fileExtension = language
  }

  // 根据检测到的语言构建 glob 模式
  const pagePattern = `../views/**/page.${fileExtension}`
  
  if (debug) {
    console.log(`使用路由配置文件模式: ${pagePattern}`)
  }

  // 必须为静态字符串，vite 不支持动态路径，所以这里需要两种情况分别处理
  let pages: Record<string, PageConfig> = {}
  
  if (fileExtension === 'ts') {
    pages = import.meta.glob<PageConfig>('../views/**/page.ts', {
      eager: true,
      import: 'default'
    })
  } else {
    pages = import.meta.glob<PageConfig>('../views/**/page.js', {
      eager: true,
      import: 'default'
    })
  }

  const components = import.meta.glob('../views/**/index.vue')

  const normalizePath = (path: string): string => {
    return path.replace('../views', '').replace(`/page.${fileExtension}`, '') || '/'
  }

  const getRouteName = (path: string): string => {
    return path.split('/').filter(Boolean).join('-') || 'index'
  }

  const routeMap: Record<string, RouteRecordRaw> = {}

  for (const [pagePath, config] of Object.entries(pages)) {
    const compPath = pagePath.replace(`page.${fileExtension}`, 'index.vue')
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
        const childCompPath = `../views${fullChildPath}/index.vue`
        const childPagePath = `../views${fullChildPath}/page.${fileExtension}`
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

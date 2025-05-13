/*
 * @Author: FirstsnowLucky firstsnow1119@163.com
 * @Date: 2025-04-16 15:56:41
 * @LastEditors: FirstsnowLucky firstsnow1119@163.com
 * @LastEditTime: 2025-05-13 11:21:43
 * @FilePath: \kfl-component\docs\.vitepress\config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  title: 'KFL-UI',
  description: '基于Vue3的组件库',
  lang: 'zh-CN',
  base: '/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],
  themeConfig: {
    logo: 'https://avatars.githubusercontent.com/u/111073041?v=4',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/Basic/icon' },
      { text: 'GitHub', link: 'https://github.com/Fristsnow' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '介绍', link: '/guide/' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '安装', link: '/guide/installation' }
          ]
        }
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Icon 图标', link: '/components/Basic/icon' }
          ]
        },
        {
          text: '数据展示',
          items: [
            { text: 'Tree 树形控件', link: '/components/dataShow/tree' },
          ]
        },
        {
          text: '表单组件',
          items: [
            { text: 'Checkbox 复选框', link: '/components/form/checkbox' },
          ]
        },
        {
          text: '特殊组件',
          items: [
            { text: 'html-preview 代码预览', link: '/components/others/html-preview' },
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Fristsnow' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present FirstsnowLucky'
    },
    lastUpdated: {
      text: '最后更新时间'
    },
    docsDir: 'docs',
    editLink: {
      pattern: 'https://github.com/your-username/kfl-component/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    algolia: {
      appId: 'APPID',
      apiKey: 'API KEY',
      indexName: 'kfl-ui'
    },
    carbonAds: {
      code: '广告代码',
      placement: '广告位置'
    }
  }
}
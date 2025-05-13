<!--
 * @Author: FirstsnowLucky firstsnow1119@163.com
 * @Date: 2025-04-16 12:08:26
 * @LastEditors: FirstsnowLucky firstsnow1119@163.com
 * @LastEditTime: 2025-05-13 14:23:30
 * @FilePath: \kfl-component\play\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
// import {AccessibilitySharp} from '@vicons/ionicons5'
import { ref } from 'vue'

// const checked = ref(true)

// const handleCheckChange = (val: boolean) => {
//   console.log(val)
// }
const htmlCode = ref(`
 
<!DOCTYPE html>
<html lang="zh">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>个人博客</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
        }

        .container {
            width: 80%;
            margin: 0 auto;
        }

        header {
            background-color: #333;
            color: white;
            padding: 20px 0;
            text-align: center;
        }

        header h1 {
            font-size: 2.5rem;
        }

        nav ul {
            list-style: none;
            padding: 0;
        }

        nav ul li {
            display: inline;
            margin: 0 15px;
        }

        nav ul li a {
            color: white;
            text-decoration: none;
            font-size: 1rem;
        }

        nav ul li a:hover {
            text-decoration: underline;
        }

        .blog-posts {
            background-color: #fff;
            padding: 40px 0;
        }

        .post {
            margin-bottom: 30px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 20px;
        }

        .post h2 {
            font-size: 2rem;
            margin-bottom: 10px;
        }

        .post h2 a {
            color: #333;
            text-decoration: none;
        }

        .post h2 a:hover {
            color: #007BFF;
        }

        .post .meta {
            font-size: 0.9rem;
            color: #777;
            margin-bottom: 10px;
        }

        .post p {
            font-size: 1rem;
            line-height: 1.6;
            color: #555;
        }

        .read-more {
            display: inline-block;
            margin-top: 10px;
            color: #007BFF;
            text-decoration: none;
        }

        .read-more:hover {
            text-decoration: underline;
        }

        footer {
            position: relative;
            background-color: #333;
            color: white;
            padding: 20px 0;
            text-align: center;
            margin-top: 40px;
            bottom: 0;
        }
    </style>
</head>

<body>
    <header>
        <div class="container">
            <h1>欢迎来到我的个人博客</h1>
            <nav>
                <ul>
                    <li><a href="#">首页</a></li>
                    <li><a href="#">关于我</a></li>
                    <li><a href="#">文章</a></li>
                    <li><a href="#">联系我</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <section class="blog-posts">
        <div class="container">
            <article class="post">
                <h2><a href="#">如何成为一名优秀的程序员</a></h2>
                <p class="meta">发布于 2025年4月17日 | 作者：张三</p>
                <p>程序员的成长离不开不断学习和实践。本文将分享我成为一名程序员的经验和心得。</p>
                <a href="#" class="read-more">阅读更多</a>
            </article>

            <article class="post">
                <h2><a href="#">前端开发的未来趋势</a></h2>
                <p class="meta">发布于 2025年4月16日 | 作者：张三</p>
                <p>前端开发正在快速发展，本文将探讨一些可能会改变前端开发未来趋势的技术。</p>
                <a href="#" class="read-more">阅读更多</a>
            </article>

            <article class="post">
                <h2><a href="#">从零开始学习 JavaScript</a></h2>
                <p class="meta">发布于 2025年4月15日 | 作者：张三</p>
                <p>JavaScript 是现代 Web 开发的核心技术之一，本文为大家介绍如何从零开始学习 JavaScript。</p>
                <a href="#" class="read-more">阅读更多</a>
            </article>
        </div>
    </section>

    <footer>
        <div class="container">
            <p>&copy; 2025 我的个人博客. 版权所有.</p>
        </div>
    </footer>
</body>

</html>
`)
</script>

<template>
  <!-- <kfl-icon :size="40" :color="'red'">
        <AccessibilitySharp />
    </kfl-icon> -->
  <!-- <kfl-tree
      :data="treeData"
      :props="{
        children: 'children',
        label: 'label'
      }"
      node-key="id"
      :default-expand-all="true"
      :show-checkbox="true"
      @node-click="handleNodeClick"
    ></kfl-tree> -->
  <!-- <kfl-checkbox v-model="checked" @change="handleCheckChange">全选</kfl-checkbox> -->
  <!-- <kfl-html-preview :html-code="htmlCode" :scale="10" />
  <input
    v-model="htmlCode"
  /> -->
</template>

<style scoped></style>

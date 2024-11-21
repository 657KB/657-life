import { resolve } from 'node:path'
import { readFileSync, readdirSync, lstatSync } from 'node:fs'
import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import vue from '@vitejs/plugin-vue'
import router from 'unplugin-vue-router/vite'
import components from 'unplugin-vue-components/vite'
import markdown from 'unplugin-vue-markdown/vite'
import markdownAnchor from 'markdown-it-anchor'
import markdownPrism from 'markdown-it-prism'
import matter from 'gray-matter'
import prism from 'vite-plugin-prismjs'
import sitemap from 'vite-plugin-sitemap'

const posts = () => {
  const POSTS_DIR = resolve(__dirname, 'pages/posts')
  if (lstatSync(POSTS_DIR).isDirectory()) {
    return readdirSync(POSTS_DIR)
      .filter(file => file !== 'index.md')
      .map(file => `/posts/${file.replace('.md', '')}`)
  }
  return []
}

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    router({
      extensions: ['.vue', '.md'],
      routesFolder: 'pages',
      logs: true,
      extendRoute(route) {
        const path = route.components.get('default')
        if (path && path.endsWith('.md')) {
          const { data } = matter(readFileSync(path, 'utf-8'))
          route.addToMeta({ frontmatter: data })
        }
      },
    }),
    vue({ include: [/\.vue$/, /\.md$/] }),
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif|webp)$/i, 
      png: {
        quality: 60,
        compressionLevel: 6,
      },
      jpeg: {
        quality: 60,
      },
      webp: {
        lossless: true,
      },
    }),
    components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    }),
    prism({
      languages: ['javascript', 'css', 'html', 'typescript', 'dart', 'yaml', 'shell', 'cmake', 'c'],
      plugins: ['copy-to-clipboard'],
      theme: 'tomorrow',
      css: true,
    }),
    markdown({
      wrapperComponent: id => {
        return id.includes('/posts/') && !id.includes('/posts/index')
          ? 'WrapperPost'
          : 'WrapperDefault'
      },
      async markdownItSetup(md) {
        md.use(markdownAnchor)
        md.use(markdownPrism)
      }
    }),
    sitemap({
      hostname: 'https://657.life',
      dynamicRoutes: [
        '/photos',
        '/portfolio',
        '/posts',
        ...posts(),
      ],
    }),
  ],
})

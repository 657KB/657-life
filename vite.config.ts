import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import router from 'unplugin-vue-router/vite'
import components from 'unplugin-vue-components/vite'
import markdown from 'unplugin-vue-markdown/vite'
import markdownAnchor from 'markdown-it-anchor'
import markdownPrism from 'markdown-it-prism'
import matter from 'gray-matter'

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
    components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
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
  ],
})

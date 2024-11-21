import { ViteSSG } from 'vite-ssg'
import { routes } from 'vue-router/auto-routes'
import Nprogress from 'nprogress'
import App from '@/App.vue'

import 'nprogress/nprogress.css'
import 'github-markdown-css/github-markdown.css'
import '@/styles/main.css'
import '@/styles/markdown.css'
import '@/styles/tailwind.css'

export const createApp = ViteSSG(App, { routes }, ({ router }) => {
  router.beforeEach(() => { Nprogress.start() })
  router.afterEach(() => { Nprogress.done() })
})


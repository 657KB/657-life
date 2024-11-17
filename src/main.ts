import { ViteSSG } from 'vite-ssg'
import { routes } from 'vue-router/auto-routes'
import App from '@/App.vue'

import 'github-markdown-css/github-markdown.css'
import '@/styles/main.css'
import '@/styles/markdown.css'
import '@/styles/tailwind.css'

export const createApp = ViteSSG(App, { routes })


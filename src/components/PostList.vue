<script setup lang="ts">
import { useRouter } from 'vue-router/auto'
import { computed } from 'vue'
import dayjs from 'dayjs'
import type { Post } from '@/types'

const router = useRouter()
const routes = router.getRoutes().filter(route => {
  return route.path.startsWith('/posts')
    && route.path !== '/posts'
    && !route.meta.frontmatter.drafts
})

const posts = computed(() => routes.map(route => ({
  path: route.path,
  title: route.meta.frontmatter.title,
  date: route.meta.frontmatter.date || 0,
  tags: route.meta.frontmatter.tags,
}) as Post))
</script>

<template>
  <ul class=" space-y-2 " :style="{ paddingLeft: 'unset' }">
    <li v-for="post in posts">
      <RouterLink
        :style="{ color: 'inherit' }"
        :to="post.path"
      >
        {{ post.title }}
      </RouterLink>
      <span class=" ms-2 text-base text-[--text-tertiary] ">
        {{ dayjs(post.date).format('D MMM YYYY') }}
      </span>
    </li>
  </ul>
</template>

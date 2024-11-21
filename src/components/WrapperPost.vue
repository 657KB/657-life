<script setup lang="ts">
import dayjs from 'dayjs'

const { frontmatter } = defineProps({
  frontmatter: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class=" max-w-[80ch] mx-auto ">
    <h1 class=" text-4xl font-bold mb-2">{{ frontmatter.title }}</h1>
    <p class=" mb-6 text-[#888] ">{{ dayjs(frontmatter.date || 0).format('D MMM YYYY') }}</p>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'

import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

const { frontmatter } = defineProps({
  frontmatter: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class=" max-w-[80ch] mx-auto ">
    <img v-if="typeof frontmatter.headImage === 'string'" class=" overflow-hidden mb-6 " :src="frontmatter.headImage" />
    <h1 class=" text-4xl font-bold mb-2">{{ frontmatter.title }}</h1>
    <p class=" mb-6 text-[#888] ">{{ dayjs(frontmatter.date || 0).format('D MMM YYYY') }}</p>
    <slot></slot>
  </div>
</template>
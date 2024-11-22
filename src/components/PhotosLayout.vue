<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive } from 'vue'
import { useRouter } from 'vue-router/auto'
import PhotoCard from './PhotoCard.vue'

const router = useRouter()
const state = reactive({ itemWidth: 0, maxCol: 3 })
const photos = computed(() => router.currentRoute.value.meta.photos as string[])

function resize() {
  const gridWidth = document.querySelector('.masonry')?.getBoundingClientRect().width || 0
  if (screen.availWidth < 400) {
    state.itemWidth = gridWidth
    state.maxCol = 1
  } else if (screen.availWidth < 800) {
    state.itemWidth = (gridWidth - 16) / 2
    state.maxCol = 2
  } else {
    state.itemWidth = (gridWidth - 16 * 2) / 3
    state.maxCol = 3
  }
}

onMounted(() => {
  resize()
  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
})
</script>

<template>
  <masonry-wall
    class=" masonry mt-8 "
    :items="photos"
    :column-width="state.itemWidth"
    :min-columns="1"
    :max-columns="3"
    :gap="16"
  >
    <template #default="{ item }">
      <PhotoCard
        class="grid-item"
        :src="`/photos/${item}`"
        :style="{
          width: `${state.itemWidth}px`,
          height: 'fit-content',
        }"
      />
      
    </template>
  </masonry-wall>
</template>
<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
</script>

<template>
  <NavBar />
  <main class=" p-6 sm:p-10 mx-auto ">
    <RouterView />
  </main>
  <div class=" min-h-10 " />
</template>

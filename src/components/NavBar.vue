<script setup lang="ts">
import { reactive } from 'vue'
import IconGithub from './IconGithub.vue'
import IconTwitter from './IconTwitter.vue'
import IconMenu from './IconMenu.vue'

const state = reactive({ open: false })

function toggleMenu() { state.open = !state.open }
</script>

<template>
  <nav class=" relative ">
    <div
      class=" fixed top-0 left-0 bottom-0 right-0 bg-black "
      :style="{
        pointerEvents: state.open ? 'all' : 'none',
        opacity: state.open ? '0.08' : '0',
        transition: 'all ease .3s'
      }"
      @click="toggleMenu"
    />
    <div
      class=" absolute top-full left-0 right-0 px-6 pt-2 pb-6 flex flex-col space-y-6 bg-[--bg] "
      :style="{
        transform: state.open ? 'translate3d(0, 0, 0)' : 'translate3d(0, -100%, 0)',
        transition: 'all ease .3s',
      }"
      @click="toggleMenu"
    >
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/portfolio">Portfolio</RouterLink>
      <RouterLink to="/photos">Photos</RouterLink>
      <RouterLink to="/posts">Posts</RouterLink>
    </div>
    <div class=" flex flex-row items-center px-4 py-4 sm:px-10 sm:py-8 bg-[--bg] relative z-10 ">
      <div class=" block sm:hidden cursor-pointer " @click="toggleMenu"><IconMenu /></div>
      <div class=" flex-1"></div>
      <div class=" flex flex-row space-x-8 items-center font-sans uppercase ">
        <RouterLink class=" hidden sm:block " to="/">Home</RouterLink>
        <RouterLink class=" hidden sm:block " to="/portfolio">Portfolio</RouterLink>
        <RouterLink class=" hidden sm:block " to="/photos">Photos</RouterLink>
        <RouterLink class=" hidden sm:block " to="/posts">Posts</RouterLink>
        <a href="https://x.com/657KB" title="X / Twitter"><IconTwitter /></a>
        <a href="https://github.com/657kb" title="Github"><IconGithub /></a>
      </div>
    </div>
  </nav>
</template>
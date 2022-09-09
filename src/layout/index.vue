<template>
  <div class="app-container">
    <div class="content">
      <router-view v-slot="{ Component }">
        <transition name="move" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <BottomBar />
  </div>
</template>

<script setup>
import BottomBar from './BottomBar/index.vue';
</script>

<style lang="scss" scoped>
</style>

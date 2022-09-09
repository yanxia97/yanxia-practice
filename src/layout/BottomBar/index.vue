<template>
  <el-menu
    :default-active="route.path"
    class="el-menu-bottom"
    mode="horizontal"
    router
  >
    <el-menu-item 
      v-for="item in children"
      :key="item.path"
      :index="resolvePath(item)"
      base-path="/"
    >
      <template #title>
        <span>{{item.meta?.title}}</span>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import path from 'path-browserify';
import { useRoute } from 'vue-router';
import { children } from '@/router';

const route = useRoute();
const resolvePath = (item) => {
  const p = path.resolve('/', item.path);
  return p;
};
</script>
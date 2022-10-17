<template>
  <div class="app">
    <MouseCheck :title="'校验'" :src="dImg" />
  </div>
</template>

<script setup lang="ts">
import dImg from './assets/img/d.webp'
import MouseCheck from '../packages/index'


</script>

<style scoped>
.app{
  display: flex;
  justify-content: center;
  padding-top: 100px;
}
</style>
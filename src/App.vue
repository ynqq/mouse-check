<template>
  <div class="app" @click="handleCheck">
  </div>
</template>

<script setup lang="ts">
import "../dist/style.css"
import dImg from './assets/img/d.webp'
import { check } from '../packages/utils'
const handleCheck = () => {
  check({
    src: dImg,
    title: 'check'
  }).then(() => {
    console.log('check ok');
    
  }).catch(() => {
    console.log('check fail');
    
  })
}
</script>

<style scoped>
.app{
  padding: 100px;
}
</style>
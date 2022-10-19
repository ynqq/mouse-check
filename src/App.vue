<template>
  <div class="app">
    <MouseCheck :title="'校验'" :width="300" :src="dImg" @check="handleCheck" />
  </div>
</template>

<script setup lang="ts">
import "../dist/style.css"
import dImg from './assets/img/d.webp'
import MouseCheck from '../dist/mouse-check'
// import MouseCheck from '../packages/index'

const handleCheck = (val: boolean) => {
  if(val){
    console.log('校验成功');
  }else{
    console.log('校验失败');
  }
}

</script>

<style scoped>
.app{
  padding-top: 100px;
}
</style>
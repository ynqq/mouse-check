<template>
  <div class="app">
    <MouseCheck :title="'校验'" :width="300" :src="dImg" @check="handleCheck" />
  </div>
</template>

<script setup lang="ts">
import dImg from './assets/img/d.webp'
import MouseCheck from '../packages/index'

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
  display: flex;
  justify-content: center;
  padding-top: 100px;
}
</style>
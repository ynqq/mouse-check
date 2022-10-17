<template>
  <div class="mouse-check">
    <canvas ref="mouseBgCanvas" id="mouse-bg-canvas" :width="width" :height="height"></canvas>
    <canvas ref="mouseCanvas" id="mouse-canvas" :width="width" :height="height"></canvas>
    <MouseMove ref="mouseMove" @move="handleMove" :width="$props.width!" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import CanvasUtil from './util'
import MouseMove, { Move_Inter } from '../mouseMove/mouse-move.vue'

interface Props {
  src: string,
  title: string,
  width?: number
}

let util: CanvasUtil

const props = withDefaults(defineProps<Props>(), {
  width: 300
})

const height = computed(() => {
  return props.width / 4 * 3
})

const cssW = computed(() => {
  return props.width + 'px'
})
const cssH = computed(() => {
  return height.value + 'px'
})

const handleMove = (e: Move_Inter) => {
  util.move(e.x, e.action)
}

const mouseCanvas = ref<HTMLCanvasElement>()
const mouseBgCanvas = ref<HTMLCanvasElement>()


onMounted(() => {
  util = new CanvasUtil(mouseBgCanvas.value!, mouseCanvas.value!, props.src)

})


</script>

<script lang="ts">
export default {
  name: 'MouseCheck'
}
</script>


<style scoped lang="less">
.mouse-check {
  position: relative;

  #mouse-bg-canvas {
    position: absolute;
    left: 0;
    top: 0;
  }

  #mouse-canvase {
    position: relative;
    z-index: 2;
    width: v-bind(cssW);
    height: v-bind(cssH)
  }

}
</style>

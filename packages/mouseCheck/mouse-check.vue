<template>
  <div class="mouse-check" :class="[success === false ? 'mouse-check-fail' : '']">
    <div class="mouse-slider-box" v-if="success">
      <div class="mouse-slider"></div>
    </div>
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

interface Emits {
  (event: 'check', val: boolean): void
}

let util: CanvasUtil

const props = withDefaults(defineProps<Props>(), {
  width: 300
})

const emits = defineEmits<Emits>()
const mouseMove = ref()

const height = computed(() => {
  return props.width / 4 * 3
})

const cssW = computed(() => {
  return props.width + 'px'
})
const cssH = computed(() => {
  return height.value + 'px'
})

const success = ref<boolean | null>()

const handleMove = (e: Move_Inter) => {
  util.move(e.x)
  const { isCheck, value } = util.check(e.x, e.action)
  if (isCheck) {
    if (value) {
      handleSuccess()
    } else {
      handleFail()
    }
  }
}

const handleSuccess = () => {
  success.value = true
  emits('check', true)
  handleReset()
}
const handleFail = () => {
  success.value = false
  emits('check', false)
  handleReset()
}

const handleReset = () => {
  init()
  mouseMove?.value?.reset()
  setTimeout(() => {
    success.value = null
  }, 1000);
}

const mouseCanvas = ref<HTMLCanvasElement>()
const mouseBgCanvas = ref<HTMLCanvasElement>()

const init = () => {
  util = new CanvasUtil(mouseBgCanvas.value!, mouseCanvas.value!, props.src)
}

onMounted(() => {
  init()
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
  overflow: hidden;

  &.mouse-check-fail {
    animation: headShake .8s linear;
  }

  .mouse-slider-box {
    width: v-bind(cssW);
    height: v-bind(cssH);
    position: absolute;
    overflow: hidden;
    left: 0;
    top: 0;

    .mouse-slider {
      position: absolute;
      top: 0;
      right: 0;
      width: 60px;
      height: 200%;
      z-index: 99;
      background: linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.1));
      transform-origin: center center;
      transform: translateY(-50%) translateX(100px) rotate(-45deg);
      animation: mouse-slider-ani 0.8s linear;
    }
  }

  @keyframes mouse-slider-ani {
    0% {
      transform: translateY(-50%) translateX(100px) rotate(-45deg);
    }

    100% {
      transform: translateY(50%) translateX(-600px) rotate(-45deg);
    }
  }

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

  @keyframes jello {

    0%,
    11.1%,
    to {
      -webkit-transform: translateZ(0);
      transform: translateZ(0)
    }

    22.2% {
      -webkit-transform: skewX(-12.5deg) skewY(-12.5deg);
      transform: skewX(-12.5deg) skewY(-12.5deg)
    }

    33.3% {
      -webkit-transform: skewX(6.25deg) skewY(6.25deg);
      transform: skewX(6.25deg) skewY(6.25deg)
    }

    44.4% {
      -webkit-transform: skewX(-3.125deg) skewY(-3.125deg);
      transform: skewX(-3.125deg) skewY(-3.125deg)
    }

    55.5% {
      -webkit-transform: skewX(1.5625deg) skewY(1.5625deg);
      transform: skewX(1.5625deg) skewY(1.5625deg)
    }

    66.6% {
      -webkit-transform: skewX(-.78125deg) skewY(-.78125deg);
      transform: skewX(-.78125deg) skewY(-.78125deg)
    }

    77.7% {
      -webkit-transform: skewX(.390625deg) skewY(.390625deg);
      transform: skewX(.390625deg) skewY(.390625deg)
    }

    88.8% {
      -webkit-transform: skewX(-.1953125deg) skewY(-.1953125deg);
      transform: skewX(-.1953125deg) skewY(-.1953125deg)
    }
  }

  @keyframes headShake {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0)
    }

    6.5% {
      -webkit-transform: translateX(-6px) rotateY(-9deg);
      transform: translateX(-6px) rotateY(-9deg)
    }

    18.5% {
      -webkit-transform: translateX(5px) rotateY(7deg);
      transform: translateX(5px) rotateY(7deg)
    }

    31.5% {
      -webkit-transform: translateX(-3px) rotateY(-5deg);
      transform: translateX(-3px) rotateY(-5deg)
    }

    43.5% {
      -webkit-transform: translateX(2px) rotateY(3deg);
      transform: translateX(2px) rotateY(3deg)
    }

    50% {
      -webkit-transform: translateX(0);
      transform: translateX(0)
    }
  }


}
</style>

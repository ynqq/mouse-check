<template>
    <div class="mouse-control" @mousemove="handleMove" @mouseup="handleUp" @mouseleave="handleLeave">
        <div class="mouse-control-slider"></div>
        <div @mousedown="handleDown" :style="{transform: `translateX(${x}px)`}" class="mouse-control-btn"></div>
    </div>
</template>

<script setup lang="ts">

import { computed, reactive, ref } from 'vue';
export interface Move_Inter {
    x: number, action: number
}
interface Emits_Inter {
    (event: 'move', val: Move_Inter): void,
}
interface Props {
    width: number
}

interface Pos_Inter {
    x: number,
}


const props = defineProps<Props>()
const emits = defineEmits<Emits_Inter>()
const sliderW = ref(60)
let currentTime: number


const sliderWCss = computed<string>(() => {
    return sliderW.value + 'px'
})
const maxLeft = computed<number>(() => {
    return props.width - sliderW.value
})

const x = ref<number>(0)
const isDwon = ref<boolean>(false)
const isMove = ref<boolean>(false)
let oldPos = reactive<Pos_Inter>({
    x: 0,
})

const setOldPost = (val: MouseEvent) => {
    oldPos = {
        x: val.clientX,
    }
}
const handleDown = (e: MouseEvent) => {
    setOldPost(e)
    isDwon.value = true
    trigger(0)
}
const handleMove = (e: MouseEvent) => {
    
    if (!currentTime || Date.now() - currentTime > 30) {
        currentTime = Date.now()
        if (isDwon.value) {
            isMove.value = true
            let dis = e.clientX - oldPos.x
            dis < 0 && (dis = 0)
            dis > maxLeft.value && (dis = maxLeft.value)
            x.value = dis
            trigger(1)
        }
    }
}
const handleUp = (e: MouseEvent) => {
    if(isMove.value){
        trigger(2)
    }
    isDwon.value = false
    isMove.value = false
}
const handleLeave = () => {
    if(isDwon.value && isMove.value){
        isDwon.value = false
        isMove.value = false
        trigger(3)
    }
}

// action 0 down 1 move 2 up 3 leave
const trigger = (action) => {
    emits('move', { x: x.value, action })
}

const reset = () => {
    x.value = 0
}
defineExpose({
    reset
})
</script>

<script lang="ts">



export default {
    name: 'MouseMove'
}
</script>

<style scoped lang="less">
.mouse-control {
    position: relative;
    width: 100%;
    height: v-bind(sliderWCss);

    * {
        user-select: none;
    }

    .mouse-control-slider {
        position: absolute;
        left: 0;
        border-radius: 20px;
        background-color: #eee;
        top: 10px;
        width: 100%;
        height: 40px;
    }

    .mouse-control-btn {
        position: absolute;
        left: 0;
        top: 0;
        width: v-bind(sliderWCss);
        height: 100%;
        border-radius: 50%;
        background-color: orange;
        cursor: pointer;
    }
}
</style>
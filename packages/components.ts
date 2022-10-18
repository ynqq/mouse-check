import MouseCheck from './mouseCheck/mouse-check.vue'
declare module 'vue' {
    export interface GlobalComponents{
        MouseCheck: typeof MouseCheck
    }
}
export {}
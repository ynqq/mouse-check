import { createVNode, render } from 'vue'
import MouseCheck, { Mouse_Check_Props } from './mouseCheck/mouse-check.vue'

export function check(options: Mouse_Check_Props) {
    return new Promise((resolve, reject) => {
        const app = createVNode(MouseCheck, {
            ...options,
            onCheck: e => {
                if (e) {
                    resolve(e)
                } else {
                    reject(e)
                }
            }
        })
        const parent = document.createElement('div')
        render(app, parent)
        document.body.appendChild(parent)
    })
}



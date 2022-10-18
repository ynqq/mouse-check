
interface MaskInfo_Inter {
    x: number;
    y: number;
    size: number;
}


interface CheckResult_Inter {
    value: boolean;
    isCheck: boolean;
}

class RandomPos {
    _value: number
    constructor(begin: number, end: number) {
        this._value = Math.floor(Math.random() * (end - begin)) + begin
    }
    get value() {
        return this._value
    }
}

class CanvasUtil {
    bgCanvas: HTMLCanvasElement;
    bgCtx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    src: string;
    misSize: number;
    xRandom: RandomPos;
    yRandom: RandomPos;
    constructor(bgCanvas: HTMLCanvasElement, canvas: HTMLCanvasElement, src: string, misSize?: number) {
        this.misSize = misSize || 10
        this.bgCanvas = bgCanvas
        this.bgCtx = bgCanvas.getContext('2d')!
        this.canvas = canvas
        this.src = src
        this.ctx = canvas.getContext('2d')!
        this.xRandom = new RandomPos(Math.min(60, this.canvas.width), this.canvas.width - 60)
        this.yRandom = new RandomPos(Math.min(60, this.canvas.height), this.canvas.height - 60)
        this.init()
    }
    initRandom() {
    }
    async init() {
        await this.drawBG()
        this.drawMask()
        this.drawMove()
    }
    drawBG() {
        return new Promise<void>((resolve, reject) => {
            const img = new Image()
            img.src = this.src
            img.onerror = () => reject()
            img.onload = () => {
                // img.width = this.bgCanvas.width
                // img.height = this.bgCanvas.height
                this.bgCanvas.width = img.width
                this.bgCanvas.height = img.height
                this.bgCtx.drawImage(img, 0, 0, this.bgCanvas.width, this.bgCanvas.height)
                resolve()
            }
        })
    }
    getMaskInfo(): MaskInfo_Inter {
        return {
            x: this.xRandom.value,
            y: this.yRandom.value,
            size: 40
        }
    }
    drawMask() {
        const { x, y, size } = this.getMaskInfo()
        this.bgCtx.fillStyle = 'rgba(0, 0, 0, 0.5)'
        this.bgCtx.fillRect(x, y, size, size)
    }
    drawMove(moveX: number = 0) {
        let img = new Image()
        img.src = this.src
        img.onload = () => {
            // img.width = this.canvas.width
            // img.height = this.canvas.height
            this.canvas.width = img.width
            this.canvas.height = img.height
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            const { x, y, size } = this.getMaskInfo()
            this.ctx.drawImage(img, x, y, size, size, moveX || 0, y, size, size)
        }
    }
    move(x: number): void {
        this.drawMove(x)
    }
    check(x: number, action: number): CheckResult_Inter {
        const checkList = [2, 3]
        if (checkList.includes(action)) {
            if (Math.abs(x - this.xRandom.value) <= this.misSize) {
                return {
                    isCheck: true,
                    value: true
                }
            } else {
                return {
                    isCheck: true,
                    value: false
                }
            }
        }
        return {
            isCheck: false,
            value: false
        }
    }
}

export default CanvasUtil
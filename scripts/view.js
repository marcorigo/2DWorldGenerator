class Render {
    constructor(canvas, world, width, height, scale = false) {
        this.canvas = canvas
        this.world = world
        this.width = width
        this.height = height
        this.scale = scale
        this.ctx = this.canvas.getContext('2d')
        this.scale && this.attachCanvasResizeEvent()
    }
    attachCanvasResizeEvent() {
        window.addEventListener('resize', () => {
            this.resizeCanvas(window.innerWidth, window.innerHeight)
        })
    }
    resizeCanvas(width, height) {
        this.canvas.width = width
        this.canvas.height = height
    }
}
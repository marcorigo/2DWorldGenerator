class RenderEngine {
    constructor(canvas, world, options) {
        this.canvas = canvas
        this.world = world
        this.minX = this.world.minX
        this.windowWidth = options.width || window.innerWidth
        this.windowHeight = options.height || window.innerHeight
        this.scale = options.scale || true
        this.blockSize = options.blockSize || parseInt((this.windowHeight / 50))
        this.skyColor = options.skyColor || 'lightblue'
        this.ctx = canvas.getContext('2d')
        this.scale && this.attachCanvasResizeEvent()
        this.maxX = parseInt(this.windowWidth / this.blockSize)
        let u = parseInt(this.windowHeight / this.blockSize)
        let i = parseInt(this.world.maxY / 2)
        this.maxY = parseInt(i + u / 2)
        this.minY = parseInt(i - u / 2)
        console.log(i, u)
        console.log(this.minY, this.maxY)
        this.cameraX = 0
        this.cameraY = 0
        this.keys = {a: false, d: false, w: false, s: false}
        this.keyEvents(this.keys)
    }
    keyEvents(keys) {
        document.addEventListener('keydown', (e) => {
            let key = e.keyCode
            if(key === 65) { keys.a = true }
            if(key === 68) { keys.d = true }
            if(key === 87) { keys.w = true }
            if(key === 83) { keys.s = true }
        });
        document.addEventListener('keyup', (e) => {
            let key = e.keyCode
            if(key === 65) { keys.a = false }
            if(key === 68) { keys.d = false }
            if(key === 87) { keys.w = false }
            if(key === 83) { keys.s = false }
        });
    }
    checkMovement() {
        if(this.keys.a && this.minX > 0) { this.minX --; this.maxX -- }
        if(this.keys.d) { this.minX ++; this.maxX ++ }
        if(this.keys.w) { this.minY ++; this.maxY ++ }
        if(this.keys.s) { this.minY --; this.maxY -- }
    }
    attachCanvasResizeEvent() {
        window.addEventListener('resize', () => {
            this.windowWidth = window.innerWidth
            this.windowHeight = window.innerHeight
            this.maxX = parseInt(this.windowWidth / this.blockSize)
            this.resizeCanvas(this.windowWidth, this.windowHeight)
        })
        this.resizeCanvas(this.windowWidth, this.windowHeight)
    }
    resizeCanvas(width, height) {
        this.canvas.width = width
        this.canvas.height = height
    }
    render() {
        this.checkMovement()
        if(this.maxX > this.world.worldArray.length || this.minX === 0) {
            world.generate(this.minX, this.maxX)
        }
        if(this.cameraX === 0) {
            for(let i = 0; i < this.world.worldArray[0].length; i ++) {
                if(this.world.worldArray[0][i + 1] == 0) {
                    this.cameraY = i * this.blockSize;
                    break
                }
            }
        }
        this.worldRender(this.minX , this.minY, this.maxX, this.maxY )
        this.renderCamera()
        requestAnimationFrame(this.render.bind(this))
    }
    renderCamera() {
        this.drawBlock(this.cameraX, this.cameraY, this.blockSize, this.blockSize, 'purple')
    }
    worldRender(startX, startY, endX, endY) {
        this.clearCanvas()
        for(let x = 0; x < endX - startX; x ++) { 
            for(let y = 0; y < endY - startY; y ++) {
                let block = this.world.worldArray[x + startX][y + startY]
                if(block != 0) {
                    let color = this.blockManager(block)
                    this.drawBlock(x * this.blockSize ,
                                  (endY - startY - y - 1) * this.blockSize ,
                                  this.blockSize ,
                                  this.blockSize ,
                                  color)
                    // this.printBlockId(x * this.blockSize , (endY - startY - y - 1) * this.blockSize, block)
                }
            }
        }
    }
    clearCanvas(){
        this.drawBlock(0, 0, this.canvas.width, this.canvas.height, this.skyColor)
    }
    drawBlock(x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x ,y , width, height)
        this.ctx.lineWidth = 0.2
        this.ctx.strokeStyle = 'black'
        this.ctx.strokeRect(x ,y , width, height)
    }
    printBlockId(x, y, block) {
        this.ctx.fillStyle = 'black'
        this.ctx.font = "10px Arial";
        this.ctx.fillText(block, x, y + 10);
    }
    blockManager(blockId) {
    if (blockId == 1)
        return 'green'
    else if (blockId == 2)
        return 'brown'
    else if (blockId == 3)
        return 'gray'
    else if (blockId == 4)
        return '#0077be'
    else if (blockId == 5)
        return '#c2b280'
    else if (blockId == 6)
        return 'black'
    else
        return 'purple'
    }
}
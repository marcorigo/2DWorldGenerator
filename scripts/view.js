class RenderEngine {
    constructor(canvas, world, options) {
        this.canvas = canvas
        this.world = world
        this.worldMaxY = this.world.maxY
        this.minX = this.world.minX
        this.windowWidth = options.width || window.innerWidth
        this.windowHeight = options.height || window.innerHeight
        this.scale = options.scale || true
        this.blockSize = options.blockSize || parseInt(this.windowHeight / this.worldMaxY)
        this.skyColor = options.skyColor || 'lightblue'
        this.ctx = canvas.getContext('2d')
        this.scale && this.attachCanvasResizeEvent()
        this.maxX = parseInt(this.windowWidth / this.blockSize)
    }
    attachCanvasResizeEvent() {
        window.addEventListener('resize', () => {
            this.windowWidth = window.innerWidth
            this.windowHeight = window.innerHeight
            this.maxX = parseInt(this.windowWidth / this.blockSize)
            this.resizeCanvas(this.windowWidth, this.windowHeight)
            // TEST
            this.render()
        })
        this.resizeCanvas(this.windowWidth, this.windowHeight)
    }
    resizeCanvas(width, height) {
        this.canvas.width = width
        this.canvas.height = height
    }
    render() {
        let startX = this.world.worldArray.lenght || 0
        world.generate(startX, this.maxX)
        this.worldRender(0, 0, this.maxX, this.worldMaxY)
    }
    worldRender(startX, startY, endX, endY) {
        this.clearCanvas()
        for(let x = startX; x < endX; x ++) { 
            for(let y = startY; y < endY; y ++) {
                let block = this.world.worldArray[x][y]
                if(block != 0) {
                    let color = this.blockManager(block)
                    this.drawBlock(x * this.blockSize ,
                                  (endY - startY - y - 1) * this.blockSize ,
                                  this.blockSize ,
                                  this.blockSize ,
                                  color)
                }
            }
        }
    }
    clearCanvas(){
        this.ctx.fillStyle = this.skyColor
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    drawBlock(x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x ,y , width, height)
        this.ctx.lineWidth = 0.2
        this.ctx.strokeStyle = 'black'
        this.ctx.strokeRect(x ,y , width, height)
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
    else
        return 'purple'
    }
}
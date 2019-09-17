class RenderEngine {
    constructor(canvas, world, options) {
        this.canvas = canvas
        this.world = world
        this.worldMaxY = this.world.maxY
        this.minX = this.world.minX
        this.windowWidth = options.width || window.innerWidth
        this.windowHeight = options.height || window.innerHeight
        this.scale = options.scale || true
        this.blockSize = options.blockSize || parseInt(this.windowWidth / 100)
        this.skyColor = options.skyColor || 'lightblue'
        this.ctx = canvas.getContext('2d')
        this.scale && this.attachCanvasResizeEvent()
        this.maxX = parseInt(this.windowWidth / this.blockSize)
        this.cameraX = 0
        this.cameraY = 0
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
        world.generate(this.minX, this.maxX)
        for(let i = 0; i < this.world.worldArray[0].length; i ++) {
            if(this.world.worldArray[0][i + 1] == 0) {
                this.cameraY = i * this.blockSize;
                break
            }
        }
        this.worldRender(0 , 0, this.maxX, this.worldMaxY )
        this.renderCamera()
    }
    renderCamera() {
        this.drawBlock(this.cameraX, this.cameraY, this.blockSize, this.blockSize, 'purple')
    }
    worldRender(startX, startY, endX, endY) {
        console.log(startX, startY, endX, endY)
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
                    this.printBlockId(x * this.blockSize , (endY - startY - y - 1) * this.blockSize, block)
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
    else
        return 'purple'
    }
}
class RenderEngine {
    constructor(canvas, world, options) {
        this.canvas = canvas
        this.world = world
        this.options = options
        this.pixelRatio = window.devicePixelRatio || 1
        this.blocksInHeight = options.blocksInHeight || 50
        this.windowWidth = options.width || window.innerWidth 
        this.windowHeight = options.height || window.innerHeight 
        this.scale = options.scale
        this.blockSize = options.blockSize || parseInt((this.windowHeight /  this.blocksInHeight))
        this.skyColor = options.skyColor || 'lightblue'
        this.ctx = canvas.getContext('2d')
        this.minX = this.world.minX
        this.minY = 0
        this.maxX = 0
        this.posX = 500
        this.posY = 0
        this.viewport = {}
        this.maxY = this.world.maxY
        this.keys = new Controls()
        this.fpsCounter = new FpsCounter()
        this.inizialize()
    }
    inizialize() {
        if(this.scale) {
            window.addEventListener('resize', () => { this.resCanv() })
            document.getElementById('canvas').style.width = '100%'
            document.getElementById('canvas').style.height = '100vh'
        }
        this.resCanv()
    }
    clamp(n, lo, hi) {
        // console.log(n < lo ? lo : n > hi ? hi : n)
        return n < lo ? lo : n > hi ? hi : n
    }
    checkMovement() {
        // if(this.keys.get(65) && this.minX > 0) { this.minX --; this.maxX -- }
        // if(this.keys.get(68)) { this.minX ++; this.maxX ++ }
        // if(this.keys.get(87)) { this.minY ++; this.maxY ++ }
        // if(this.keys.get(83)) { this.minY --; this.maxY -- }
        if(this.keys.get(65)) { this.posX -= 5 }
        if(this.keys.get(68)) { this.posX += 5 }
        if(this.keys.get(87)) { this.posY -= 5 }
        if(this.keys.get(83)) { this.posY += 5 }
    }
    resCanv() {
        if(this.scale) {
            this.updateWindowSettings()
            this.updateBlockSize()
        }
        this.resizeCanvas()
        this.calcViewport()
    }
    updateBlockSize() {
        this.blockSize = this.options.blockSize || parseInt((this.windowHeight /  this.blocksInHeight))
    }
    calcViewport() {
        let blocksOnHeight = parseInt((this.windowHeight / this.blockSize))
        let halfWorldHeight = parseInt(this.world.maxY / 2)
        this.maxY = parseInt(halfWorldHeight + blocksOnHeight / 2)
        // Adding +1 and -1 to not leave empty blocks because of parsing
        this.minY = parseInt(halfWorldHeight - blocksOnHeight / 2) - 1
        // this.maxX = parseInt(this.windowWidth / this.blockSize) + 1 + this.minX
    }
    resizeCanvas() {
        this.canvas.width = this.windowWidth * this.pixelRatio
        this.canvas.height = this.windowHeight * this.pixelRatio
        this.ctx.scale(this.pixelRatio, this.pixelRatio)
        // this.ctx.setTransform(this.pixelRatio,0,0,this.pixelRatio,0,0);
    }
    updateWindowSettings() {
        let backingStore = this.ctx.msBackingStorePixelRatio ||
            this.ctx.webkitBackingStorePixelRatio ||
            this.ctx.mozBackingStorePixelRatio ||
            this.ctx.oBackingStorePixelRatio ||
            this.ctx.backingStorePixelRatio || 
            this.ctx.msBackingStorePixelRatio || 1
        this.pixelRatio = (window.devicePixelRatio || 1) / backingStore
        this.windowWidth = parseInt(window.innerWidth)
        this.windowHeight = parseInt(window.innerHeight)
    }
    render() {
        this.viewport.x = this.clamp(
            -this.posX + this.canvas.width / 2, 
          this.canvas.width - 1000 * this.blockSize, 0
        );
    
        this.viewport.y = this.clamp(
            -this.posY + this.canvas.height / 2, 
          this.canvas.height - 150 * this.blockSize, 0
        ); 
        this.minX = Math.ceil(this.viewport.x / this.blockSize) * -1
        this.maxX = Math.ceil((this.canvas.width - this.viewport.x) / this.blockSize) + 1
        // this.minY = Math.ceil((this.viewport.y / this.blockSize) * -1)
        // this.maxY = Math.ceil((this.canvas.height - this.viewport.y) / this.blockSize) + 1

        this.fpsCounter.go()
        this.checkMovement()
        if(this.maxX > this.world.worldArray.length || this.minX === 0) {
            world.generate(this.minX, this.maxX)
        }
        this.clearCanvas()
        this.ctx.save()
        this.ctx.translate(this.viewport.x % this.blockSize, 0)
        this.worldRender(this.minX , this.minY, this.maxX, this.maxY )
        this.ctx.restore()
        // this.renderCamera()
        this.debugScreen()
        // this.drawBlock(this.posX, this.posY, 10, 10, 'red')
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.posX + this.viewport.x, this.posY + this.viewport.y, 10, 10)

        requestAnimationFrame(this.render.bind(this))
    }
    worldRender(startX, startY, endX, endY) {
        for(let x = 0; x < endX - startX; x ++) { 
            for(let y = 0; y < endY - startY; y ++) {
                let block = this.world.worldArray[x + startX][y + startY]
                if(block != 0) {
                    let color = this.blockManager(block)
                    this.drawBlock(x * this.blockSize - (this.posX - parseInt(this.posX)) ,
                                  (endY - startY - y - 1) * this.blockSize ,
                                  this.blockSize ,
                                  this.blockSize ,
                                  color)
                    // this.printBlockId(x * this.blockSize , (endY - startY - y - 1) * this.blockSize, x)
                }
            }
        }
    }
    clearCanvas(){
        this.drawBlock(0, 0, this.canvas.width, this.canvas.height, this.skyColor)
    }
    drawBlock(x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y , width, height)
        this.ctx.lineWidth = 0.2
        this.ctx.strokeStyle = 'black'
        this.ctx.strokeRect(x, y , width, height)
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
        return '#606060'
    else
        return 'black'
    }
    debugScreen() {
        document.getElementById('fps').innerText = 'FPS: ' + this.fpsCounter.value()
        document.getElementById('minx').innerText = 'MinX: ' + this.minX
        document.getElementById('maxx').innerText = 'MaxX: ' + this.maxX
        document.getElementById('miny').innerText = 'MinY: ' + this.minY
        document.getElementById('maxy').innerText = 'MaxY: ' + this.maxY
        document.getElementById('windowwidth').innerText = 'Ww: ' + this.windowWidth
        document.getElementById('windowheight').innerText = 'Wh: ' + this.windowHeight
        document.getElementById('pixelratio').innerText = 'PixelRT: ' + this.pixelRatio
        document.getElementById('canvaswidth').innerText = 'Cw: ' + this.canvas.width
        document.getElementById('canvasheight').innerText = 'Ch: ' + this.canvas.height
        document.getElementById('blocksize').innerText = 'BlockSz: ' + this.blockSize
        document.getElementById('test').innerText = 'test: ' + this.test
        document.getElementById('worldlength').innerText = 'WorldLength: ' + this.world.worldArray.length
    }
}
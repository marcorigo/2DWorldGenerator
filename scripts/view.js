class RenderEngine {
    constructor(canvas, world, options) {
        this.canvas = canvas
        this.world = world
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
        this.maxY = this.world.maxY
        this.keys = {a: false, d: false, w: false, s: false}
        this.fpsCounter = new FpsCounter()
        // console.log(this.ctx.msBackingStorePixelRatio ,
        //     this.ctx.webkitBackingStorePixelRatio ,
        //     this.ctx.mozBackingStorePixelRatio ,
        //     this.ctx.oBackingStorePixelRatio ,
        //     this.ctx.backingStorePixelRatio , 
        //     this.ctx.msBackingStorePixelRatio)
        this.inizialize()
    }
    inizialize() {
        this.keyEvents(this.keys)
        if(this.scale) {
            window.addEventListener('resize', () => { this.resCanv() })
            document.getElementById('canvas').style.width = '100%'
            document.getElementById('canvas').style.height = '100vh'
        }
        this.resCanv()
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
    resCanv() {
        if(this.scale) {
            this.resizeWindow()
            this.updateBlockSize()
        }
        this.resizeCanvas()
        this.calcViewport()
    }
    updateBlockSize() {
        this.blockSize = parseInt((this.windowHeight /  this.blocksInHeight))
    }
    calcViewport() {
        let blocksOnHeight = parseInt((this.windowHeight / this.blockSize))
        let halfWorldHeight = parseInt(this.world.maxY / 2)
        this.maxY = parseInt(halfWorldHeight + blocksOnHeight / 2)
        // Adding +1 and -1 to not leave empty blocks because of parsing
        this.minY = parseInt(halfWorldHeight - blocksOnHeight / 2) - 1
        this.maxX = parseInt(this.windowWidth / this.blockSize) + 1
        // TEST
        this.minX = 0
    }
    resizeCanvas() {
        this.canvas.width = this.windowWidth * this.pixelRatio
        this.canvas.height = this.windowHeight * this.pixelRatio
        this.ctx.scale(this.pixelRatio, this.pixelRatio)
        // this.ctx.setTransform(this.pixelRatio,0,0,this.pixelRatio,0,0);
    }
    resizeWindow() {
        // TEST
        this.pixelRatio = window.devicePixelRatio
        this.windowWidth = parseInt(window.innerWidth)
        this.windowHeight = parseInt(window.innerHeight)
    }
    render() {
        this.fpsCounter.go()
        this.checkMovement()
        if(this.maxX > this.world.worldArray.length || this.minX === 0) {
            world.generate(this.minX, this.maxX)
        }
        this.worldRender(this.minX , this.minY, this.maxX, this.maxY )
        // this.renderCamera()
        this.debugScreen()
        requestAnimationFrame(this.render.bind(this))
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
        document.getElementById('worldlength').innerText = 'WorldLength: ' + this.world.worldArray.length
    }
}
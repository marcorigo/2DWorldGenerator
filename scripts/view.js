class RenderEngine {
    constructor(canvas, world, width, height, blocksize = false, scale = false) {
        this.canvas = canvas
        this.world = world
        this.width = width
        this.height = height
        this.scale = scale
        this.blocksize = blocksize
        this.worldMaxY = this.world.maxY
        this.maxY = this.world.maxY
        this.minX = this.world.minX
        this.windowWidth = window.innerWidth
        this.windowHeight = window.innerHeight
        this.ctx = canvas.getContext('2d')
        this.scale && this.attachCanvasResizeEvent()
        this.resizeCanvas(this.windowWidth, this.windowHeight)
        if(!blocksize) {
            this.blocksize = this.windowHeight / this.worldMaxY
        }
    }
    attachCanvasResizeEvent() {
        window.addEventListener('resize', () => {
            this.windowWidth = window.innerWidth
            this.windowHeight = window.innerHeight
            this.resizeCanvas( this.windowWidth, this.windowHeight)
        })
    }
    resizeCanvas(width, height) {
        this.canvas.width = width
        this.canvas.height = height
    }
    render(startX, startY, endX, endY) {
        console.log(this.world.worldArray)
        this.clearCanvas()
        for(let x = startX; x < endX; x ++) { 
            for(let y = startY; y < endY; y ++) {
                let block = this.world.worldArray[x][y]
                if(block != 0) {
                    let color = this.blockManager(block)
                    this.ctx.fillStyle = color;
                    this.ctx.fillRect (x * this.blocksize ,(endY - startY - y - 1) * this.blocksize , this.blocksize, this.blocksize)
                }
            }
        }
    }
    clearCanvas(){
        this.ctx.fillStyle = "lightblue";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
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
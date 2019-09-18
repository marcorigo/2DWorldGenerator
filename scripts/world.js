class World {
    constructor(options) {
        this.chunkSize = options.chunkSize || 128
        this.noise = options.noiseLevel || 0
        this.maxY = options.maxHeight || 150
        this.minY = options.minHeight || 0
        this.minX = options.minWidth || 0
        this.seed = options.seed || this.generateSeed()
        console.log('SEED: ' + this.seed)
        this.worldArray = []
        this.noiseGen = new PerlinNoise(this.seed)
    }
    generateSeed() {
        return Math.floor(Math.random() * 10000000) + 1000000; 
    }
    saveWorld(blockId) {
        this.worldArray.push(blockId)
    }
    generate(startX, endX) {
        if(endX > this.worldArray.length) {
            startX = this.worldArray.length
            endX += this.chunkSize
            for(let x = startX; x < endX; x ++) {
                let colHeight = parseInt(this.noiseGen.getNoise(x, this.maxY - this.minY, this.chunkSize, this.noise))
                let column = []
                for(let y = this.minY; y < this.maxY; y ++ ) {
                    let blockId = this.blockGenerationManager(y, colHeight)
                    column.push(blockId)
                }
                this.saveWorld(column)
            }
        }
    }
    blockGenerationManager(y, colHeight) {
        if (y === 0)
            return  6
        if (y > colHeight && y < this.maxY / 3)
            return 4
        if (y > colHeight)
            return  0
        if (y == colHeight && y < this.maxY / 3 + 1)
            return  5
        if (y == colHeight)
            return  1
        if (y > colHeight - 5)
            return  2
        else
            return  3
    }
}

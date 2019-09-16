class World {
    constructor(chunkSize, noise, maxY = false, seed = false, maxWidth = false) {
        this.maxWidth = maxWidth
        this.chunkSize = chunkSize
        this.noise = noise
        this.maxY = maxY
        this.minY = 0
        this.minX = 0
        this.seed = seed
        this.defaultSettingSetter()
        this.worldArray = []
        this.noiseGen = new PerlinNoise(this.seed)
    }
    defaultSettingSetter() {
        if (!this.seed) {
            this.seed = this.generateSeed()
        }
        if (!this.maxY) {
            this.maxY = 150
        }
    }
    generateSeed() {
        return Math.floor(Math.random() * 10000000) + 1000000; 
    }
    saveWorld(blockId) {
        this.worldArray.push(blockId)
    }
    generate(startX, endX) {
        for(let i = startX; i < endX; i ++) {
            let colHeight = parseInt(this.noiseGen.getNoise(i, this.maxY - this.minY, this.chunkSize, this.noise))
            for(let j = this.minY; j < this.maxY; j ++ ) {
                let je = this.maxY - j
                let blockId
                if (je > colHeight && je < this.maxY / 3)
                    blockId = 4
                else if (je > colHeight)
                    blockId = 0
                else if (je == colHeight && je < this.maxY / 3 + 1)
                    blockId = 5
                else if (je == colHeight)
                    blockId = 1
                else if (je > colHeight - 5)
                    blockId = 2
                else
                    blockId = 3
                this.saveWorld(blockId)
            }
        }
    }
}





// blockManager(this, blockId) {
//     if (blockId == 1)
//         return 'green'
//     else if (blockId == 2)
//         return 'brown'
//     else if (blockId == 3)
//         return 'gray'
//     else if (blockId == 4)
//         return '#0077be'
//     else if (blockId == 5)
//         return '#c2b280'
//     else
//         return 'purple'
// }
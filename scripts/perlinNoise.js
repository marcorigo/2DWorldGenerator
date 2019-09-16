class PerlinNoise {
    constructor(seed) {
        this.seed = seed
    }
    random(x, range) {
        return ((x + this.seed) ** 5) % range
    }
    getNoise(x, range, chunkSize, noise) {
        range /= 2
        while(chunkSize > 0) {
            let chunkIndex = parseInt(x / chunkSize)
            let prog = (x % chunkSize) / chunkSize
            let left_random = this.random(chunkIndex, range)
            let right_random = this.random(chunkIndex + 1, range)
            noise += (1 - prog) * left_random + prog * right_random
            chunkSize = parseInt(chunkSize / 2)
            range /= 2
        }
        return Math.round(noise)
    }
}




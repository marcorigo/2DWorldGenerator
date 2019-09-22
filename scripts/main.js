let canvas = document.getElementById('canvas')
// seed: 8137774

let world = new World({
    chunkSize: 0,
    noiseLevel: 0,
    maxHeight: 0,
    minHeight: 0,
    minWidth: 0,
    seed: 0
})
let renderEngine = new RenderEngine(canvas, world, {
    scale: true,
    blocksInHeight: 0,
    width: 0,
    height: 0,
    blockSize: 0,
    skyColor: 0
})

renderEngine.render()

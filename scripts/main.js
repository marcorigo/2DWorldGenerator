let canvas = document.getElementById('canvas')
let world = new World({})
let renderEngine = new RenderEngine(canvas, world, {blockSize: 10})


renderEngine.render()


let canvas = document.getElementById('canvas')
let world = new World({})
let renderEngine = new RenderEngine(canvas, world, 10, 10, false, true)


renderEngine.render()


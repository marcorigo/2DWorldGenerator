let canvas = document.getElementById('canvas')
let world = new World(128, 0, false, false, false)
let renderEngine = new RenderEngine(canvas, world, 10, 10, false, true)


renderEngine.render()


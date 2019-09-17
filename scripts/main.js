let canvas = document.getElementById('canvas')
let world = new World({seed: 8137774})
let renderEngine = new RenderEngine(canvas, world, {scale: true})


renderEngine.render()


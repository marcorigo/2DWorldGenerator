let canvas = document.getElementById('canvas')
let world = new World(128, 0, false, false, false)
let render = new RenderEngine(canvas, world, 10, 10, false, true)


let r = 100
world.generate(0, r)
render.render(0 , 0, r, 150)
// setTimeout(() => {
//     let st = ''
//     console.log(world.worldArray)
//     for(let j = 0; j < y; j ++) {
//         for(let i = 0; i < world.worldArray.length / y; i ++) {
//             st += world.worldArray[(10 * j) + i] + ' '

//         }
//         console.log(st);
//         st = ''
//         console.log()
//     }
// }, 1000)

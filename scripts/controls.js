var Controls = function() {
    var keys = []
    document.addEventListener('keydown', (e) => {
        keys[e.keyCode] = true
    });
    document.addEventListener('keyup', (e) => {
        keys[e.keyCode] = false
    });
    return {
        get: (id) => { return keys[id] }
    }
}

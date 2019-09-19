class controls {
    constructor() {
        this.keys = []
    }
    inizialize() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.keyCode] = true
        });
        document.addEventListener('keyup', (e) => {
            this.keys[e.keyCode] = false
        });
    }
}

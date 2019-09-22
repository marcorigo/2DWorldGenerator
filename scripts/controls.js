var Controls = function() {
    var keys = []
    document.addEventListener('keydown', (e) => {
        keys[e.keyCode] = true
    });
    document.addEventListener('keyup', (e) => {
        keys[e.keyCode] = false
    });
    // Mobile controls handler
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
      };
    if(isMobile.any()){
        let keysDiv = document.getElementById('keys')
        let mobileKeys = document.querySelectorAll('.key')
        mobileKeys.forEach(x => {
            x.addEventListener('touchstart', (e) => {
                keys[x.value] = true
            })
            x.addEventListener('touchend', (e) => {
                keys[x.value] = false
            })
        });
        keysDiv.style.display = 'grid'
    }
    return {
        get: (id) => { return keys[id] }
    }
}

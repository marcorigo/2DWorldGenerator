var FpsCounter = function() {
	var currentSecond = 0
    var frameCount = 0
    var framesLastSecond = 0
	function increment() {
      let sec = Math.floor(Date.now()/1000);
	  if(sec != currentSecond)
        {
	    	currentSecond = sec
	    	framesLastSecond = frameCount
	    	frameCount = 1
	    }
        else { frameCount++ }
	}
	return {
	  go: _ => {
		increment();
	  },
	  value: function() {
		return framesLastSecond
	  }
	}
};
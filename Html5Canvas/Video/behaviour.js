$(function(){
	var rData = [];
	var gData = [];
	var bData = [];
	var tData = [];
	var perceptualData = [];
	
	
	var dialOptions = { width: 60, height: 60 };
	
	// Dialify
	$('meter').dialify(dialOptions);
	
	
	
	
	
	$('#vid').bind('play', function(){
        vidWidth = this.clientWidth;
        vidHeight = this.clientHeight;

		// Make a canvas which we'll use as a sort of buffer for the video frame img data
		var buffer = document.createElement('canvas');
		buffer.width = vidWidth;
		buffer.height = vidHeight;
		
		var bufferContext = buffer.getContext('2d');
		
		refreshStats(this, bufferContext, 0, 0, vidWidth, vidHeight);
    },false);

	function refreshStats(vid, bufferContext, x, y, w, h) {
		var b = getBrightnessFromVideoArea(vid, x, y, w, h, bufferContext);
		
		if (b != null)
			updateBrightness(b);
		
		// again?
		setTimeout(function(){ refreshStats(vid, bufferContext, x, y, w, h) }, 33);
	}

	function updateBrightness(value) {
		var overall = Math.round((value.r + value.g + value.b) / 3);
		var r = Math.round(value.r);
		var g = Math.round(value.g);
		var b = Math.round(value.b);
		var perceptual = Math.round(brightnessFromRgbUsingYuv(r, g, b));
		
		$('#r').attr('value', r).text(r);
		$('#g').attr('value', g).text(g);
		$('#b').attr('value', b).text(b);
		$('#brightness').attr('value', overall).text(overall);
		$('#perceptual').attr('value', perceptual).text(perceptual);
		
		$('canvas.dialify-meter').remove();
		$('meter').dialify(dialOptions);
		
		$('#r-sample').css('background-color', 'rgb(' + r + ",0,0)");
		$('#g-sample').css('background-color', 'rgb(0,' + g + ",0)");
		$('#b-sample').css('background-color', 'rgb(0,0,' + b + ")");
		$('#brightness-sample').css('background-color', 'rgb(' + overall + "," + overall + "," + overall + ")");
		$('#perceptual-sample').css('background-color', 'rgb(' + perceptual + "," + perceptual + "," + perceptual + ")");
		
		$('#sample').css('background-color', 'rgb(' + r + "," + g + "," + b + ")");
		
		// Graph
		var time = new Date().getTime();
		rData.push([time, r]);
		gData.push([time, g]);
		bData.push([time, b]);
		tData.push([time, overall]);
		perceptualData.push([time, perceptual]);
		
		$.plot(
			$("#graph"), 
			[
				{ data: rData, color: 'rgb(255, 0, 0)' }, 
				{ data: gData, color: 'rgb(0, 164, 0)' }, 
				{ data: bData, color: 'rgb(0, 10, 255)' }, 
				{ data: tData, color: 'rgb(100, 100, 100)' }, 
				{ data: perceptualData, color: 'rgb(180, 180, 180)' }
			], 
			{ 
				xaxis: { mode: "time" },
				yaxis: { min: 0, max: 255 }
			}
		);
	}
	
	function getBrightnessFromVideoArea(vid, x, y, w, h, bufferContext) {
		if(vid.paused || vid.ended) return null;
		
		// Draw the image onto the buffer canvas
		bufferContext.drawImage(vid, x, y, w, h);
		
		var pixelData = getPixelDataFromCanvas(bufferContext, x, y, w, h);
		var result = averageColourValuesFromPixelData(pixelData);
		
		return result;
	}
	
	function getPixelDataFromCanvas(context, x, y, w, h) {
		var imgData = context.getImageData(x, y, w, h);
	    return imgData.data;
	}
	
	function averageColourValuesFromPixelData(data) {
		var result = { r: 0, g: 0, b: 0 };
		var rSummed = gSummed = bSummed = pixelCount = 0;
		
		// Loop through the pixels
	    for(var i = 0; i < data.length; i+=4) {
			// This pixel
	        var r = data[i];
	        var g = data[i+1];
	        var b = data[i+2];
	
			rSummed += r;
			gSummed += g;
			bSummed += b;
			pixelCount++;
	    }
	
		// Maths happens...
		result.r = rSummed / pixelCount;
		result.g = gSummed / pixelCount;
		result.b = bSummed / pixelCount;
		
		return result;
	}
	
	// http://en.wikipedia.org/wiki/YUV
	function brightnessFromRgbUsingYuv(r, g, b) {
		return (0.299 * r) + (0.587 * g) + (0.114 * b);
	}
});
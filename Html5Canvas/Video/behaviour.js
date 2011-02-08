$(function(){
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
		$('#g').attr('value', g).text();
		$('#b').attr('value', b).text();
		$('#brightness').attr('value', overall).text(overall);
		$('#perceptual').attr('value', perceptual).text(perceptual);
		
		$('#r').parent().find('.sample').css('background-color', 'rgb(' + r + ",0,0)");
		$('#g').parent().find('.sample').css('background-color', 'rgb(0,' + g + ",0)");
		$('#b').parent().find('.sample').css('background-color', 'rgb(0,0,' + b + ")");
		$('#brightness').parent().find('.sample').css('background-color', 'rgb(' + overall + "," + overall + "," + overall + ")");
		$('#perceptual').parent().find('.sample').css('background-color', 'rgb(' + perceptual + "," + perceptual + "," + perceptual + ")");
				
		$('#sample').css('background-color', 'rgb(' + r + "," + g + "," + b + ")");
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
		
		console.log(gSummed);
		
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
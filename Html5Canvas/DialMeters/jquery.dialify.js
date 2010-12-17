(function($){
	$.fn.dialify = function(options) {
	
		// sort out some defaults
		var settings = {
			'size': 100,							// Size (width and height) to draw the canas
			'class': 'meter',						// Class(es) to add to the canvas
			'drawDialFace': 'true',					// Should the dial face (and scale area) be drawn?
			'pointerWidth': 4						// Thickness of pointer
		};
		
		// merge options and defaults
		if (options) {
			$.extend(settings, options);
		}
	
		return this.each(function(){
		
			// Get meter attributes
			var min = $(this).attr("min");
			var max = $(this).attr("max");
			var value = $(this).attr("value");
			var optimum = $(this).attr("optimum");
		
			// Create canvas
			canvas = document.createElement('canvas');
			canvas.setAttribute('width', settings['size']);
			canvas.setAttribute('height', settings['size']);
			canvas.className = settings['class'];
			
			// Insert canvas and remove meter.
			$(this).before(canvas)
					  //.remove();
					  .hide();
			
			// Drawing
			var context = canvas.getContext("2d");
			
			var scaleWidth = (settings['size'] / 8);
			var scaleDistanceFromEdge = 1 + (scaleWidth * 2);
			if (settings['drawDialFace']) {
				// Draw face
				context.fillStyle = "rgb(223, 249, 255)";
				context.strokeStyle = "rgb(0, 0, 0)";
				context.lineWidth = 1;
				context.beginPath();
				context.arc(settings['size'] / 2, settings['size'] / 2, ((settings['size'] - 2) / 2) - 1, Math.PI * 2, false);
				context.closePath();
				context.fill();
				context.stroke();
			
				// Draw area scale arc thing
				context.strokeStyle = "rgb(102, 203, 255)";
				context.lineWidth = scaleWidth;
				context.beginPath();
				context.arc(
					settings['size'] / 2, 
					settings['size'] / 2, 
					(settings['size'] - scaleDistanceFromEdge) / 2,  // radius
					Math.PI - (Math.PI / 4),
					(Math.PI * 2.25), 
					false
				);
				context.stroke();
				context.closePath();
			}
			
			// Rotate and draw needle
			var minValueRotationAngle = 0 - (Math.PI * 1.25);
			var maxValueRotationAngle = (Math.PI * 0.25);
			var currentValueRotationAngle = ((value - min) * (maxValueRotationAngle - minValueRotationAngle) / (max - min) + minValueRotationAngle);  // thanks to @vkornov for giving me this formula
			
			context.translate(settings['size'] / 2, settings['size'] / 2);  // Move origin (& rotation point) to center
			context.rotate(currentValueRotationAngle);  // Rotate by the appropriate angle
			
			context.strokeStyle = "rgb(0, 0, 0)";
			context.lineWidth = 4;
			context.beginPath()
			context.moveTo(0, 0);  // Get into middle
			context.lineTo((settings['size'] / 2) - (scaleWidth), 0);
			context.closePath();
			context.stroke();
			
			// Draw middle bit
			context.fillStyle = "rgb(145, 145, 145)";
			context.strokeStyle = "rgb(0, 0, 0)";
			context.lineWidth = 1;
			context.beginPath();
			context.arc(0, 0, (settings['size']) / 12, Math.PI * 2, false);
			context.closePath();
			context.fill();
			context.stroke();
		});
	
	};
})(jQuery);

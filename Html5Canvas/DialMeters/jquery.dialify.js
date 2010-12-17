(function($){
	$.fn.dialify = function(options) {
	
		// sort out some defaults
		var settings = {
			'size': 100,							// Size (width and height) to draw the canvas
			'class': 'meter',						// Class(es) to add to the canvas
			'drawDialFace': 'true',					// Should the dial face (and scale area) be drawn?
			'pointerWidth': 4,						// Thickness of pointer
			'pointerRotationPoint': 				// The point at which the pointer rotates (from top left)
				{ 'x': null , 'y': null },
			'pointerRange': 						// The angle range in radians (where 0 = 3 o'clock position)
				{ 'min': null, 'max': null },
			'scaleArcRadius': null,					// Radius of the outer edge of the dial scale
			'pointerLength': null					// Length of the pointer (from centre point to end)
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
		
			// Create canvas
			canvas = document.createElement('canvas');
			canvas.setAttribute('width', settings['size']);
			canvas.setAttribute('height', settings['size']);
			canvas.className = settings['class'];
			
			// Insert canvas and remove meter.
			$(this).before(canvas)
			       .hide();
			
			// Drawing
			var context = canvas.getContext("2d");
			
			// Set min and max rotation angle
			var minValueRotationAngle = 
				_ifNull(settings['pointerRange']['min'], (0 - (Math.PI * 1.25)));
			var maxValueRotationAngle = 
				_ifNull(settings['pointerRange']['max'], (Math.PI * 0.25));
				
			// Set pointer rotation point
			var pointerRotationPointX = 
				_ifNull(settings['pointerRotationPoint']['x'], settings['size'] / 2);
			var pointerRotationPointY = 
				_ifNull(settings['pointerRotationPoint']['y'], settings['size'] / 2);
			
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
			}
			
			// Draw area scale arc thing
			var scaleArcRadius = settings['scaleArcRadius'];
			if (scaleArcRadius == null) {
				scaleArcRadius = (settings['size'] - scaleDistanceFromEdge) / 2;
			} else {
				scaleArcRadius -= (scaleWidth / 2);
			}
			
			context.translate(pointerRotationPointX, pointerRotationPointY);  // Move origin to rotation point
			
			if (settings['drawDialFace']) {
				context.strokeStyle = "rgb(102, 203, 255)";
				context.lineWidth = scaleWidth;
				context.beginPath();
				context.arc(
					0,//settings['size'] / 2, 
					0,//settings['size'] / 2, 
					//(settings['size'] - scaleDistanceFromEdge) / 2,  // radius
					scaleArcRadius,
					minValueRotationAngle, 
					maxValueRotationAngle,
					false
				);
				context.stroke();
				context.closePath();
			}
			
			// Calculate pointer length
			var pointerLength = _ifNull(settings['pointerLength'], scaleArcRadius);
			
			// Rotate and draw needle
			var currentValueRotationAngle = ((value - min) * (maxValueRotationAngle - minValueRotationAngle) / (max - min) + minValueRotationAngle);  // thanks to @vkornov for giving me this formula
				
			//context.translate(pointerRotationPointX, pointerRotationPointY);  // Move origin to rotation point
			context.rotate(currentValueRotationAngle);  // Rotate by the appropriate angle
			
			context.strokeStyle = "rgb(0, 0, 0)";
			context.lineWidth = 4;
			context.beginPath()
			context.moveTo(0, 0);  // Get into middle
			context.lineTo(pointerLength, 0);
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
	
	
		// Helper methods
		function _ifNull(value, ifNullResult) {
			if (value === null || value === undefined)
				return ifNullResult;
			return value;
		}
	};
})(jQuery);

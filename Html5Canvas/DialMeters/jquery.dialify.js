(function($){
	$.fn.dialify = function(options) {
	
		// sort out some defaults
		var settings = {
			// Canvas options
			'width': 100,							// Width of the canvas
			'height': 100,							// Height of the canvas
			'class': 'dialify-meter',				// Class(es) to add to the canvas
			
			// Drawing options *
			'drawDialFace': true,					// Should the dial face (and scale area) be drawn?
			'scaleArcRadius': null,					// Radius of the outer edge of the dial scale
			'drawSpindle': true,					// Should the spindle thing in the middle be drawn?
			
			// Colours *
			'dialFaceColor': '#FFF',
			'dialOutlineColor': '#000',
			'scaleRangeColor': '#DDD',
			'pointerColor': '#000',
			'spindleColor': '#999',
			'spindleOutlineColor': '#000',
			
			// Pointer options
			'pointerWidth': 4,						// Thickness of pointer
			'pointerRotationPoint': 				// The point at which the pointer rotates (from top left)
				{ 'x': null , 'y': null },
			'pointerRange': 						// The angle range in radians (where 0 = 3 o'clock position)
				{ 'min': null, 'max': null },
			'pointerLength': null,					// Length of the pointer (from centre point to end)
			
			// Use a custom image to build up the dial (cancels out starred options)
			'image': null
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
			
			var smallestDimension = 
				(settings['width'] > settings['height']) ? 
				settings['height'] : 
				settings['width'];
		
			// Create canvas
			canvas = document.createElement('canvas');
			canvas.setAttribute('width', settings['width']);
			canvas.setAttribute('height', settings['height']);
			canvas.className = settings['class'];
			
			// Insert canvas and remove meter.
			$(this).before(canvas)
			       .hide();
			
			// Drawing
			var context = canvas.getContext("2d");
			
			// Load in image if we need to
			var img = new Image();
			img.src = settings['image'];
			// Erm... going to have to wait for it to load. Need big refactor.
			
			
			// Set min and max rotation angle
			var minValueRotationAngle = 
				_ifNull(settings['pointerRange']['min'], (0 - (Math.PI * 1.25)));
			var maxValueRotationAngle = 
				_ifNull(settings['pointerRange']['max'], (Math.PI * 0.25));
				
			// Set pointer rotation point
			var pointerRotationPointX = 
				_ifNull(settings['pointerRotationPoint']['x'], settings['width'] / 2);
			var pointerRotationPointY = 
				_ifNull(settings['pointerRotationPoint']['y'], settings['height'] / 2);
			
			var scaleWidth = (smallestDimension / 8);
			var scaleDistanceFromEdge = 1 + (scaleWidth * 2);
			if (settings['drawDialFace'] && !settings['image']) {
				// Draw face
				context.fillStyle = settings['dialFaceColor'];
				context.strokeStyle = settings['dialOutlineColor'];
				context.lineWidth = 1;
				context.beginPath();
				context.arc(settings['width'] / 2, settings['height'] / 2, ((smallestDimension - 2) / 2) - 1, Math.PI * 2, false);
				context.closePath();
				context.fill();
				context.stroke();
			} else {
				context.drawImage()
			}
			
			// Draw area scale arc thing
			var scaleArcRadius = settings['scaleArcRadius'];
			if (scaleArcRadius == null) {
				scaleArcRadius = (smallestDimension - scaleDistanceFromEdge) / 2;
			} else {
				scaleArcRadius -= (scaleWidth / 2);
			}
			
			context.translate(pointerRotationPointX, pointerRotationPointY);  // Move origin to rotation point
			
			if (settings['drawDialFace'] && !settings['image']) {
				context.strokeStyle = settings['scaleRangeColor'];
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
			
			// Rotate for needle
			var currentValueRotationAngle = ((value - min) * (maxValueRotationAngle - minValueRotationAngle) / (max - min) + minValueRotationAngle);  // thanks to @vkornov for giving me this formula
				
			//context.translate(pointerRotationPointX, pointerRotationPointY);  // Move origin to rotation point
			context.rotate(currentValueRotationAngle);  // Rotate by the appropriate angle
			
			if (!settings['image']) {
				context.strokeStyle = settings['pointerColor'];
				context.lineJoin = "round";
				context.lineWidth = 4;
				context.beginPath()
				context.moveTo(0, 0);  // Get into middle
				context.lineTo(pointerLength, 0);
				context.closePath();
				context.stroke();
			}
			
			// Draw middle bit
			if (settings['drawSpindle'] && !settings['image']) {
				context.fillStyle = settings['spindleColor'];
				context.strokeStyle = settings['spindleOutlineColor'];
				context.lineWidth = 1;
				context.beginPath();
				context.arc(0, 0, (smallestDimension) / 12, Math.PI * 2, false);
				context.closePath();
				context.fill();
				context.stroke();
			}
		});
	
	
		// Helper methods
		function _ifNull(value, ifNullResult) {
			if (value === null || value === undefined)
				return ifNullResult;
			return value;
		}
	};
})(jQuery);

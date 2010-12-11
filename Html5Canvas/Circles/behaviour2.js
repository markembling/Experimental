$(function() {
	var canvas = $("#canvas");
	var context = canvas.get(0).getContext("2d");
	var circles = [];
	
	var x = 100;	
	
	function randomColour() {
		var r = randomFromTo(20, 80);
		var g = randomFromTo(30, 120);
		var b = randomFromTo(40, 120);
		return new Colour(r, g, b, 0.5);
	}
	
	function generateCircle() {
		var circle = new Circle();
			
		circle.colour = randomColour();
		
		circle.xMovementStep = randomFromTo(-6, 6);
		circle.yMovementStep = randomFromTo(-6, 6);
		
		circle.radius = randomFromTo(1, 6);			
		circle.x = Math.floor(canvas.width() / 2);
		circle.y = Math.floor(canvas.height() / 2);
		
		return circle;
	}
	
	function generateCircles(count) {
		for (var i = 0; i < count; i++) {
			circles.push(generateCircle());
		}
	}

	function clearCanvas() {
		context.clearRect(0, 0, canvas.width(), canvas.height());
	}
	
	function animateCircles() {
		clearCanvas();
		
		for (var i in circles) {
			var circle = circles[i];
			
			if (circle !== null) {
				circle.move();
				circle.draw(context);
				
				// Start the fading of nearly-old ones getting near the edge
				if (circle.x >= (canvas.width() - circle.radius - 60) || circle.x <= (0 + circle.radius + 60) || 
					circle.y >= (canvas.height() - circle.radius - 60) || circle.y <= (0 + circle.radius + 60)) {
					
					circle.fadeOut();
				}
				
				// Kill old ones right at the edge
				if (circle.x >= (canvas.width() - circle.radius) || circle.x <= (0 + circle.radius) || 
					circle.y >= (canvas.height() - circle.radius) || circle.y <= (0 + circle.radius)) {
					
					circles[i] = null;
					circles.push(generateCircle());
				}
			}
		}
		
		// Remove all the killed ones from the circles array
		removeFromArrayMatching(circles, null);
	}
	
	generateCircles(30);
	setInterval(function(){
		animateCircles();
	}, 50);
	
});


function Circle() {
	this.x;
	this.y;
	this.radius;
	this.xMovementStep;
	this.yMovementStep;
	this.colour;
	this._isFading = false;
	
	this.move = function() {
		this.x += this.xMovementStep;
		this.y += this.yMovementStep;
	}
	
	this.draw = function(context) {
		// increase radius
		//this.radius *= 1.04;
		this.radius += 0.5;
		
		// Fading...
		if (this._isFading)
			this._performFade();
	
		context.fillStyle = this.colour.toString();
		context.beginPath();
		// x, y, radius, start angle, end angle, anticlockwise?
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		context.closePath();
		context.fill();
	}
	
	this.fadeOut = function() {
		this._isFading = true;
	}
	
	this._performFade = function() {
		if (this.colour.a > 0) {
			this.colour.a = Math.round((this.colour.a - 0.04) * 100) / 100;
		} else {
			this.colour.a = 0;
		}
	}
}

function Colour(r, g, b, a) {
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
	
	this.toString = function() {
		return "rgba(" + this.r + "," + this.g + "," + this.b + ", " + this.a + ")";
	}
}

function randomFromTo(from, to){
	return Math.floor(Math.random() * (to - from + 1) + from);
}

// http://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript
/*Array.prototype.removeMatching = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};*/
function removeFromArrayMatching(fromArray, deleteValue) {
	for (var i = 0; i < fromArray.length; i++) {
		if (fromArray[i] == deleteValue) {
			fromArray.splice(i, 1);
			i--;
		}
	}
};
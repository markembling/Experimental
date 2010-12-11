$(function() {
	var canvas = $("#canvas");
	var context = canvas.get(0).getContext("2d");
	var circles = [];
	
	var x = 100;	
	
	function randomColor() {
		var r = randomFromTo(80, 220);
		var g = randomFromTo(80, 220);
		var b = randomFromTo(80, 220);
		return "rgb(" + r + "," + g + "," + b + ")";
	}
	
	function generateCircles() {
		for (var i = 0; i < 40; i++) {
			circle = new Circle();
			//circle.name = i;
			
			circle.color = randomColor();
			circle.movementStep = randomFromTo(2, 8);
			
			circle.xDirection = (randomFromTo(0,1) == 1);
			
			circle.radius = randomFromTo(6, 18);
			circle.x = randomFromTo(circle.radius * 2, canvas.width() - (circle.radius * 2));
			//circle.y = 20 + (i * 10);
			circle.y = randomFromTo(circle.radius * 2, canvas.height() - (circle.radius * 2));
			
			circles.push(circle);
		}
	}

	function clearCanvas() {
		context.clearRect(0, 0, canvas.width(), canvas.height());
	}
	
	function animateCircles() {
		clearCanvas();
		
		for (var i in circles) {
			var circle = circles[i];
		
			circle.move();
			circle.draw(context);
			
			if (((circle.x + circle.radius) >= canvas.width()) || ((circle.x - circle.radius) <= 0)) {
				circle.changeXDirection();
			}
			
			if (((circle.y + circle.radius) >= canvas.width()) || ((circle.y - circle.radius) <= 0)) {
				circle.changeYDirection();
			}
		}
	}
	
	generateCircles();
	setInterval(function(){
		animateCircles();
	}, 60);
	
});


function Circle() {
	this.x;
	this.y;
	this.radius;
	this.xDirection = true;
	this.yDirection = true;
	this.movementStep = 4;
	this.color;
	this.name = "none";
	
	this.changeXDirection = function() {
		this.xDirection = !this.xDirection;
	}
	
	this.changeYDirection = function() {
		this.yDirection = !this.yDirection;
	}
	
	this.move = function() {
		if (this.xDirection) {
			this.x += this.movementStep;
		} else {
			this.x -= this.movementStep;
		}
		
		if (this.yDirection) {
			this.y += this.movementStep;
		} else {
			this.y -= this.movementStep;
		}
	}
	
	this.draw = function(context) {
		context.fillStyle = this.color;
		context.beginPath();
		// x, y, radius, start angle, end angle, anticlockwise?
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		context.closePath();
		context.fill();
		
		/*context.fillStyle = "#FFF";
		context.fillText(this.name, this.x, this.y);*/
	}
}

function randomFromTo(from, to){
	return Math.floor(Math.random() * (to - from + 1) + from);
}

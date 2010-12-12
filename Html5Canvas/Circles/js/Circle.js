function Circle() {
	this.x;
	this.y;
	this.radius;
	this.xMovementStep;
	this.yMovementStep;
	this.colour;
	this._isFading = false;
	this._fullyFaded = false;
	
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
	
	this.hasFaded = function() {
		return this._fullyFaded;
	}
	
	this._performFade = function() {
		if (this.colour.a > 0) {
			this.colour.a = Math.round((this.colour.a - 0.04) * 100) / 100;
		} else {
			this.colour.a = 0;
			this._fullyFaded = true;
		}
	}
}

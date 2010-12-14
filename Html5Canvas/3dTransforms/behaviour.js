function Circle() {
	this.canvas = 1;
	this.x;
	this.y = 0;
	this.radius;
	this.speed;
	this.color;
	
	this.draw = function(context) {
		context.fillStyle = this.color;
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		context.closePath();
		context.fill();
	}
}

var boxAnimationInterval = null;
var canvasAnimationInterval = null;

// Yes, these were manually input...!
var beatCount = 0;
var BREAKDOWNS = [
	{ s: 224, e: 225 },
	{ s: 228, e: 238 },
	{ s: 242, e: 247 },
	{ s: 250, e: 255 }
];

$(function(){
	var circles = [];
	var canvases = $('canvas');

	function animateCanvases() {
		clearCanvases();  // clear all canvases
	
		for (var i = 0; i < circles.length; i++) {
			circles[i].y += circles[i].speed;  // move circles down 
			
			// See if it needs to move canvas
			if (circles[i].y - circles[i].radius >= 120) {
				// Reset y co-ordinate to start at the top of the canvas again
				circles[i].y -= (120 + (circles[i].radius * 2));
				
				// Move to next canvas
				if (circles[i].canvas >= 9)
					circles[i].canvas -= 8;
				else
					circles[i].canvas += 4;
			}
			
			var theContextForThisCircle = 
				$('canvas#box' + circles[i].canvas + '').get(0).getContext('2d');
			circles[i].draw(theContextForThisCircle);
		}
		
	}
	
	function clearCanvases() {
		canvases.each(function(i,v) {
			v.getContext('2d').clearRect(0, 0, 100, 120);
		});
	}

	// Flip flop
	function animateBoxes() {
		// Make sure we aren't in a breakdown section
		var inBreakdown = false;
		for (var i in BREAKDOWNS) {
			var b = BREAKDOWNS[i];
			
			if (beatCount >= b.s && beatCount <= b.e)
				inBreakdown = true;
		}
		
		if (! inBreakdown) {
			jQuery.each(canvases, function(i, x){  
				var randomFlipState = randomFromTo(0, 2);
				var thisBox = $(x);
				if (randomFlipState == 0) {
					thisBox.removeClass('flipped1');
					thisBox.removeClass('flipped2');
				} else if (randomFlipState == 1) {
					thisBox.addClass('flipped1');
					thisBox.removeClass('flipped2');
				} else {
					thisBox.addClass('flipped2');
					thisBox.removeClass('flipped1');
				}
			});
		}
		
		beatCount++;
	}

	function generateCircles() {
		for (var i = 0; i < 40; i++) {
			var c = new Circle();
			c.x = randomFromTo(0, 100);
			c.radius = randomFromTo(1, 25);
			c.speed = randomFromTo(1,7);
			c.canvas = Math.floor(i / 10) + 1;
			c.color = 'rgba(' + randomFromTo(50,255) + ','+randomFromTo(50,255)+', '+randomFromTo(50,255)+', 0.6)';
		
			circles.push(c);
		}
	}
	
	// When it's ready to play, do so
	$('#music').bind('canplay', function() {
		var music = $('#music').get(0);
		if (! music.ended)
			music.play();
	});
	
	// On play, start the action
	$('#music').bind('play', function() {
		$('#status').fadeOut();  // Hide status
		$('canvas').removeClass('faded');  // Unfade canvases
		
		// Canvas animation
		canvasAnimationInterval = setInterval(function() {
			animateCanvases();
		}, 40);
		
		// Box animation and timing
		var beatDuration = 461;
		var introLength = 4300;
		setTimeout(function() {
			boxAnimationInterval = setInterval(function() { animateBoxes(); }, beatDuration);
			$('#stop').show();
		}, introLength - beatDuration);
		
		$('#start').hide();
		$('#stop').hide();
	});
	
	$('#music').bind('pause', stopAction);
	$('#music').bind('ended', stopAction);
	$('#music').bind('stalled', function() { status('There seems to be a problem loading the music...'); });
	$('#music').bind('suspend', function() { status('Stopped trying to load music.'); });
	$('#music').bind('error', function() { status('There was an error loading/playing the music.'); });
	
	// Show status message
	function status(message) {
		$('#status').text(message)
		            .fadeIn();
	}
	
	// Stop all the action
	function stopAction() {
		clearInterval(boxAnimationInterval);
		clearInterval(canvasAnimationInterval);
		clearCanvases();
		$('canvas').addClass('faded');
		beatCount = 0;
		
		$('#stop').hide();
		$('#start').show();
	}
	
	// Control events
	$('#stop a').click(function(){
		var music = $('#music').get(0);
		music.pause();
		music.currentTime = 0;
		
		return false;
	});
	
	$('#start a').click(function(){
		$('#music').get(0).play();
		
		return false;
	});
	
	// Generate a random number between the lowest and highest (inclusive)
	function randomFromTo(from, to){
		return Math.floor(Math.random() * (to - from + 1) + from);
	}
	
	//  init
	generateCircles();
});

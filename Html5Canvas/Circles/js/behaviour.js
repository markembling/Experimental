// The music we have to choose from...
var music = [
	{ credit: 'Freedom Is Me by <a href="http://dig.ccmixter.org/dig?user=scottaltham">scottaltham</a>', 
	  ogg: 'http://assets.markembling.info/experiments/canvas-circles/music/ogg/freedom-is-me.ogg', 
	  mp3: 'http://assets.markembling.info/experiments/canvas-circles/music/mp3/freedom-is-me.mp3' },
	{ credit: 'Without LOVE by <a href="http://dig.ccmixter.org/dig?user=Loveshadow">Loveshadow</a>', 
	  ogg: 'http://assets.markembling.info/experiments/canvas-circles/music/ogg/without-love.ogg', 
	  mp3: 'http://assets.markembling.info/experiments/canvas-circles/music/mp3/without-love.mp3' },
	{ credit: 'The Sweetest Sin by <a href="http://dig.ccmixter.org/dig?user=Loveshadow">Loveshadow</a>', 
	  ogg: 'http://assets.markembling.info/experiments/canvas-circles/music/ogg/the-sweetest-sin.ogg', 
	  mp3: 'http://assets.markembling.info/experiments/canvas-circles/music/mp3/the-sweetest-sin.mp3' },
	{ credit: 'Glow by <a href="http://dig.ccmixter.org/dig?user=gurdonark">Gurdonark</a>', 
	  ogg: 'http://assets.markembling.info/experiments/canvas-circles/music/ogg/glow.ogg', 
	  mp3: 'http://assets.markembling.info/experiments/canvas-circles/music/mp3/glow.mp3' },
	
	// Earth by zero-project
	{ credit: '<a href="http://www.jamendo.com/en/track/373259">Killing Earth</a> by <a href="http://www.jamendo.com/en/artist/zero-project">zero-project</a>', 
	  ogg: 'http://assets.markembling.info/experiments/canvas-circles/music/ogg/earth_01.ogg', 
	  mp3: 'http://assets.markembling.info/experiments/canvas-circles/music/mp3/earth_01.mp3' },
	{ credit: '<a href="http://www.jamendo.com/en/track/373268">Still Breathing</a> by <a href="http://www.jamendo.com/en/artist/zero-project">zero-project</a>', 
	  ogg: 'http://assets.markembling.info/experiments/canvas-circles/music/ogg/earth_02.ogg', 
	  mp3: 'http://assets.markembling.info/experiments/canvas-circles/music/mp3/earth_2.mp3' },
	{ credit: '<a href="http://www.jamendo.com/en/track/373287">Millenium Sunset</a> by <a href="http://www.jamendo.com/en/artist/zero-project">zero-project</a>', 
	  ogg: 'http://assets.markembling.info/experiments/canvas-circles/music/ogg/earth_03.ogg', 
	  mp3: 'http://assets.markembling.info/experiments/canvas-circles/music/mp3/earth_03.mp3' },
	{ credit: '<a href="http://www.jamendo.com/en/track/373290">Earthbeat</a> by <a href="http://www.jamendo.com/en/artist/zero-project">zero-project</a>', 
	  ogg: 'http://assets.markembling.info/experiments/canvas-circles/music/ogg/earth_04.ogg', 
	  mp3: 'http://assets.markembling.info/experiments/canvas-circles/music/mp3/earth_04.mp3' },
	{ credit: '<a href="http://www.jamendo.com/en/track/373293">Distorted Reality</a> by <a href="http://www.jamendo.com/en/artist/zero-project">zero-project</a>', 
	  ogg: 'http://assets.markembling.info/experiments/canvas-circles/music/ogg/earth_05.ogg', 
	  mp3: 'http://assets.markembling.info/experiments/canvas-circles/music/mp3/earth_05.mp3' },
	{ credit: '<a href="http://www.jamendo.com/en/track/373300">Ephemeral Living</a> by <a href="http://www.jamendo.com/en/artist/zero-project">zero-project</a>', 
	  ogg: 'http://assets.markembling.info/experiments/canvas-circles/music/ogg/earth_06.ogg', 
	  mp3: 'http://assets.markembling.info/experiments/canvas-circles/music/mp3/earth_06.mp3' },
	{ credit: '<a href="http://www.jamendo.com/en/track/373302">Epilogue</a> by <a href="http://www.jamendo.com/en/artist/zero-project">zero-project</a>', 
	  ogg: 'http://assets.markembling.info/experiments/canvas-circles/music/ogg/earth_07.ogg', 
	  mp3: 'http://assets.markembling.info/experiments/canvas-circles/music/mp3/earth_07.mp3' }
];

$(function() {
	var generating = false;
	var audioPlaying = false;
	
	var canvas = $("#canvas");
	var context = canvas.get(0).getContext("2d");
	var canvasWidth, canvasHeight;
	var circles = [];
	
	// Button events
	$("#start a").click(function(){ 
		startAll();
		return false;
	});
	
	$("#stop a").click(function(){ 
		stopAll();
		return false;
	});
	
	$("#more a").click(function(){
		if (generating)
			generateCircles(10);
		
		return false;
	});
	
	$("#start-music a, #change-music a").click(function(){
		randomMusic();
		return false;
	});
	
	$("#stop-music a").click(function(){
		stopMusic();
		return false;
	});
	
	$("#about a").click(function(){
		$("#description").show();
		return false;
	});
	
	$("#about-close").click(function(){
		$("#description").hide();
		return false;
	});
	
	// Canvas sizing
	function resizeCanvas() {
		canvas.attr({ height: $(window).height(), width: $(window).width() });
		canvasWidth = canvas.width();
		canvasHeight = canvas.height();
	}
	
	// Music
	function randomMusic() {
		var choice = music[randomFromTo(0, music.length - 1)];
		var audio = $('#music');

		$('#music-credit').html(choice.credit);

		// Determine format
		var canPlayType = audio.get(0).canPlayType("audio/ogg");
		var musicFile = '';
		if (canPlayType.match(/maybe|probably/i)) {
			musicFile = choice.ogg;
		} else {
			musicFile = choice.mp3;
		}

		audio.attr('src', musicFile);
		audio.get(0).play();
		
		audioPlaying = true;
		
		$("#start-music").hide();
		$("#stop-music").show();
		$("#change-music").show();
	}

	function stopMusic() {
		$('#music').get(0).pause();
		$('#music-credit').text('none playing');
		
		audioPlaying = false;
		
		$("#start-music").show();
		$("#stop-music").hide();
		$("#change-music").hide();
	}
	
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
		circle.x = Math.floor(canvasWidth / 2);
		circle.y = Math.floor(canvasHeight / 2);
		
		return circle;
	}
	
	function generateCircles(count) {
		for (var i = 0; i < count; i++) {
			circles.push(generateCircle());
		}
	}

	function clearCanvas() {
		context.clearRect(0, 0, canvasWidth, canvasHeight);
	}
	
	// Fade all circles away immediately
	function fadeAllCircles() {
		for (var i in circles) {
			var circle = circles[i];
			circle.fadeOut();
		}
	}
	
	function startAll() {
		generating = true; 
		generateCircles(30);
		
		randomMusic();
		
		$("#start").hide();
		$("#stop").show();
		$("#more").show();
		
		$("#music-menu, #music-separator").show();
	}
	
	function stopAll() {
		generating = false;
		fadeAllCircles();
		
		stopMusic();
		
		$("#stop").hide();
		$("#more").hide();
		$("#start").show();
		
		$("#music-menu, #music-separator").hide();
	}
	
	function animateCircles() {
		if (circles.length == 0) return;  // Do nothing if there is nothing to do ;)

		clearCanvas();
		for (var i = 0; i < circles.length; i++) {
			var circle = circles[i];
			
			circle.move();
			circle.draw(context);
			
			// Pre-calculate some stuff so we don't do it more than once
			var xLeftEdge = yTopEdge = /* 0 + */circle.radius;
			var xRightEdge = canvasWidth - circle.radius;
			var yBottomEdge = canvasHeight - circle.radius;
			
			if (circle.x >= xRightEdge || circle.x <= xLeftEdge || 
				circle.y >= yBottomEdge || circle.y <= yTopEdge || 
				circle.hasFaded()) {
				// Kill old ones right at the edge (or those fully faded):
				// remove this circle and decrement i (so we don't skip anything)
				circles.splice(i, 1);
				i--;
				
				if (generating)
					circles.push(generateCircle());
			} else if (circle.x >= (xRightEdge - 60) || circle.x <= (xLeftEdge + 60) || 
				       circle.y >= (yBottomEdge - 60) || circle.y <= (yTopEdge + 60)) {
				// Start the fading of nearly-old ones getting near the edge
				circle.fadeOut();
			}
		}
	}
	
	$(window).resize(resizeCanvas);
	
	// Change the music when the audio 'ended' event is fired.
	$('#music').bind('ended', function() {
		randomMusic();
	});
	
	// Init
	resizeCanvas();
	startAll();
	setInterval(function(){
		animateCircles();
	}, 50);
});

// Generate a random number between the lowest and highest (inclusive)
function randomFromTo(from, to){
	return Math.floor(Math.random() * (to - from + 1) + from);
}

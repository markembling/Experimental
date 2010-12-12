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
		canvas.attr("width", $(window).width());
		canvas.attr("height", $(window).height());
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
		if (circles.length == 0) return;

		
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
				
				// Kill old ones right at the edge (or those fully faded)
				if (circle.x >= (canvas.width() - circle.radius) || circle.x <= (0 + circle.radius) || 
					circle.y >= (canvas.height() - circle.radius) || circle.y <= (0 + circle.radius) || 
					circle.hasFaded()) {
					
					circles[i] = null;
					
					if (generating)
						circles.push(generateCircle());
				}
			}
		}
		
		// Remove all the killed ones from the circles array
		removeFromArrayMatching(circles, null);
		
		// Change music if necessary
		if (audioPlaying && $('#music').get(0).ended) {
			randomMusic();
		}
	}
	
	// Init
	resizeCanvas();
	startAll();
	setInterval(function(){
		animateCircles();
	}, 50);
	
	$(window).resize(function() { 
		resizeCanvas();
	});
});

// Generate a random number between the lowest and highest (inclusive)
function randomFromTo(from, to){
	return Math.floor(Math.random() * (to - from + 1) + from);
}

// Technique from: http://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript
function removeFromArrayMatching(fromArray, deleteValue) {
	for (var i = 0; i < fromArray.length; i++) {
		if (fromArray[i] == deleteValue) {
			fromArray.splice(i, 1);
			i--;
		}
	}
};
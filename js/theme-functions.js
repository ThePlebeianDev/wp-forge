/* @version 6.4.3 */
jQuery(document).foundation();
	// contain-to-grid functionality
	jQuery(window).on('load scroll resize orientationChange', function () { 
		var stickyMenu = jQuery('.header_container').outerHeight(true); 
		if (jQuery(window).scrollTop() > stickyMenu) { 
			jQuery('.contain-to-grid').addClass('fixed'); 
		} 
		else { 
			jQuery('.contain-to-grid').removeClass('fixed'); 
		} 
	});

	// Add button class submit buttons in the theme
	jQuery('input[type="submit"]').addClass('button');
  	jQuery('.comment-reply-link').addClass('secondary label radius');
  	jQuery('#cancel-comment-reply-link').addClass('alert label radius');
	// make sure embedded content maintains its aspect ratio as the width of the screen changes - http://foundation.zurb.com/sites/docs/responsive-embed.html
	jQuery('iframe[src*="youtube.com"],iframe[src*="vimeo.com"],iframe[src*="dailymotion.com"],iframe[src*="videopress.com"]').wrap('<div class="responsive-embed widescreen" />');
	// BackToTop Button: Controls the fade in of the BacktoTop Button
	jQuery(window).load(function() {
		jQuery("#topofpage").hide().removeAttr("href");
		if (jQuery(window).scrollTop() != "0")
			jQuery("#backtotop").fadeIn("slow")
		var scrollDiv = jQuery("#backtotop");
		jQuery(window).scroll(function(){
			if (jQuery(window).scrollTop() == "0")
				jQuery(scrollDiv).fadeOut("slow")
			else
				jQuery(scrollDiv).fadeIn("slow")
		});
	});
	// BacktoTop
	jQuery('#backtotop').click(function(){
		jQuery('html, body').animate({
		scrollTop: jQuery('body').offset().top
		}, 1000); // Change this value to control the speed of the scroll back to the top of the page.
	});
	// Remove empty P tags created by WP inside of Accordion and Orbit - Thanks to JointsWP - added 6.1.1
	jQuery('.accordion p:empty, .accordion br, .orbit p:empty, .orbit br').remove();
	// Add clearfix class to gallery
	jQuery('.gallery').addClass('clearfix');










//ninivert, September 2016 js for header
/*VARIABLES*/

canvas = document.getElementsByTagName('canvas')[0];
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

var ctx = canvas.getContext('2d');



/*Modify options here*/

//possible characters that will appear
var characterList = ['{}', ';', 'function', 'var', 'let', 'const', 'array[]'];

//stocks possible character attributes
var layers = {
    n: 5, //number of layers
    letters: [200, 80, 60, 40, 20], //letters per layer (starting from the deepest layer)
    coef: [0.1, 0.2, 0.4, 0.6, 0.8], //how much the letters move from the mouse (starting from the deepest layer)
    size: [16, 22, 36, 40, 46], //font size of the letters (starting from the deepest layer)
    color: ['#fff', '#eee', '#ccc', '#bbb', '#aaa'], //color of the letters (starting from the deepest layer)
    font: 'Courier' //font family (of every layer)
};

/*End of options*/



var characters = [];
var mouseX = document.body.clientWidth/2;
var mouseY = document.body.clientHeight/2;

var rnd = {
    btwn: function(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    },
    choose: function(list) {
        return list[rnd.btwn(0, list.length)];
    }
};



/*LETTER DRAWING*/

function drawLetter(char) {
    ctx.font = char.size + 'px ' + char.font;
    ctx.fillStyle = char.color;
    
    var x = char.posX + (mouseX-canvas.width/2)*char.coef;
    var y = char.posY + (mouseY-canvas.height/2)*char.coef;

    ctx.fillText(char.char, x, y);
}



/*ANIMATION*/

document.onmousemove = function(ev) {
    mouseX = ev.pageX - canvas.offsetLeft;
    mouseY = ev.pageY - canvas.offsetTop;

    if (window.requestAnimationFrame) {
        requestAnimationFrame(update);
    } else {
        update();
    }
};

function update() {
    clear();
    render();
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function render() {
    for (var i = 0; i < characters.length; i++) {
        drawLetter(characters[i]);
    }
}



/*INITIALIZE*/

function createLetters() {
    for (var i = 0; i < layers.n; i++) {
        for (var j = 0; j < layers.letters[i]; j++) {

            var character = rnd.choose(characterList);
            var x = rnd.btwn(0, canvas.width);
            var y = rnd.btwn(0, canvas.height);

            characters.push({
                char: character,
                font: layers.font,
                size: layers.size[i],
                color: layers.color[i],
                layer: i,
                coef: layers.coef[i],
                posX: x,
                posY: y
            });

        }
    }
}

createLetters();
update();



/*REAJUST CANVAS AFTER RESIZE*/

window.onresize = function() {
    location.reload();
};

// end loading all functions
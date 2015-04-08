/*!
 * Start Bootstrap - Agency Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Event tracking for google analytics
// inspired by http://cutroni.com/blog/2012/02/21/advanced-content-tracking-with-google-analytics-part-1/
var timer = 0;
var callBackTime = 700;
var debugTracker = true; //set this to false in production
var currentItem = "";
var score = 0;
var order = 1;
// update score (number of seconds in active view)
Visibility.every(1000, function () {
    score++;
});
function trackLocation() {
    if(!debugTracker) {
	ga('send', {
	    'hitType': 'event',
	    'eventCategory': 'Navigation (order)',
	    'eventAction': '#'+currentItem,
	    'eventValue': order
	});
	ga('send', {
	    'hitType': 'event',
	    'eventCategory': 'Duration (sec.)',
	    'eventAction': '#'+currentItem,
	    'eventValue': score
	});
    } else {
	console.log("You have viewed: #" + currentItem + " (order " + order + ", " + score + " sec.)");
    }
    // determine current location
    currentItem = $(".nav li.active > a").text();
    // reset score
    score = 0;
    order++;
}
$('body').on('activate.bs.scrollspy', function () {
    // Use a buffer so we don't call track location too often (high speed scroll)
    if (timer) clearTimeout(timer);
    timer = setTimeout(trackLocation, callBackTime);
})
window.onbeforeunload = function() {
    trackLocation();
    return null;
}

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

// Closes the Responsive Menu on Click outside Menu
$('body > *').not('nav').click(function() {
    if(!$('button.navbar-toggle').hasClass('collapsed')) {
        $('.navbar-toggle:visible').click();
    }
});

/* When DOM is loaded*/
$(document).ready(
		function() {
			// jQuery for page scrolling feature - requires jQuery Easing plugin
			$('a.page-scroll').bind('click', function(event) {
		        var $anchor = $(this);
		        $('html, body').stop().animate({
		            scrollTop: $($anchor.attr('href')).offset().top
		        }, 1500, 'easeInOutExpo');
		        event.preventDefault();
		    });
			
			// Highlight the top nav as scrolling occurs
			$('body').scrollspy({
			    target: '.navbar-fixed-top'
			})

			// Closes the Responsive Menu on Menu Item Click
			$('.navbar-collapse ul li a').click(function() {
			    $('.navbar-toggle:visible').click();
			});
			
			// hide preload
			$('.preloader').fadeOut(1000);
			
			// init typed.js
			$(".intro-lead-in-type").typed({
				strings: [ 
					"<b>3</b> ventes évènementielles par an",
					"partenariat avec votre CE.",
					"livraisons des végéaux toute l'année.", 
					"des végétaux différents tous les mois."
				],
				typeSpeed: 50,
				showCursor: false,
				loop: true,
				startDelay : 1000
			});
			
			// init wow.js
			new WOW( {
					mobile: false
			}).init();

		}
	);
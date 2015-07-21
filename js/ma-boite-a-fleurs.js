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

			// modal : load link passed in url
			// ex : if fragment is indexed in google, reload the entire page with modal opened
			var url = $.url();
			if(url.param('modal-url'))
			{

				$('#modal')
				// on hide : redirect to root page (with fragment if set)
				.on('hide.bs.modal', function (event) {
					// redirect to root
						window.location.href = url.attr('protocol') + '://'+ url.attr('host') + ':' + url.attr('port')  + url.attr('path') + '#' + url.attr('fragment');
					}
				)
				// use parameters in url
				.on('show.bs.modal', function (event) {
				  var button = $(event.relatedTarget) ;
				  var title = url.param('modal-title') ;
				  var href = url.param('modal-url') ;
				  var modal = $(this);
				  if($.trim(title))
				  {
					  modal.find('.modal-title').text(title);
				  }
				  if($.trim( href) )
				  {
					  modal.find('.modal-body').load(href +" #modal-target");
				  }

				})
				// display modal with url and title in parameter
				.modal('show');
			}
			else
			{
				// modal : default behaviour (on link clicked)
				$('#modal').on('show.bs.modal', function (event) {
					  var button = $(event.relatedTarget) ;
					  var title = button.data('title') ;
					  var href = button.attr('href');
					  var modal = $(this);
					  if($.trim(title))
					  {
						  modal.find('.modal-title').text(title);
					  }
					  if($.trim( href) )
					  {
							// replace .modal-body by #modal block in external page
						  modal.find('.modal-body').load(href +" #modal-target");
					  }

					}).on('hidden.bs.modal', function (event) {
						$(this).find('.modal-body').empty();
					}).modal('hide');
			}


			// init wow.js
			new WOW( {
					mobile: false
			}).init();

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
		}
	);

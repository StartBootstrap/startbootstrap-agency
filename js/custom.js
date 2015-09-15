/* When DOM is loaded*/
$(document).ready(
		function() {


		 function loadCss(filename) {
		     var l = document.createElement('link');
		     l.rel = 'stylesheet';
		     l.href = filename
		     var h = document.getElementsByTagName('head')[0];
		     h.parentNode.insertBefore(l, h);
		 }

     loadCss('//fonts.googleapis.com/css?family=Kaushan+Script:400,700|family=Montserrat:400,700|Droid+Serif:400,700,400italic,700italic|family=Roboto+Slab:400,100,300,700');

			// jQuery for page scrolling feature - requires jQuery Easing plugin
			$('a.page-scroll').bind('click', function(event) {
		        var $anchor = $(this);
		        $('html, body').stop().animate({
		            scrollTop: $($anchor.attr('href')).offset().top
		        }, 1500, 'easeInOutExpo');
		        event.preventDefault();
		    });

			// Closes the Responsive Menu on Menu Item Click
			$('.navbar-collapse ul li a').click(function() {
			    $('.navbar-toggle:visible').click();
			});

			// Highlight the top nav as scrolling occurs
			$('body').scrollspy({
			    target: '.navbar-fixed-top'
			})

      var preload = $('.preloader').clone();

			var modal = $('#modal')
			.on('hidden.bs.modal', function (event) {
				$(this).find('.modal-body').html(preload);
				}
			);

			function createmodal(popup,title,href)
			{
				if($.trim(title))
				{
					popup.find('.modal-title').html($.trim(title));
				}
				if($.trim( href) )
				{
					popup.find('.modal-body').load($.trim( href) +" #modal-target");
				}
			}

			if($.url().param('modal-url'))
			{
				// use parameters in url
				modal.on('show.bs.modal', function (event) {
					createmodal($(this),
											$.url().param('modal-title'),
											$.url().param('modal-url'));
						// dont check url after
						$(this).on('show.bs.modal', function (event) {
							  createmodal($(this),
														$(event.relatedTarget).attr('data-icon') + " " + $(event.relatedTarget).attr('title'),
														$(event.relatedTarget).attr('href'));
							})
				}).modal('show');
			}
			else
			{
				// modal : default behaviour (on link clicked)
				modal.on('show.bs.modal', function (event) {
					  createmodal($(this),
												$(event.relatedTarget).attr('data-icon') + " " + $(event.relatedTarget).attr('title'),
												$(event.relatedTarget).attr('href'));
					}).modal('hide');
			}

      // init magnify
      modal.on('shown.bs.modal', function (event) {
          $(this).find('[data-toggle="magnify"]').each(function () {
              $(this).magnify();
          })
      });

			// init swipe for mobile
      $("#header-carousel").swiperight(function() {
            $(this).carousel('prev');
      });
      $("#header-carousel").swipeleft(function() {
            $(this).carousel('next');
       });

			 // init wow.js
 			new WOW( {
 					mobile: false
 			}).init();

			/*
			 Initialisation du lasy
			*/
			$("img.lazy").show().lazyload({
				 threshold : 500
		 });

		 /*
		 	Preload caroussel img
		 */
		 $(".preload-img-bg").each(function()
				 {
					 var img = new Image();
					 img.src = $(this).css('background-image').replace(/^url\(['"]?/,'').replace(/['"]?\)$/,'');
				 }
	 		);

			/*
				Preload img after dom is ready
			*/
			 $("img.preload-img").each(function () {
					 $(this).attr('src', $(this).attr('data-original'));
			 });

			 // init lazy scripts
 			var js,
 				 fjs = document.getElementsByTagName('script')[0],
 				 addScript = function(url, id) {
 						 if (document.getElementById(id)) {return;}
 						 js = document.createElement('script');
 						 js.src = url;
 						 id && (js.id = id);
 						 fjs.parentNode.insertBefore(js, fjs);
 				 };

 	 		// Facebook SDK
 	 		addScript('//connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v2.4', 'facebook-jssdk');

		}
	);

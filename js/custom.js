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

      var preload = $('.preloader').clone();

			// preload
			$(this).find('.modal-body').html(preload)

			var modal = $('#modal')
			.on('hidden.bs.modal', function (event) {
				$(this).find('.modal-body').html(preload);
				}
			);

			function createmodal(popup,title,href)
			{
				if($.trim(title))
				{
					popup.find('.modal-title').html(title);
				}
				if($.trim( href) )
				{
					popup.find('.modal-body').load(href +" #modal-target");
				}
			}

			if($.url().param('modal-url'))
			{
				// use parameters in url
				modal.on('show.bs.modal', function (event) {
					createmodal($(this),
											$.url().param('modal-title'),
											$.url().param('modal-url'));
				// dont check url
				$(this).on('show.bs.modal', function (event) {
					  createmodal($(this),
												$(event.relatedTarget).attr('title'),
												$(event.relatedTarget).attr('href'));
					})
				}).modal('show');
			}
			else
			{
				// modal : default behaviour (on link clicked)
				modal.on('show.bs.modal', function (event) {
					  createmodal($(this),
												$(event.relatedTarget).attr('title'),
												$(event.relatedTarget).attr('href'));
					}).modal('hide');
			}

      // init magnify
      modal.on('shown.bs.modal', function (event) {
          $(this).find('[data-toggle="magnify"]').each(function () {
              $(this).magnify();
          })

					$(this).find("img.lazy").show().lazyload();
      });

			// init wow.js
			new WOW( {
					mobile: false
			}).init();

      $("#header-carousel").swiperight(function() {
            $(this).carousel('prev');
      });
      $("#header-carousel").swipeleft(function() {
            $(this).carousel('next');
       });

			 $("img.lazy").show().lazyload();

       // init lazy scripts
			 var js,
	 				fjs = document.getElementsByTagName('script')[0],
	 				add = function(url, id) {
	 						if (document.getElementById(id)) {return;}
	 						js = document.createElement('script');
	 						js.src = url;
	 						id && (js.id = id);
	 						fjs.parentNode.insertBefore(js, fjs);
	 				};

	 		// Facebook SDK
	 		add('//connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v2.4', 'facebook-jssdk');

		}
	);

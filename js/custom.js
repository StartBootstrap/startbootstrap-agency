// remove layer all times
setTimeout(function(){
  document.querySelectorAll('.preloader')[0].style.display = 'none';
}, 8000);

var preload = $('.preloader').clone();

$(window).load(function () {
    $('.preloader:first').fadeOut(1000);
});

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

			// init wow.js
			new WOW( {
					mobile: false
			}).init();

      $('#header-carousel').on('slide.bs.carousel', function () {
          //$('.header-fix-layer').fadeOut(1000);
      });
		}
	);

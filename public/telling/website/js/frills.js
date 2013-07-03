


$(document).ready(function() {

	$('.logo').click(function() {
		window.location.href="./"; // so there
	});

	$('.toggle-topbar').click(function() {
		$('.top-nav').toggleClass('expanded');
	});
	
	/* Grid: */
	$('.row').each(function() {
		if ($(this).find('.col-2').length == 2) {
			$(this).addClass('strict')
		}
	});
	
	
	/* videos: */
	$('.flex-video').fancypantsvideo({});
	
	
	
	$(window).resize(resizeHandler);
//	$(window).scroll(scrollHandler);

	/* works in IE7 and IE9, not in IE8.  Go figure */
	if (! (/Android|webOS|iPhone|iPad|iPod|BlackBerry|MSIE 8.0/i.test(navigator.userAgent))) {
		parallax();
	}

}); 


var resizeHandler = function() {
	$(window).trigger("scroll");

}

//var scrollHandler = function() {

//}


	$.widget('telling.fancypantsvideo', {
	
		options: {
		},
		
		_create: function() {
			var self = this;
			
			self.thumbnail = self.element.data("thumbnail") ? self.element.data("thumbnail") : "img/videothumbs/default.jpg" ;
			self.title = self.element.data("title") ? self.element.data("title") : "[Title Of Video Goes Here -- Missing Title]" ;
			
			self.placeholder =$('<div class="videoplaceholder"><div class="thumbnail"><div class="playindicator"></div></div><img class="decoration"><div class="videotitle"></div><div class="clearfix"></div>').insertAfter(self.element);

			var isalt = (self.element.closest('.alt').length ? "-alt" : "");
			var isbig = (self.placeholder.find('.decoration').width() > 600 ? "@2x" : "" );
			
			self.placeholder.find('.decoration').attr("src", "img/camera"+isalt + isbig + ".png");
			if (self.placeholder.find('.decoration').width() > 600) {
				self.placeholder.find('.decoration').css('marginTop','-25%');
			}
			self.placeholder.find('.videotitle').html(self.title);
			self.placeholder.find('.thumbnail').css("backgroundImage",'url("' + self.thumbnail+ '")');
			self.element.hide();
			
			// show the real video on click:
			self.placeholder.click(function() {
				// THIS WILL PROBABLY NEED TO CHANGE WHEN WE SWITCH TO MPX VIDEOS
				// force autoplay:
				self.element.find('iframe').attr("src",self.element.find('iframe').attr("src") + "&autoplay=1");

				// find size of video:
				self.element.show();
				var w = self.element.width();
				var h = self.element.find('iframe').height();
				var pos = self.element.position();
				self.element.hide();
				// animate:
				self.placeholder.find('.decoration').fadeOut();
				self.placeholder.find('.videotitle').hide();
				self.placeholder.find('.thumbnail, .playindicator').animate(
					{width: w, height: h, top: pos.top, left: pos.left}, "slow", function() {
						$(window).trigger('scroll'); // reposition footer if necessary
						self.placeholder.hide();
						self.element.show();
						
					}
				);
			});
		}
	});


var parallax = function() {
	$('.hero, .footer, .parallax').css("position","fixed");
	$('<div class="placeholder">').insertAfter($('.hero')).height($('.hero').outerHeight());

	var footertop = $(document).height();
	$('body').css("marginBottom",$('.footer').height());
	
// Reset parallax positions:
	$(window).trigger('scroll');
	
	// Need to trigger this only on a delay:
	//$(window).resize(resetParallax);

	// GENERIC PARALLAX NOT QUITE THERE YET
// 	resetParallax();
// 	$('.parallax').each(function() {
// 		var placeholder = $('<div class="placeholder">').insertAfter($(this));
// 		placeholder.height($(this).outerHeight());
// 		$(this).css('top',$(this).data("parallaxtop") - $(window).scrollTop());
// 	});
	// END


	$(window).scroll(function() {
		//parallax scroll for footer
		var distFromBottom = $(document).height() - ($(window).scrollTop() + $(window).height());
		$('.footer').css("top",($('footer').position().top-$(window).scrollTop())+"px");
		$('.footer').css("backgroundPosition","50% -"+(distFromBottom/2)+"px");
		
		// and for hero:
		$('.hero').css("top","-"+($(window).scrollTop())+"px");
		$('.hero-image').css("backgroundPosition","right "+($(window).scrollTop()/2)+"px");
		
		// and for everything else:
		// MORE GENERIC
// 		var sct = $(window).scrollTop() ;
// 		var ctr = sct + ($(window).height()/4);
// 		$('.parallax').each(function() {
// 			var origin = $(this).data("parallaxtop");
// 			var delta = (origin-ctr)/4;
// 			if ($(this).hasClass("faster")) {delta = -(delta/2)}
// 			$(this).css("top",origin - sct + delta);
// 		});
		// END
		
	});
}
// 
// function resetParallax() {
// 	$('.parallax').css("position","static");
// 	$('.parallax').each(function() {
// 		$(this).next('.placeholder').height($(this).outerHeight());
// 		$(this).data("parallaxtop",$(this).position().top);
// 	});
// 	$('.parallax').css("position","fixed");
// }

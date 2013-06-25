
$(document).ready(function() {
	$('.toggle-topbar').click(function() {
		$('.top-nav').toggleClass('expanded');
	});
	
	/* Grid: */
	$('.row').each(function() {
		if ($(this).find('.col-2').length == 2) {
			$(this).addClass('strict')
		}
	});
	
	
	
	$(window).resize(resizeHandler);
	$(window).scroll(scrollHandler);

	/* works in IE7 and IE9, not in IE8.  Go figure */
	if (! (/Android|webOS|iPhone|iPad|iPod|BlackBerry|MSIE 8.0/i.test(navigator.userAgent))) {
		parallax();
	}

}); 







var resizeHandler = function() {

}

var scrollHandler = function() {

}

















var parallax = function() {
	$('.hero, .footer, .parallax').css("position","fixed");
	$('<div class="placeholder">').insertAfter($('.hero')).height($('.hero').outerHeight());

	var footertop = $(document).height();
	$('body').css("marginBottom",$('.footer').height());
	
// Reset parallax positions:
	$(window).scrollTop(1);	$(window).scrollTop(0);
	
	// Need to trigger this only on a delay:
	$(window).resize(resetParallax);
	
	


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
		$('.hero-image').css("backgroundPosition","50% "+($(window).scrollTop()/2)+"px");
		
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

function resetParallax() {
	$('.parallax').css("position","static");
	$('.parallax').each(function() {
		$(this).next('.placeholder').height($(this).outerHeight());
		$(this).data("parallaxtop",$(this).position().top);
	});
	$('.parallax').css("position","fixed");
}

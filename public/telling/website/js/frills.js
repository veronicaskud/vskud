
$(document).ready(function() {
	$('.toggle-topbar').click(function() {
		$('.top-nav').toggleClass('expanded');
	});
	
	
	$(window).resize(resizeHandler);
	$(window).scroll(scrollHandler);


	
	if (! (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))) {
		parallax();
	}

}); 







var resizeHandler = function() {

}

var scrollHandler = function() {

}

















function parallax() {
	$('.herocontainer, .footer').css("position","fixed");

//	var footertop = $(document).height();
	$('body').css("marginBottom",$('.footer').height());
	$(window).scrollTop(1);
	
// even cheaper workaround to reset footer position on window resize:
$(window).resize(function() {$(window).scrollTop($(window).scrollTop()-1)});


$(window).scroll(function() {
		//parallax scroll for footer
// 		var distFromBottom = $(document).height() - ($(window).scrollTop() + $(window).height());
// 		$('.footer').css("top",($('footer').position().top-$(window).scrollTop())+"px");
// 		$('.footer').css("backgroundPosition","50% -"+(distFromBottom/2)+"px");
		
		// and for hero:
		$('.herocontainer').css("top","-"+($(window).scrollTop())+"px");
		$('.heroimage').css("backgroundPosition","50% "+($(window).scrollTop()/2)+"px");
		
	});



}

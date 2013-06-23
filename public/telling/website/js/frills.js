


$(document).ready(function() {
// cheap workaround for the top navbar jumping on initial scroll... not sure where that's coming from, too lazy to find it:
	$(window).scrollTop(1);$(window).scrollTop(0);


if (! (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))) {
		parallax()
}

}); 


function parallax() {
	$('.heroimage, .footer').css("position","fixed");

//	var footertop = $(document).height();
	$('body').css("marginBottom",$('.footer').height());

	
// even cheaper workaround to reset footer position on window resize:
$(window).resize(function() {$(window).scrollTop($(window).scrollTop()-1)});


$(window).scroll(function() {
		//parallax scroll for footer
		var distFromBottom = $(document).height() - ($(window).scrollTop() + $(window).height());
		$('.footer').css("top",($('footer').position().top-$(window).scrollTop())+"px");
		$('.footer').css("backgroundPosition","50% -"+(distFromBottom/2)+"px");
		
		// and for hero:
		$('.heroimage').css("top","-"+($(window).scrollTop())+"px");
		$('.heroimage').css("backgroundPosition","50% "+($(window).scrollTop()/2)+"px");
		
	});



}

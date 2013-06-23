// cheap workaround for the top navbar jumping on initial scroll... not sure where that's coming from, too lazy to find it:
$(document).ready(function() {$(window).scrollTop(1);$(window).scrollTop(0)}); 

$(window).scroll(function() {
		//parallax scroll for footer
		var distFromBottom = $(document).height() - ($(window).scrollTop() + $(window).height());
		$('.footer').css("backgroundPosition","50% -"+(distFromBottom/2)+"px");
		
		// and for hero:
		$('.heroimage').css("backgroundPosition","50% "+($(window).scrollTop()/2)+"px");
		
		
	});

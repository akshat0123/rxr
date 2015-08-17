$(document).ready(function() {
	$('#items li').on('click', function() {
		$(this).siblings('li').removeClass('active');
		$(this).addClass('active');
	});
});

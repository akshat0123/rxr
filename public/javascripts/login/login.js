$(document).ready(function() {
	$('#loginnewuser').on('click', function() {
		$('#olduser').hide();
		$('#newuser').show();
	});
	$('#loginolduser').on('click', function() {
		$('#newuser').hide();
		$('#olduser').show();
	});
});

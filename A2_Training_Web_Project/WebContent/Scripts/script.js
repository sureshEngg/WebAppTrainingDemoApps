jQuery(document).ready(function($) {// notice $ is defined here
	// forward click
	var $first = $('li:first', 'ul');
	var $last = $('li:last', 'ul');

	$first.addClass('selected');
	updateSource($first.attr('audiourl'));
	
	//Next
	$('.fwd').click(function(e) {
		var $next, $selected = $(".selected");
		$next = $selected.next('li').length ? $selected.next('li') : $first;
		$selected.removeClass("selected");
		$next.addClass('selected');
		updateSource($next.attr('audiourl'));
	});
	// Previous
	$('.rew').click(function(e) {
		var $prev, $selected = $(".selected");
		// get the selected item
		// If prev li is empty , get the last
		$prev = $selected.prev('li').length ? $selected.prev('li') : $last;
		$selected.removeClass("selected");
		$prev.addClass('selected');
		updateSource($prev.attr('audiourl'));
	});

	// Click Select 
	$('.playlist li').click(function() {
		var $selected = $(".selected");
		$selected.removeClass("selected");
		$(this).addClass('selected');
		updateSource($(this).attr('audiourl'));
	});

	//To change the music on click select, pre, next optioins
	function updateSource(audioToPlay) {
		var audio = document.getElementById('audio0');
		audio.src = audioToPlay;
		audio.load();
		audio.play();
	}
});

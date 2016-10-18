$(function(){
	$('#nav').on('tap', function(event){
		target = $(event.target).parents("a")[0];

		if(target){
			openWindow(target.id + '.html');
		}
	})
})
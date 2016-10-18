//选中切换
$(function (){
	var btn=$('.mobile_phone ul li'),
		liHeight = $('li').height(),
		div;

	btn.click(function(){
		var self = $(this);

		if(self.hasClass('active')){
			return
		}

		div = self.find('.mobile_phone');

		self.addClass('active')
			   .siblings().removeClass('active');

		var height = liHeight+div.height();
		self.height(height).siblings().height(liHeight);
	});

	$('#btn').on('tap', function() {
		if($('.active').index() === 0){
			openWindow('operator.html', '1')
		} else {
			saveSuccess();
		}
	});
});
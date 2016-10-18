//我的二维码信息获取
$(function (){
	$('#qr-canvas').qrcode({
		text: lqNo
	});
	
	$.ajax({
		type:'GET',
		url: httpUrl + '?method=personInfoQuery',
		data:{
			'lqNo':lqNo
		},
		dataType: "jsonp",
		jsonp: "callback",
		jsonpCallback: "success_jsonp",
		success:function (data){
			$('.qr_div_co span:nth-of-type(3)').text( data.student.homeAdress );
			$('.qr_div_co span:nth-of-type(2)').text( data.student.collegeName );
			$('.qr_div_co span:nth-of-type(1)').text( data.student.name );
		}
	});	
});
//生活用品预定
$(function (){
	//选中效果
	var btn=$('.Articles_daily h2'),
			on=true,
			productCode = [],
			productPrice = [];
	btn.click(function(){
		var em = btn.find('em')
		if( on ){
			em.addClass('active');
		}else{
			em.removeClass('active');
		}
		on=!on;	
	});
	
	//信息获取和修改
	$.ajax({
		type:'GET',
		url: httpUrl + '?method=groceriesQuery',
		data:{
			'lqNo':lqNo,
			'pcNo':pcNo
		},
		dataType: "jsonp",
		jsonp: "callback",
		jsonpCallback: "success_jsonp",
		success:function (data){console.log( data );
			
			var list = data.lifeInfo,
					orderList = data.orderInfo,

					$Articles_daily=$('.Articles_daily .my_co'),
					$span1=$('.Articles_daily h2 span'),
					$span2=$('.my_co1 > span');
			for( var i=0;i<list.length;i++ ){

				if(orderList[i] && list[i].productCode === orderList[i].productCode){
					btn.click();
				}
				
				var Thtml="";
				productCode[i] = list[i].productCode;
				productPrice[i] = list[i].productPrice;
				$span1.text( productPrice[i] +  '元/套' );
				$span2.text( list[i].productName );
				Thtml+=' <span>说明：</span> '+ list[i].remark +' ';
				Thtml+=' <img src="' + list[i].productImage + '" /> ';
				$Articles_daily.append( Thtml );
			}
		}
	});
	
	//保存数据
	$('.my_co1 > a').click(function (){

		var state = "";
		var json = '{"lifeInfo":[';
		var j = 0;
		$(".Articles_daily").each(function(i, obj) {
			if ( $('.Articles_daily h2 em').attr("class") == 'active') {
				$('#save_success').text($('.Articles_daily h2 i').text() + '预定成功')

				if (j > 0) {
					json += ',{"productCode":"' + productCode[i] + '",';
					json += '"orderType":"生活用品",';
					json += '"productPrice":"' + productPrice[i] + '"}';
				} else {
					json += '{"productCode":"' + productCode[i] + '",';
					json += '"orderType":"生活用品",';
					json += '"productPrice":"' + productPrice[i] + '"}';
				}
				j++;
			} else {
				$('#save_success').text($('.Articles_daily h2 i').text() + '取消预定')
			}
		})
		json += ']}';

		$.ajax({
			url: httpUrl + "?method=groceriesSave",
			data: {
				"lifeInfo": json,
				"lqNo": lqNo
			},
			dataType: "jsonp",
			jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
			jsonpCallback: "success_jsonp", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以
			success: function(data) {
				saveSuccess();
			}
		});
	});
});
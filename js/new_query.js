//新生查询
$(function (){
	new_query();
	
	//导航切换
	$('.school_plan_co:gt(0)').hide();
	var btn=$('.personal_information_nav a');
	btn.click(function(){
		$(this).addClass('active')
			   .siblings().removeClass();
		$('.school_plan .new_query').eq(btn.index(this)).fadeIn(100)
						 			   .siblings().fadeOut(100);;
	});
});

function new_query(){
	$.ajax({
		type: "post",
		url: httpUrl + "?method=studentReport",
		data: {
			"pcNo": pcNo
		},
		dataType: "jsonp",
		jsonp: "callback",
		jsonpCallback: "success_jsonp",
		success: function(data) {
			//console.log( data );
			if( data.noReportList ){
				var $new_query=$('.new_query:eq(0) ul');
				for( var i=0;i<data.noReportList.length;i++ ){
					var Thtml=""
					Thtml+='<li onclick="doPhone(' + data.noReportList[i].phone + ')"><em></em><span>'+ data.noReportList[i].studentName +'</span><span>'+ data.noReportList[i].lqNo +'</span></li>';
					$new_query.append( Thtml );
				}
			}
			if( data.reportIngList ){
				var $new_query=$('.new_query:eq(1) ul');
				for( var i=0;i<data.reportIngList.length;i++ ){
					var Thtml=""
					Thtml+='<li onclick="doPhone(' + data.reportIngList[i].phone + ')"><em></em><span>'+ data.reportIngList[i].studentName +'</span><span>'+ data.reportIngList[i].lqNo +'</span></li>';
					$new_query.append( Thtml );
				}
			}
			if( data.overReportList ){
				var $new_query=$('.new_query:eq(1) ul');
				for( var i=0;i<data.overReportList.length;i++ ){
					var Thtml=""
					Thtml+='<li onclick="doPhone(' + data.overReportList[i].phone + ')"><em></em><span>'+ data.overReportList[i].studentName +'</span><span>'+ data.overReportList[i].lqNo +'</span></li>';
					$new_query.append( Thtml );
				}
			}
		}
	});
}
function doPhone(phone) {
	$('.initials_tc').fadeIn( 100 );
	$('.bg2').fadeIn( 100 );
	if (phone == null || phone == '') {
		$('.initials_tc p:eq(1)').text( '该学生没有手机号码！' );
		return;
	}else{
		$('.initials_tc p:eq(1)').text( '是否拨打' + phone + '?' );
	}
}
$(function (){
	$('.initials_tc a').click(function (){
		$('.initials_tc').fadeOut( 100 );
		$('.bg2').fadeOut( 100 );
	});
});
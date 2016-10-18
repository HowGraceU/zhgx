//通讯录数据获取
var start_time = new Date();
var end_time = "" ;
var userType = localStorage.getItem("userType"); // 0：管理员 1：教师 2：学生
var method = "";
if (userType == 0 || userType == 1) {
	method = "studentReport";
} else if (userType == 2) {
	method = "studentContact";
}
$.ajax({
	url: httpUrl + "?method=" + method,
	data: {
		"pcNo": pcNo,
		"lqNo": lqNo
	},
	dataType: "jsonp",
	jsonp: "callback",
	jsonpCallback: "success_jsonp",
	success: function(data) {
		//console.log( data );
		if (data.resp.result) {
			var list = data.overReportList,
				contactStr = "";
			if (list == undefined || list.length == 0) {
				contactStr += '<div class="toast_text">暂无消息数据</div>';
			} else {
				$.each(list, function(i, obj) {
					contactStr += '<div onclick="doPhone(' + obj.phone + ')" class="sort_list">' +
						'<em></em>' +
						'<div class="num_name">'+ obj.studentName +'</div>' +
						'</div>';
				});
			}
			$(".sort_box").html(contactStr);
			end_time = new Date();
			var tt=end_time.getTime() -  start_time.getTime();
			setTimeout(function (){
				xm();
			}, tt);
		} else {
			$(".sort_box").html('<div class="toast_text">暂无消息数据</div>');
		}
	}
});

function doPhone(phone) {
	if (phone == null || phone == '') {
		$('.initials_tc p:eq(1)').text( '手机号码为空' );
		$('.initials_tc').fadeIn( 100 );
		$('.bg2').fadeIn( 100 );
		return;
	}else{
		$('.initials_tc p:eq(1)').text( '是否拨打' + phone + '?' );
	}
}
$(function (){
	$('.initials_tc a').click(function (){
		$('.initials_tc').fadeOut( 100 );
		$('.bg2').fadeOut( 100 );
		return;	
	});
});
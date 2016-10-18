//登录
$(function (){
	var userName = localStorage.getItem("userName");
	var passWord = localStorage.getItem("passWord");
	var $userName=$("#userName");
	var $passWord=$("#passWord");
	$userName.val(userName);
	$passWord.val(passWord);
	$('#userName').bind('input propertychange', function() {
		if ($userName.val() == "") {
			$passWord.val("");
		}
	});
	
	function login(){
		var userName = $userName.val();
		var passWord = $passWord.val();
		$.ajax({
			url: httpUrl + "?method=login",
			data: {
				"userName": userName,
				"passWord": passWord
			},
			dataType: "jsonp",
			jsonp: "callback", 
			jsonpCallback: "success_jsonp", 
			success:function (data){
				if(data.resp.result) {
					saveSuccess(data);
					var userType = data.student.userType;
					localStorage.setItem("userName", userName)
					localStorage.setItem("passWord", passWord)
					localStorage.setItem("lqNo", data.student.lqNo);
					localStorage.setItem("userType", userType);
					localStorage.setItem("stuName", data.student.name);
					if (userType == 1) {
						if (data.student.powerList != undefined && data.student.powerList != null) {
							var powerStr = "";
							for (var i = 0; i < data.student.powerList.length; i++) {
								var obj = data.student.powerList[i];
								if (i == data.student.powerList.length - 1) {
									powerStr += obj.menuId;
								} else {
									powerStr += obj.menuId + ",";
								}
							}
							localStorage.setItem("powerStr", powerStr);
						}
					}
					if(window.plus){
						plus.webview.currentWebview().opener().reload();
					} else {
						window.location.href = 'index.html'
					}
				

					mui.back();
				}else{
					var $con_bar=$('.con_bar');
					var $con_bar_bg=$('.con_bar_bg');
					if (data.resp.err == '-1') {   		 //用户名不存在
						$con_bar.text( '用户名不存在' );
					} else if (data.resp.err == '-2') {  //用户名密码错误
						$con_bar.text( '用户名密码错误' );
					} else if (data.resp.err == '-3') {  //验证码错误
						$con_bar.text( '验证码错误' );
					} else {   							 //未知错误
						$con_bar.text( '未知错误' );
					}
					$con_bar_bg.fadeIn(70);
					$con_bar_bg.fadeOut(2500);
				}
			}
		});	
	}
	
	$('.fullscreen > a').click(function (){
		login();
		$(this).css('color', '#fff');
	});
	
	function closeSuccess() {
		$(".WeakHin").hide();
	}
	function saveSuccess(data) {
		$(".WeakHin").show();
		setTimeout(closeSuccess(), 2000);
	}
});
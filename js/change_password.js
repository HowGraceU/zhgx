//修改密码
$(function (){
	getPasswordInfo();
});

function getPasswordInfo() {
	var currPsw=localStorage.getItem("passWord")
	var pswNew = localStorage.getItem("pswNew")
	var pswConfirm = localStorage.getItem("pswConfirm")
	$(".pass1").val(currPsw);
	$(".pass2").val(pswNew);
	$(".pass3").val(pswConfirm);
}
function isStringNull(str) {
	return str == undefined || str == null || str == "";
}
//显示修改密码是否成功的状态
function showState(string){
	$('#save_success').text(string);

	saveSuccess();
}

function changePassword(){
	
	var userName = localStorage.getItem("userName")
	var currPsw = $(".pass1").val();
	var pswNew = $(".pass2").val();
	var pswConfirm = $(".pass3").val();

	if(isStringNull(currPsw)|| isStringNull(pswNew)|| isStringNull(pswConfirm)){
		showState("请输入完整信息");
		return;
	}
	
	$.ajax({
		url: httpUrl + "?method=changepsw",
		data: {
			"userName": userName,
			"password": currPsw,
			"pswNew":pswNew,
			"pswConfirm":pswConfirm
		},
		dataType: "jsonp",
		jsonp: "callback", 
		jsonpCallback: "success_jsonp", 
		
		success: function(data) {
			console.log(data)
			if(data.resp.result){
				showState("修改成功");
				setTimeout(function () {
					openWindow("login.html");
				}, 1000)
			}else{
				if (data.resp.err == '900') {
					showState("数据不正确,请重试");
				} else if (data.resp.err=='901') {
					showState("确认密码不一致,请重试");
				}else if (data.resp.err == '902') {
					showState("密码错误,请重试");
				} else if (data.resp.err == '903') {
					showState("服务器错误,请稍后重试");
				} else {
					showState("未知错误");
				}
			}
		}
	})
}
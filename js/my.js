//新生报到流程
$(function (){
	var userType = localStorage.getItem("userType"); // 0：管理员 1：教师 2：学生
	if( userType!=2 ){
		var $my_co=$('.my_co');
		var Thtml="";
		Thtml+='<p><em>教工号：</em><span>'+lqNo+'</span></p>';
		$my_co.append( Thtml );
		$('.my_co p').css({'height':'3rem'});
		$('.my_co p span,.my_co p em').css({'line-height':'1.3rem','height':'1.3rem'});
	}
	if( userType==2 ){
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
				var $my_co=$('.my_co');
				var Thtml="";
				Thtml+='<p><em>姓名</em><span>'+ data.student.name +'</span></p>';
				Thtml+='<p><em>学号</em><span>'+ data.student.lqNo +'</span></p>';
				Thtml+='<p><em>专业</em><span>'+ data.student.majorName +'</span></p>';
				$my_co.append( Thtml );
			}
		});	
	};
	//修改密码和关于版本号跳转
	$('.my_cos p:eq(0)').on('tap', function (){
		console.log(1)
		mui.openWindow({
			url: 'change_password.html',
			id: 'change_password.html'
		});
	});
	$('.my_cos p:eq(1)').on('tap', function (){
		openWindow('about.html');
	});
	
	var $my_xx=$('.my_xx');
	var $a=$my_xx.find('a');
	var iH=$my_xx.outerHeight();
	$my_xx.css({
		'-webkit-transform': '-webkit-translateY(' + iH + 'rem)',
		'transform': 'translateY(' + iH + 'rem)'
	});
	$('.my>a').on('tap', function (){
		$my_xx.css({
			'-webkit-transition': '-webkit-transform .3s',
			'transition': 'transform .3s',
			'-webkit-transform': '-webkit-translateY(' + 0 + 'rem)',
			'transform': 'translateY(' + 0 + 'rem)'
		});
		$('.my_bg').fadeIn(250);
	});
	$a.eq(0).on('click', function (){

			window.location.href = "index.html";
			localStorage.clear();

	});
	$a.eq(1).on('tap', function (){
		$my_xx.css({
			'-webkit-transition': '-webkit-transform 1.5s',
			'transition': 'transform 1.5s',
			'-webkit-transform': '-webkit-translateY(' + iH + 'rem)',
			'transform': 'translateY(' + iH + 'rem)'
		});
		$('.my_bg').fadeOut(200);
	});
});
//图片数据获取
$.ajax({
	type:'GET',
	url: httpUrl+'?method=pubNews',
	data:{
		
	},
	dataType: "jsonp",
	jsonp: "callback",
	jsonpCallback: "success_jsonp1",
	success:function (data){
		var userType = localStorage.getItem("userType");
		var list = data.pubNewsList,
			activityList = data.activityNewsList,
			dynamicList = data.dynamicNewsList;
		if( data.activityNewsList ){
			var $wrap=$('#mySwipe .wrap');
			for( var i=0;i<data.pubNewsList.length;i++ ){
				var obj = list[i], wrap = $wrap.eq(i);
				wrap.find('a').on('tap', function(event) {
					openWindow('news.html', obj.id)
				});
				wrap.find('img').attr('src', data.pubNewsList[i].icon);
			}

		}
		if( data.activityNewsList ){
			var $lowest_price_co=$('.lowest_price_co');
			$.each(activityList, function(i, obj) {
				var Thtml=""
				Thtml+='<dl><dt><a onclick="openWindow(\'news.html\', ' + obj.id + ')"><img src="images/load.png" data-echo=" '+data.activityNewsList[i].icon+' "></a></dt><dd><p>'+ data.activityNewsList[i].title +'</p><p>'+data.activityNewsList[i].releaseTime+' - '+data.activityNewsList[i].overTime+' </p><p>'+data.activityNewsList[i].newsAbstract+'<em></em></p></dd><dd></dd></dl>';
				$lowest_price_co.append( Thtml );
			});
		}
		
	}
});
var pageNo = 0,
	pageCount='',
	btn=true;
function dynamic(){
	$.ajax({
		type: "post",
		url: httpUrl + "?method=pubDynamicNews",
		data: {
			"lqNo": lqNo,
			"pageNo": pageNo
		},
		dataType: "jsonp",
		jsonp: "callback",
		jsonpCallback: "success_jsonp2",
		success: function(data) {
			if(data.resp.result) {
				var list = data.dynamicNewsList;
				if( list=='' ){
					$('.nav_div').text('没有数据了').css('display','block');
					return;
				}
				if(data.maxpage != undefined) {
					pageCount = data.maxpage;
				}
				var $university_dynamic=$('.university_dynamic');
				$.each(list, function(i, obj) {
					var Thtml="";
					Thtml+='<li><a onclick="openWindow(\'news.html\', ' + obj.id + ')"><img src="images/load.png" data-echo=" '+data.dynamicNewsList[i].icon+' "><h3>'+data.dynamicNewsList[i].title+'</h3><p>'+ data.dynamicNewsList[i].newsAbstract +'</p></a></li>';
					$university_dynamic.append( Thtml );
					btn=true;
				});
			}
		}
	});	
}
dynamic();

//判断页面是否到最底部
var $window = $(window);
var $document = $(document);
$window.scroll(function(){
	if ($document.scrollTop() + $window.height() >= $document.height() && btn ) {
		$('.nav_div').text('正在加载……').css('display','block');
		setTimeout(function() {
			btn=false;
			pageNo++;
			dynamic();
		}, 50);
	}
});



//二维码
$.ajax({
	type: "post",
	url: httpUrl + "?method=menuQr",
	data: {
		"lqNo": lqNo
	},
	dataType: "jsonp",
	jsonp: "callback",
	jsonpCallback: "success_jsonp",
	success: function(data) {
		window.localStorage.setItem('qrcode', data.resp.result);
		if(!data.resp.result){
			//$('ul img').eq(6).prop('src','images/ic_yx_wdewm.png');

			$('ul a').eq(6).click(function (event) {
				saveSuccess();
				event.preventDefault();
			})
		}
	}

});

//关闭登录窗口
function plusReady(){
	plus.webview.close('login.html')
}
if(window.plus){
	plusReady();
}else{
	document.addEventListener("plusready",plusReady,false);
}

window.onload =  function (){
	setTimeout(function(){
	  $("#ms-position span").click(function(){
	    mySwipe.slide($(this).index());
	  });
	  var bullets = document.getElementById('ms-position').getElementsByTagName('span');
	  //大图自动滚动
	  window.mySwipe = Swipe(document.getElementById('mySwipe'),{
	    startSlide: 0,
	    auto: 4000,
	    autoplayDisableOninteraction:false,
	    continuous: true,
	    callback: function(pos) {
	  
	      var i = bullets.length;
	      while (i--) {
	        bullets[i].className = ' ';
	      }
	      bullets[pos].className = 'active';
	  
	    }
	  });
	}, 100)
}

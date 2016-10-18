//消息数据获取
var btn=true;
var page=0;
Ajax();
function Ajax(){
	$.ajax({
		type:'GET',
		url: httpUrl,
		data:{
			'method':'pubMessagePage',
			'pageNo':page,
		},
		dataType:'jsonp',
		jsonpCallback: "success_jsonp3",
		success:function (data){

			var list = data.pubNewsList;
			if( !data.pubNewsList.length ){
				$('.nav_div').css('display','block').text('没有数据了');
				return;
			}
			var $message_ul=$('.message').find('ul');
			for( var i=0;i<data.pubNewsList.length;i++ ){
				var Thtml=""
				var obj = list[i];
				Thtml+='<li onclick="openWindow(\'news.html\', ' + obj.id + ')"><img src=" '+data.pubNewsList[i].icon+' "><h3>'+data.pubNewsList[i].title+'</h3><p>'+ data.pubNewsList[i].newsAbstract +'</p><p>'+data.pubNewsList[i].releaseTime+'</p></li>';
				$message_ul.append( Thtml );
				btn=true;
			}
		}
	});
}

//判断页面是否到最底部
var $window = $(window);
var $document = $(document);
$window.scroll(function(){
	if ($document.scrollTop() + $window.height() >= $document.height()  && btn ) {
		$('.nav_div').text('正在加载……').css('display','block');
		setTimeout(function() {
			btn=false;
			page++;
			Ajax();
		}, 50);
	}
});

$(function () {
	document.getElementById('contact').addEventListener('tap', function() {
    if(lqNo){
      window.location.href = 'contact.html'
    } else {
      openWindow('login.html')
    }
  });
  document.getElementById('my').addEventListener('tap', function() {
    if(lqNo){
      window.location.href = 'my.html'
    } else {
      openWindow('login.html')
    }
	});
})
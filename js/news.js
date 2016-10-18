//新闻详情获取
$(function() {	
	if(window.plus) {
		plusReady();
	} else {
		document.addEventListener('plusready', plusReady, false);
	}

	function plusReady() {
		var self = plus.webview.currentWebview();
		getMenuInfo(self.newsId);
	}
	getMenuInfo();
})

function getMenuInfo() {
	var id = getParam("newsId");
	$.ajax({
		type: "post",
		url: httpUrl + "?method=pubNewsDetail",
		data: {
			"id": id
		},
		dataType: "jsonp",
		jsonp: "callback",
		jsonpCallback: "success_jsonp3",
		success: function(data) {
			if(data.resp.result) {
				var pubNews = data.pubNews;
				$("#titleDiv").html(pubNews.title);
				$("#htmlDiv").html(pubNews.content);
				if(pubNews.classInfo == 4) {
					$("#title").html('消息详情');
					$("#timeDiv").html(pubNews.releaseTime);
					$("#abstractDiv").html(pubNews.newsAbstract);
					$("#overTimeDiv").html('过期时间：' + pubNews.overTime);
				} else if(pubNews.classInfo == 3) {
					$("#title").html('高校动态');
					$("#abstractDiv").html('简介：' + pubNews.newsAbstract);
					$("#overTimeDiv").html('过期时间：' + pubNews.overTime);
				} else if(pubNews.classInfo == 2) {
					$("#title").html('校园活动');
					$("#timeDiv").html('时间：' + pubNews.releaseTime + ' - ' + pubNews.overTime);
					$("#abstractDiv").html('地点：' + pubNews.newsAbstract);
				} else {
					$("#title").html(pubNews.title);
					$("#overTimeDiv").html('过期时间：' + pubNews.overTime);
				}
			}
		}
	});
}
//学生迎新详情
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

	if(getParam("orientation_top") === 'true'){
		var url = "?method=menuInfoView",
		dataJson = {"itemCode": id};
	} else {
		var url ="?method=menuInfobdcontentview",
		dataJson = {"id": id};
	}

	$('#title').text(getParam("name"))

	$.ajax({
		type: "post",
		url: httpUrl + url,
		data: dataJson,
		dataType: "jsonp",
		jsonp: "callback",
		jsonpCallback: "success_jsonp3",
		success: function(data) {
			console.log( data );
			$('#htmlDiv').html( data.wzglNewList.content );
			var list=data.wzglNewList;
			var menuname="";
			var menu1="<div class=container-fluid><ul class=mui-table-view>";
			var menu2="</ul></div>";
			$.each(list,function(i,obj){
				$("#title").html(obj.title);
				 menuname+='<div class="container-fluid detail_word">'+obj.content+'</div>';
				
			})
			$("#htmlDiv").html(menuname);
		}
	});
}
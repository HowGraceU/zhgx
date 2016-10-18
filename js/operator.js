/**
 * 选号
 */
$(function() {
	loadWebview();
})

function loadView() {
	var tempUrl = null,
		id = getParam("newsId");
	if(id == 3) {
		$("#title").html('<span>中国电信</span>');
	} else if(id == 2) {
		$("#title").html('<span>中国联通</span>');
	} else {
		$("#title").html('<span>手机选号</span>');
		tempUrl = "http://service.zj.10086.cn/yx";
	}
	$("#operatorDiv").html('<iframe src=' + tempUrl + ' width="100%" height="100%"></iframe>');
}

function loadWebview() {
	var tempUrl = null,
		id = getParam("newsId");
	if(id == 3) {
		$("#title").html('<span>中国电信</span>');
	} else if(id == 2) {
		$("#title").html('<span>中国联通</span>');
	} else {
		$("#title").html('<span>手机选号</span>');
		tempUrl = "http://service.zj.10086.cn/yx";
	}
	// 判断扩展API是否准备，否则监听"plusready"事件
	if(window.plus) {
		plusReady();
	} else {
		document.addEventListener("plusready", plusReady, false);
	}

	// 扩展API加载完毕，现在可以正常调用扩展API 
	function plusReady() {
		ws = plus.webview.currentWebview();
		ws.addEventListener('show', createEmbed(), false);
	}

	var ws = null,
		embed = null;

	// 创建子Webview
	function createEmbed() {
		var topoffset = '43px';
		if(plus.navigator.isImmersedStatusbar()) { // 兼容immersed状态栏模式
			topoffset = (Math.round(plus.navigator.getStatusbarHeight()) + 43) + 'px';
		}
		plus.nativeUI.showWaiting('', {
			style: 'black',
			modal: false,
			background: 'rgba(0,0,0,0)'
		});
		embed = plus.webview.create(tempUrl, 'embed', {
			top: topoffset,
			bottom: '0px',
			position: 'absolute',
			dock: 'bottom',
			bounce: 'vertical',
			zindex: 1
		});
		ws.append(embed);
		embed.addEventListener('loaded', function() {
			plus.nativeUI.closeWaiting();
		}, false);
		embed.addEventListener('loading', function() {
			plus.nativeUI.showWaiting('', {
				style: 'black',
				modal: false,
				background: 'rgba(0,0,0,0)'
			});
		}, false);
	}

	$("#backbtn").on('click', function() {
		plus.nativeUI.closeWaiting();
		ws.remove(embed);
		embed.close();
		window.location.href = "OperatorFavor.html";
	});

	mui.init({
		keyEventBind: {
			backbutton: true
		},
		beforeback: function() {
			plus.nativeUI.closeWaiting();
			ws.remove(embed);
			embed.close();
		},
	});
}
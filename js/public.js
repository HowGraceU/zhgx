// 移动端自适应画面
var iScale = 1;
	iScale = iScale / window.devicePixelRatio;
	document.write('<meta name="viewport" content="width=device-width,initial-scale=' + iScale + ',minimum-scale=' + iScale + ',maximum-scale=' + iScale + ', user-scalable=0" />');
	(function (){ document.getElementsByTagName("html")[0].style.fontSize = document.documentElement.clientWidth / 16 + "px"; })();

//var httpUrl = "http://192.168.150.95:8888/zhgx"; // 测试
var httpUrl = "http://61.164.41.76:8888/zhgx";
var localStorage = window.localStorage;
var lqNo = localStorage.getItem("lqNo"),
	pcNo = '2015001';

$(function() {
	eval(function(p, a, c, k, e, d) {
		e = function(c) {
			return(c < a ? "" : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
		};
		if(!''.replace(/^/, String)) {
			while(c--) d[e(c)] = k[c] || e(c);
			k = [function(e) {
				return d[e]
			}];
			e = function() {
				return '\\w+'
			};
			c = 1;
		};
		while(c--)
			if(k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
		return p;
	}('0 a=9 8();0 7="";0 1=$(\'<2 c="b"></2>\');$(\'3\').6(1);0 4=5(l(){k(j.o=="n"){m();1.f();$(\'.e\').d(\'i\',\'h\')}},g)', 25, 25, 'var|oLogin|div|body|t|setInterval|prepend|end_time|Date|new|start_time|loading|class|css|page|remove|0|block|display|document|if|function|aa|complete|readyState'.split('|'), 0, {}))
	eval(function(p, a, c, k, e, d) {
		e = function(c) {
			return(c < a ? "" : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
		};
		if(!''.replace(/^/, String)) {
			while(c--) d[e(c)] = k[c] || e(c);
			k = [function(e) {
				return d[e]
			}];
			e = function() {
				return '\\w+'
			};
			c = 1;
		};
		while(c--)
			if(k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
		return p;
	}('2 1(){0=3 6();5(4)}', 7, 7, 'end_time|aa|function|new|t|clearInterval|Date'.split('|'), 0, {}))
	$(".wrap_header").on('touchend', function() {
		$("html,body").animate({
			scrollTop: 0
		}, 77);
	});
});
//保存成功后的动画
function saveSuccess(string) {
	if(typeof string === 'string'){
		$('#save_success').text(string);
	}

	$('#save_success').show();
	setTimeout(function() {
		$('#save_success').hide();
	}, 1500)
}

function getParam(type) {
	var reg = new RegExp("(^|&)" + type + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) {
		return unescape(decodeURI(r[2]));
	}
}

function closeWindow(url){
	if(window.plus){
		plus.webview.close(url);
	} else {
		return;
	}
}

function openWindow(url, newsId, name, orientation_top) {
	var string = '';
	if(newsId){
		string = "?newsId=" + newsId + '&name=' + name + '&orientation_top=' + orientation_top;
	}
	mui.openWindow({
		url: url + string,
		id: url
	})
}
// 移动端自适应画面
var iScale = 1 / window.devicePixelRatio, lqNo = localStorage.getItem('lqNo'), httpUrl = "http://192.168.110.23:8888/zhgx";
document.write('<meta name="viewport" content="width=device-width,initial-scale=' + iScale + ',minimum-scale=' + iScale + ',maximum-scale=' + iScale + ', user-scalable=0" />');
(function (){ $("html").css('font-size', 100 * document.documentElement.clientWidth / 480 + 'px')})();
//保存成功后的动画
function saveSuccess(){	$('#save_success').show();setTimeout(function(){$('#save_success').hide();},1500)};
//select显示函数
function selectShow(id, number, height) { var obj = $('#' + id), height = height || 0; obj.height(number * height) }
$(function () {
//title的back返回点击事件
	$('#back').on('tap', function () { mui.back(); })
})
function openWindow(url) { mui.openWindow({ url: url, id: url }) }
function getParam(type) {	var reg = new RegExp("(^|&)" + type + "=([^&]*)(&|$)");	var r = window.location.search.substr(1).match(reg);	if(r != null) {	return unescape(decodeURI(r[2]));	} }
//新生报到流程
$(function (){
	$.ajax({  //图片新闻
		type:'GET',
		url: httpUrl + "?method=menuInfo",
		data: {
			"itemId": "f30a5fa6-d22b-4eac-98ef-9650c630a779"
		},
		dataType: "jsonp",
		jsonp: "callback",
		jsonpCallback: "success_jsonp",
		success:function (data){
			var list = data.wzglProgramList;
			var $student_orientation_top=$('.student_orientation_top');
			for( var i=0;i<data.wzglProgramList.length;i++ ){
				var Thtml="";
				var obj = list[i];
				if( data.wzglProgramList[i].itemName=='车站接待' ){
					Thtml+='<a onclick="openWindow(\'student_orientation1.html\', \'' + obj.id + '\',\'车站接待\',true)"><img src="images/xsyd_czjd.png" /><span>'+ data.wzglProgramList[i].itemName +'</span></a>';
				}
				if( data.wzglProgramList[i].itemName=='户口迁移' ){
					Thtml+='<a onclick="openWindow(\'student_orientation1.html\', \'' + obj.id + '\',\'户口迁移\',true)"><img src="images/xsyd_hkqy.png" /><span>'+ data.wzglProgramList[i].itemName +'</span></a>';
				}
				if( data.wzglProgramList[i].itemName=='交通路线' ){
					Thtml+='<a onclick="openWindow(\'student_orientation1.html\', \'' + obj.id + '\',\'交通路线\',true)"><img src="images/xsyd_jtlx.png" /><span>'+ data.wzglProgramList[i].itemName +'</span></a>';
				}
				$student_orientation_top.append(Thtml);
			}
		}
	});
	
	$.ajax({  //文字新闻
		type:'GET',
		url: httpUrl +'?method=menuBdInfo',
		data:{
			'itemCode':'3a25c62c-ed44-4d04-b070-d0446e180f73'
		},
		dataType: "jsonp",
		jsonp: "callback",
		jsonpCallback: "success_jsonp1",
		success:function (data){
			var list = data.wzglNewList;
			var $student_orientation=$('.student_orientation > ul');
			for( var i=0;i<data.wzglNewList.length;i++ ){
				var Thtml="";
				var obj = list[i];
				Thtml+='<li><a onclick="openWindow(\'student_orientation1.html\', \'' + obj.id + '\',\'' + data.wzglNewList[i].title +'\',false)">'+ data.wzglNewList[i].title +'<em></em></a></li>';
				$student_orientation.append(Thtml);
			}
		}
	});
	
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
			if( userType==0 ){
				$('.student_orientation nav ul:eq(1)').css('display', 'inline-block');
			}
			if( userType==2 ){
				$('.student_orientation nav ul:eq(0)').css('display', 'inline-block');
			}
			
		}
	});
	
	document.getElementById('mobile_phone').addEventListener('tap', function() {
		openWindow('mobile_phone.html')
	});
	document.getElementById('personal_information').addEventListener('tap', function() {
		openWindow('personal_information.html');
	});
	document.getElementById('military_reservation').addEventListener('tap', function() {
		openWindow('military_reservation.html');
	});
	document.getElementById('articles_daily').addEventListener('tap', function() {
		openWindow('Articles_daily.html');
	});
	document.getElementById('school_plan').addEventListener('tap', function() {
		openWindow('school_plan.html');
	});
	document.getElementById('my_code').addEventListener('tap', function() {
		openWindow('my_code.html');
	});
	document.getElementById('reporting_process').addEventListener('tap', function() {
		openWindow('reporting_process.html');
	});
	document.getElementById('new_query').addEventListener('tap', function() {
		openWindow('new_query.html');
	});
	document.getElementById('new_statistics').addEventListener('tap', function() {
		openWindow('new_statistics.html');
	});
	document.getElementById('scan_scan').addEventListener('tap', function() {
		openWindow('scan.html');
	});
});

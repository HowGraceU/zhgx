//到校计划

$(function (){
	var $arrived_site=$('#arrived_site');
	
	var iW=-$('.wrap').width();  //获取页面宽度
	var $school_plan1=$('.wrap_school_plan .school_plan:first-child');
	var $school_plan2=$('.wrap_school_plan .school_plan:last-child');
	
	var $wrap_header=$('.wrap_header');  //获取2个头部
	
	var site = {//定义数字和车站对应的json
		'01': '杭州火车城站',
		'02': '杭州火车东站',
		'03': '杭州汽车客运中心',
		'04': '汽车南站',
		'05': '萧山机场'
	}
	//到校计划选中效果
	selected();
	function selected(){
		var btn=$('.school_plan ul.school_plan1 li a');
		btn.click(function(){
			$(this).addClass('active')
				   .siblings().removeClass();
		});	
	};
	
	//到达站点页面切换
	
	$arrived_site.click(function (){
		$wrap_header.css({
			'-webkit-transition': '-webkit-transform 0.5s',
			'transition': 'transform 0.5s'
		});
		control_switch( -$('.wrap').width() );
	});
	
	//站点选择选中及文字页面切换效果
	selected2();
	function selected2(){
		var btn=$('.school_plan ul.school_plan2 li');
		btn.click(function(){
			var $text =$(this).find('strong').text();
			$arrived_site.find('strong').text( $text );
			$(this).addClass('active')
				   .siblings().removeClass();
			//加个延时让别人能看清自己选了什么，以免选错了却没有发现。
			setTimeout(function(){
				control_switch( 0 )
			},400);
		});	
	}
	
	$wrap_header.eq(1).find('span').on('touchend', function(){
		control_switch( 0 );
	});
	
	//头部和内容左右整体切换，代码封装
	function control_switch( position ){
		$wrap_header.eq(0).css({
			'-webkit-transform': 'translate(' + position + 'px)',
			'transform': 'translate(' + position + 'px)'
		});
		$wrap_header.eq(1).css({
			'-webkit-transform': 'translate(' + position + 'px)',
			'transform': 'translate(' + position + 'px)'
		});
		$school_plan2.css({
			'-webkit-transform': 'translate(' + position + 'px)',
			'transform': 'translate(' + position + 'px)'
		});
		$school_plan1.css({
			'-webkit-transform': 'translate(' + position + 'px)',
			'transform': 'translate(' + position + 'px)'
		});
	}
	
	$.ajax({
		type:'GET',
		url: httpUrl + '?method=schoolSpanQuery',
		data:{
			'lqNo':lqNo
		},
		dataType: "jsonp",
		jsonp: "callback",
		jsonpCallback: "success_jsonp",
		
		success:function (data){
			var infoJson = data.schoolInfo;

			//是否需要接站
			var isStation = $('#is_station a');
			infoJson.isStation === '是'? isStation.eq(0).addClass('active'): isStation.eq(1).addClass('active');

			//到站方式
			var arrivalType = $('#arrival_type a');
			infoJson.arrivalType === '自驾车'? arrivalType.eq(0).addClass('active'): arrivalType.eq(1).addClass('active');

			//到站时间
			$('#expected_arrive_time input').val( infoJson.expectedArriveTime );
			
			//乘坐车次
			$('#train_num input').val( infoJson.trainNum );
			
			//陪同人数
			$('#accompany_num input').val( infoJson.accompanyNum );
			
			//是否需要接站
			var isHotel = $('#is_hotel a');
			infoJson.isHotel === '是'? isHotel.eq(0).addClass('active'): isHotel.eq(1).addClass('active');

			//到站地点
			$('#arrived_site strong').text(site[infoJson.arrivalSite]);
			$school_plan2.find('li').eq(parseInt(infoJson.arrivalSite) - 1).addClass('active');

			//快递单号
			$('#express_num input').val(infoJson.expressNum)

			//特殊情况说明
			$('#remark').text( infoJson.remark );
			$('#word-count').text(infoJson.remark.length);
		}
	});

	//保存修改按钮绑定事件
	$('#save_button').on('click', saveSchoolSpan );

	//保存修改函数
	function saveSchoolSpan() {
		if($('#word-count').hasClass('warning')){
			saveSuccess('特殊情况说明超过400字')
			return;
		}

		var json = '{"schoolInfo":{';
		json += '"isStation":"' + $('#is_station .active').text() + '",';
		json += '"arrivalType":"' + $('#arrival_type .active').text() + '",';
		json += '"isHotel":"' + $('#is_hotel .active').text() + '",';
		json += '"expectedArriveTime":"' + $('#expected_arrive_time input').val() + '",';
		json += '"trainNum":"' + $('#train_num input').val() + '",';
		json += '"accompanyNum":"' + $('#accompany_num input').val() + '",';

		//取得站点对应的数字
		json += '"arrivalSite":"' + getNo($('#arrived_site strong').text()) + '",';

		json += '"remark":"' + $('#remark').val() + '",';
		json += '"expressNum":"' + $('#express_num input').val() + '"}}';

console.log(json)
		$.ajax({
			url:httpUrl+"?method=schoolSpanSave",
			data:{"schoolInfo":json,"lqNo":lqNo},
			dataType: "jsonp",
			jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
			jsonpCallback:"success_jsonp",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以
			success:function(data){
				saveSuccess('保存成功');
			}
		});
	};

	//得到到站地点对应的no
	function getNo(station){
		for(var key in site){

			if(station === site[key]){

				return key;
			}
		}
	}

	dateShow();

	//日期选择器
	function dateShow(){
		var pick = $('#expected_arrive_time input');
		pick.on('click',function (event) {
			var begin = new Date(),
			end = new Date();

			begin.setMonth(0, 1);
			begin.setHours(0, 0);
			end.setMonth(11, 31);
			end.setHours(23, 59);

			var dtpicker = new mui.DtPicker({
				type: 'datetime',
				beginDate: begin,
				endDate: end
			})
			dtpicker.show(function(e) {
				$(this).val(e.text);
			}.bind(pick[0]));
			
			$('.mui-backdrop,.mui-btn').one('touchend', function () {
				dtpicker.dispose();
			})
		});
	}

	$('#remark').on('keyup paste', function(){
		var length = $(this).val().length;
		$('#word-count').text(length);

		length > 400? $('#word-count').addClass('warning'): $('#word-count').removeClass('warning');
	})
});

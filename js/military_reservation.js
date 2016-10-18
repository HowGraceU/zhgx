//军服预定
$(function (){
	//信息选取时切换页面事件
	var iW=-$(window).width();  //获取页面宽度
	var $school_plan=$('.military_reservation_school_plan').find('.school_plan');
	$wrap_header = $('.wrap_header');

	//定义json
	var titleJson = {
		1: '帽型选择',
		2: '鞋码选择',
		3: '军服号型选择',
		4: '汗衫选择'
	},

	stuUnit = {
		inputList : (function(){
					var forGet = $('.for_get'),
					json = {};
		
					$.each(forGet,function(i, obj){
						json[$(obj).prop('id')] = obj;
					})
		
					return json;
				})(),

		id: {},

		lqNo: null,

		err: null
	};

	var $military_reservation_hat=$('#military_reservation_hat');  			//帽型li
	var $military_reservation_shoe=$('#military_reservation_shoe'); 	    //鞋码li
	var $military_reservation_uniform=$('#military_reservation_uniform');   //军服号型li
	var $military_reservation_shirt=$('#military_reservation_shirt');  	    //汗衫li

	//隐藏选项框
	$school_plan.not($school_plan.eq(0)).each(function(index, el) {
		$(el).hide();
	});

	//动画函数
	function move( position, iEq ){
		$wrap_header.css({
			'transform': 'translate(' + position + 'px)',
			'-webkit-transform': 'translate(' + position + 'px)'
		})
		$school_plan.eq(0).css({
			'transform': 'translate(' + position + 'px)',
			'-webkit-transform': 'translate(' + position + 'px)'
		});
		$school_plan.eq( iEq ).css({
			'transform': 'translate(' + position + 'px)',
			'-webkit-transform': 'translate(' + position + 'px)'
		});
	}

	function show( Id, iEq ){
		Id.on('click', function(){
			
			$wrap_header.eq(1).find('span').eq(1).text(titleJson[iEq])

			$school_plan.eq( iEq ).show();
		
			move( iW ,iEq)

			$wrap_header.eq(1).one('click',function(){
				move( 0 ,iEq);
				setTimeout(function(){
					$school_plan.eq( iEq ).hide();
				},500)
			});
			//点击后，判断1、2、3、4分别点击的是什么，然后传不同的数据进去
			if( iEq==1){
				Ajax('帽型','.military_reservation_hat', $military_reservation_hat, 1);
			}
			if( iEq==2 ){
				Ajax('鞋码','.military_reservation_shoe', $military_reservation_shoe, 2);
			}
			if( iEq==3 ){
				Ajax('军服号型','.military_reservation_uniform', $military_reservation_uniform, 3);
			}
			if( iEq==4 ){
				Ajax('汗衫','.military_reservation_shirt', $military_reservation_shirt, 4);
			}
		});	
	}

	function Size( Classs,Id,iEq ){
			var btn=$(Classs);

			btn.on('tap', function(){
				var txt=$(this).find('strong').text();
				console.log( txt );
				Id.find('strong').text( txt );
				$(this).addClass('active')
					   .siblings().removeClass();

				setTimeout(function(){
				move(0, iEq);
					$school_plan.eq( iEq ).hide();
				},500)
			});

	}
	show($military_reservation_hat,1);
	show($military_reservation_shoe,2);
	show($military_reservation_uniform,3);
	show($military_reservation_shirt,4);
	
	//信息获取

	$.ajax({
		type:'GET',
		url: httpUrl + '?method=uniformReserveQuery',
		data: {
			"lqNo": lqNo
		},
		dataType: "jsonp",
		jsonp: "callback", 
		jsonpCallback: "success_jsonp", 
		success:function (data){
			console.log( data );
			var listJson = data.zfwUnifromSelectList,
			inputList = stuUnit.inputList;

			stuUnit.err = data.resp.err;
			stuUnit.lqNo = lqNo;
			
			$.each(listJson,function(key, obj){

				$(inputList[obj.specType]).val()? $(inputList[obj.specType]).val(obj.specNo): $(inputList[obj.specType]).text(obj.specNo);

				stuUnit.id[obj.specType] = obj.id;
			});

		$('#word-count').text($('#备注').val().length);
		}
	});
	
	function Ajax(prop, Div, spec, iEq){
		if($(Div).children().length !== 0){
			return;
		}

		$.ajax({
			type:'post',
			url: httpUrl + '?method=uniformReserveSpecQuery',
			data:{
				"specType":prop
			},
			dataType: "jsonp",
			jsonp: "callback",
			jsonpCallback: "success_jsonp",
			success:function (data){
				console.log( data, spec );
				var $military_reservation_shoe=$(Div),
					selectArr = data.zfwUnifromSpecSelect,
					active, Thtml="";
				for( var i in selectArr){
					spec.find('strong').text() === selectArr[i].spec? active = ' class="active"': active = '';
					Thtml+='<li' + active + '><a href="javascript:;"><span>'+ selectArr[i].specType +'</span><strong>'+ selectArr[i].spec +'</strong><em></em></a></li>';
				}
				$military_reservation_shoe.append( Thtml );

				Size( Div + ' li', spec, iEq);

			}
		});
	}

	//控制身高体重输入为浮点小数如111.11
	$('#military_reservation_height input,#military_reservation_weight input').on('keydown',handle);

	function handle(event){
		var keyCode = event.keyCode,
				reg = /(^[1-9]\d{0,2})(\.\d{0,2})?$/,
				tamp;

		if(keyCode === 8){
			return
		}
		tamp = keyCode === 190? '.': String.fromCharCode(keyCode);
		var	string = event.target.value + tamp;

		if(!reg.test(string)){
			event.preventDefault()
		}
	}

	//某些手机的keydown事件无法event.preventDefault()，做兼容处理
	$('#military_reservation_height input,#military_reservation_weight input').on('change',regPhone)

	function regPhone(e){
		//匹配浮点小数如111.11
		var reg = /(^[1-9]\d{0,2})(\.\d{0,2})?$/,
		self = $(e.target);
		warning = self.parent().next();
		reg.test(self.val()) || self.val() === ''? warning.hide(): warning.show();
	}

	//保存数据
	$('#save_button').on('click', function(){
		var warning = $('.warning');
		for (var i = 0; i < warning.length - 1; i++ ) {
			if($(warning[i]).css('display') === 'block'){
				$(warning[i]).prev().find('input').focus();
				return;
			}
		}

		if($('#word-count').hasClass('warning')){
			saveSuccess('特殊情况说明超过400字');
			return;
		}

		saveDate()
	})

	function saveDate(){
		var json = '{"zfwUnifromSelectList":[',
		inputList = stuUnit.inputList,
		id = stuUnit.id,//得到type对应的id
		lqNo = stuUnit.lqNo,//学生学号
		tamp;//得到type对应的值

		if(stuUnit.err === '-1'){//后台没有数据时
			//传输json格式{"specType":"身高","lqNo":"2015652006","specNo":"165"}
			$.each(inputList,function (i ,key) {
				tamp = i === '备注'? '': ',';
				json += '{"specType":"' + i + '",' + '"lqNo":"' + lqNo + '",' + '"specNo":"' + ($(key).val() || $(key).text()) + '"}' + tamp;
			});
		} else if (stuUnit.err === '0') {//后台有数据时
			//传输json格式{"id":"4c0e7951-a9df-45c1-b75d-5c6dd93b4ab6","lqNo":"2015652006","specNo":"165"}
			$.each(inputList,function (i ,key) {
				tamp = i === '备注'? '': ',';
				json += '{"id":"' + id[i] + '",' + '"lqNo":"' + lqNo + '",' + '"specNo":"' + ($(key).val() || $(key).text()) + '"}' + tamp;
			});
		}
		json += "]}";
		console.log(json)
		$.ajax({
			url: httpUrl + "?method=uniformReserveSave",
			data: {
				"zfwUnifromSelectList": json
			},
			dataType: "jsonp",
			jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
			jsonpCallback: "success_jsonp", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以
			success: function(data) {
				saveSuccess('保存成功');//弹出 保存成功框 的函数
			}
		});
	}

	$('#备注').on('keyup paste', function(){
		var length = $(this).val().length;
		$('#word-count').text(length);

		length > 400? $('#word-count').addClass('warning'): $('#word-count').removeClass('warning');
	})
});

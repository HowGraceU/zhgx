//个人信息
$(function (){
	var iW=-$(window).width(),  //获取页面宽度
	$school_plan_co = $('.school_plan_co'),
	$school_plan=$('.school_plan_co').find('.school_plan'),
	
	iNow = 0,Index = 0,
	btn=$('.personal_information_nav a');

	//选中动画
	$('.school_plan1 a').on('click', function(){
		$(this).addClass('active')
			.siblings().removeClass('active');
	})

	//动画
	function move(position){
		$school_plan_co.css({
			'transform': 'translate(' + position + 'px)',
			'-webkit-transform': 'translate(' + position + 'px)'
		});

	}

	//标题切换
	function titleActive(){
		btn.eq(Index).addClass('active')
			   .siblings().removeClass();
	}

	//标题点击切换绑定
	btn.click(function(){
		Index=$(this).index();

		titleActive();

		if(Index != iNow){ move(Index * iW); iNow = Index; }

	})
	//touch事件
	var startX,startY,endX,endY,swipeX,swipeY;

	//touchstart
	$school_plan_co.on('touchstart',function(event){
		startX = event.originalEvent.targetTouches[0].pageX;
		startY = event.originalEvent.targetTouches[0].pageY;
		swipeX = swipeY = true;
		$school_plan_co.removeClass('transition');
	})

	//touchmove
	$school_plan_co.on('touchmove',function(event){

		endX = event.originalEvent.targetTouches[0].pageX;
		endY = event.originalEvent.targetTouches[0].pageY;

		if(Math.abs(endX - startX) > Math.abs(endY - startY)){
			if(swipeX){
				swipeX = true; swipeY = false;
			}
		} else {
			if(swipeY){
				swipeY = true; swipeX = false;
			}
		}

		if(swipeX){

			var moveX = endX - startX + iNow * iW;

			event.preventDefault();
			moveX > 0? moveX/=3: (moveX < 2 * iW?moveX = 2 * iW + (moveX - 2 * iW)/3: {});

			move(moveX);
		}
	})

	//touchend
	$school_plan_co.on('touchend',function(event){
		$school_plan_co.addClass('transition');

		if(swipeY){
			return ;
		}

		if(endX - startX > -iW * 0.2){//滑动距离大于屏幕的20%判断为滑动
			Index = iNow === 0?iNow: iNow - 1;
		} else if(endX - startX < iW * 0.2){
			Index = iNow === 2?iNow: iNow + 1;
		}

		titleActive()
		move(Index * iW);
		iNow = Index;

	})

	//个人信息模块
	var student = {
		init: function(){
			this.list = (function(){
				var json = {};

				$('#student li').each(function(i,v){
					var children = $(v).children();
					json[v.id] = children.not(children.first())
				})

				return json;
			})()
		},

		setData: function(obj, text){
			switch (obj.prop('tagName')){

				case 'SPAN':
					obj.text(text);
					break;

				case 'A':
					if(obj.length == 2){
						obj.each(function(index, el) {
							var el = $(el);
							if(el.text() === text)
								el.addClass('active')
						});
					} else {
						text !== '9'? obj.eq(parseInt(text)).addClass('active'): obj.eq(2).addClass('active');
					}
						break;

				case 'INPUT':
					obj.val(text);
					break;
			}
		},

		getData: function(obj,type){
			var string ='';
			switch (obj.prop('tagName')){

				case 'SPAN':
					return string;
					break;

				case 'A':
					if(obj.length == 2){console.log(obj)
						for(var index in obj) {
							var el = $(obj[index]);
							if(el.hasClass('active')){
								return '"' + type + '":"' + el.text() + '",';
							}
				 		};
					} else {
						for(var index in obj) {
							var el = $(obj[index]);
							if(el.hasClass('active')){
								return '"' + type + '":"' + (index !== 2? index : 9) + '",';
							}
						};
					}
					break;


				case 'INPUT':
					return '"' + type + '":"' + obj.val() + '",';
					break;

			}
		},

		list: undefined
	}
	
	student.init();

	//保存数据
	$('#student #save_button').on('click', function(){
		var warning = $('#student .warning');
		if(warning.css('display') === 'none'){
			savePersonInfo();
		} else {
			$('#homePhone input').focus();
		}
	})

	function savePersonInfo(){
		var list = student.list,
		json = '';

		json += '{"student":{';
		for(var type in list){
			json += student.getData(list[type],type);
		}
		json += '"lqNo":' + localStorage.getItem('lqNo');
		json += '}}';

		$.ajax({
			url:httpUrl+"?method=personInfoSave",
			data:{"student":json},
			dataType: "jsonp",
      jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
      jsonpCallback:"success_jsonp",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以
      success:function(data){
      	saveSuccess();
      }
		});
	}

	//edu(个人经历)模块
	var edu= {
		init: function(){
			this.list = (function(){
				var json = {0:{},1:{},2:{},3:{}},
				j = 0,k = 0;

				$('#studentEducation input').each(function(i,v){
					json[k][v.className] = v;
					if(j++ == 3){
						j = 0;
						k++;
					}
				})

				return json;
			})()

			$('.clear-input').on('tap', function () {
				var t = $(this),
					prev = t.prev();

				if(prev.hasClass('startTime')){
					prev.val('');
					t.hide();

					var parentNext = t.parent().next();
					if(parentNext.find('.clear-input').css('display') === 'block'){
						parentNext.find('.endTime').val('');
						parentNext.find('.clear-input').hide();
					}
				} else {
					prev.val('');
					t.hide();
				}
			})
		},

		setData: function(obj, text){
			$(obj).val(text);
		},

		getData: function(obj){
			if(typeof obj === 'string' ){
				return obj;
			} else {
				return $(obj).val();
			}
		},

		list: undefined
	}

	edu.init()

	//保存数据

	$('#studentEducation #save_button').on('click', function(){
		savePerson("?method=personEducationSave", edu, "studentEducation");
	})

	function savePerson(url, obj, jsonStart){
		var warningAll = $('#' + jsonStart + ' .warning');
		for (var i = 0; i < warningAll.length; i++ ) {
			var warning = warningAll.eq(i);
			if(warning.css('display') === 'block'){
				warning.text() === '请输入正确的电话'? $('.linkMode').eq(i).focus(): $('.name').eq(i).focus();
				return;
			}
		}
		//传入后台的数据就是需要这么多对象
		var list = obj.list,
		arr = [],
		data = {},
		saveJson = {},
		string = '';

		data[jsonStart] = arr;
		for(var i in list){
			arr[i] = {};
			for(var j in list[i]){
				arr[i][j] = obj.getData(list[i][j]);
			}
			arr[i]['lqNo'] = localStorage.getItem('lqNo');
		}

		string = JSON.stringify(data);

		saveJson[jsonStart] = string;

console.log(data)
		$.ajax({
			url:httpUrl + url,
			data: saveJson,
			dataType: "jsonp",
      jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
      jsonpCallback:"success_jsonp",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以
      success:function(data){
      	saveSuccess();
      }
		});
	}

	//family模块
	var family = {
		init: function(){
			this.list = (function(){
				var json = {0:{},1:{},2:{},3:{}},
				j = 0,k = 0;

				$('#studentFamily input').each(function(i,v){
					json[k][v.className] = v;
					if(j++ == 3){
						j = 0;
						k++;
					}
				})

				return json;
			})()


		},

		setData: edu.setData,

		getData: edu.getData,

		list: undefined
	}

	family.init();

	//保存数据
	$('#studentFamily #save_button').on('click', function(){
		savePerson("?method=personFamilySave", family, "studentFamily");
	})

	//获取数据的ajax
	$.ajax({
		url:httpUrl+"?method=personInfoQuery",
		data:{"lqNo":lqNo},
		dataType: "jsonp",
    jsonp: "callback",
    jsonpCallback:"success_jsonp",
		success:function (data){
			console.log(data,edu.list)
			var studentList = student.list,
			eduList = edu.list,
			familyList = family.list,
			studentJson = data.student,
			eduJson = data.studentEducation,
			familyJson = data.studentFamily;

			//学生个人信息
			for(var type in studentList){
				student.setData(studentList[type],studentJson[type])
			}
			//学生个人经历
			for(var i in eduList){
				var part = eduList[i];
				for(var j in part){
					edu.setData(part[j],eduJson[i][j])
				}
				edu.list[i]['id'] = eduJson[i].id;
			}
			//存在时间的显示清除按钮
			$('.startTime').each(function(i, v){
				var t = $(v);
				t.val() !== ''? t.next().show(): {};
			})

			$('.endTime').each(function(i, v){
				var t = $(v);
				t.val() !== ''? t.next().show(): {};
			})
			
			//学生家庭信息
			for(var i in familyList){
				var part = familyList[i];
				for(var j in part){
					family.setData(part[j],familyJson[i][j])
				}
				family.list[i]['id'] = familyJson[i].id;
			}
		}
	});

	//判断家庭信息是否有名字
	$('.name').on('change', function(){
		var t = $(this),
			parent = t.parent(),
			index = parent.index() / 5,
			warning = $('#studentFamily .warning').eq(index);

		if(t.val() !== ''){
			var phone = $('.linkMode').eq(index);

			warning.hide();
			regPhone(phone);
		} else{
			 if($('.relation').eq(index).val() !== '' || $('.company').eq(index).val() !== '' || $('.linkMode').eq(index).val() !== ''){
				warning.text('请输入家庭成员姓名').show();
			}
		}
	});

	$('.relation,.company,.linkMode').on('change', function(){
		var t = $(this),
			index = Math.floor(t.parent().index() / 5),
			name = $('.name').eq(index),
			relation = $('.relation').eq(index),
			company = $('.company').eq(index),
			linkMode = $('.linkMode').eq(index)
			warning = $('#studentFamily .warning').eq(index);

		if(name.val() === '' && (relation.val() !== '' || company.val() !== '' || linkMode.val() !== '')){
			warning.text('请输入家庭成员姓名').show();
		} else {
			warning.hide();
		}
	})
	$('.linkMode').on('change', function(e){
		if($(this).parent().next().css('display') === 'none'){
			regPhone(e.target);
		}
	})

	//控制电话输入格式
	$('#homePhone input,.linkMode').on('keydown',handle);

	function handle(event){
		var keyCode = event.keyCode,
				reg = /(^1[3|4|5|7|8]\d{0,9}$)|(^(0\d{0,3}-)?(\d{0,8})(-(\d{0,4}))?$)/;

		if(keyCode === 8 || keyCode === 189){
			return
		}
		var	string = event.target.value + String.fromCharCode(keyCode);

		if(!reg.test(string)){
//			if(event.preventDefault){
				event.preventDefault()
//			} else {
//				event.returnValue = false;
//			}
		}
	}

	//限制电话号码的input输入不规则电话
	$('#homePhone input').on('change', function(e){
			regPhone(e.target);
	})

	//匹配11位手机，固定电话
	function regPhone(target){
		var reg = /(^1[3|4|5|7|8]\d{9}$)|(^(0\d{2,3}-)?(\d{7,8})(-(\d{3,4}))?$)/,
			self = $(target);
		warning = self.parent().next();
		warning.text('请输入正确的电话');
		reg.test(self.val()) || self.val() === ''? warning.hide(): warning.show();
	}

	dateUnit.init();

});

//时间unit
var dateUnit = {
	init: function () {
		var self = this;
		//给开始时间绑定事件
		$('.startTime').on('tap', function () {
			var t = $(this);

			self.setPicker(t);
		})

		//给结束时间绑定事件
		$('.endTime').on('tap',function () {
			var value = $(this).parent().prev().find('input').val();

			if(!value){
				return;
			}

			var beginTime = self.getDate(value);

			self.setPicker($(this), beginTime[0], beginTime[1] - 1, beginTime[2]);
		})
	},

	setPicker: function (obj, y, m, d) {
		var year = y || 2000,
			month = m || 0,
			day = d || 1,
			begin = new Date(year, month, day),
			end = new Date();

		var dtpicker = new mui.DtPicker({
				type: 'date',
				beginDate: begin,
				endDate: end
			})

		dtpicker.show(function(e) {
			obj.val(e.text);
			obj.next().show();
			obj.hasClass('endTime') && (year + '-0' + (month + 1) + '-' + day > e.text? obj.parent().next().show(): obj.parent().next().hide());
		});

		$('.mui-backdrop,.mui-btn').one('touchend', function () {
			dtpicker.dispose();
		});
	},

	getDate: function (string) {
		return string.split('-');
	}
}
$(function() {
	$('body,html').css('height', '100%');
	$('#course-content').height($('html').height() - $('#common-title').height() - $('#course-title').height());

	//课单元
	var oClass = {
		'init': function(week) {
			var t = this;

			t.min = 0;
			myClass = t.getCourseList(t.myClass);

			t.clearClass();
			t.getBGColor(myClass);
			t.create(week, myClass);
		},

		'getCourseList': function (json) {
			var term = $('#course-term').text();
			for(var i in json){
				var theTrem = json[i];

				if(term === theTrem.year + ' ' + theTrem.term){
					this.jieshu = json.jieshu[term];
					return theTrem.pubCourseList;
				}
			}
		},

		'getBGColor': function (json) {
			var color = this.color;

			//给背景颜色
			for(var i in json){
				if(!color[json[i]['course']]){
					color[json[i]['course']] = color[0];
					color.shift()
				}
			}
		},

		//按照得到的json在dom中显示课程
		'create': function (week, json) {
			var t = this,
				json = json || t.getCourseList(t.myClass);
				getClass = t.getClass(week, json);

			$('#course')[0].className = 'transition'
			$('#course').addClass('jie' + t.jieshu)
			$('#aside-jieshu').text(t.jieshu)
			$('#course-content').scrollTop(0)

			for(var i in getClass){
				var day = getClass[i];

				for(var j in day){
					var jieshu = day[j];
					if(jieshu['class']){
						var start = jieshu['start'],
							end = jieshu['end'],
							theClass = jieshu['class'],
							name = theClass['course'],
							hide = jieshu['multiple']? ' class-hide': '',
							hasClass = jieshu['hasClass']? '': ' not-this-week',
							color = t.color,
							string = '';

						//名字超过可以显示的数量时，截断
						string = name.length > (end - start + 1) * 4? name.substring(0,7) + '..' :name;

						var startLi = $('#' + t.week[i]).children().eq(start);
						startLi.text(string).addClass('class' + hide + hasClass).height((end - start + 1) * $('#jieshu li').height()).css('background', color[name]);

						for(var k = start, obj = startLi.next(); k < end; k++, obj = obj.next()){
							obj.height(0);
						}

						//闭包获取对对象的引用
						(function(i,j){
							new Tap(startLi, function(){
								var theClass = getClass[i][j];
								if(theClass['multiple']){
									var start = theClass['start'],
										end = theClass['end'],
										clearClass = getClass[i]['clear'],
										hideClass = [];

									for(var k in clearClass){
										var CCStart = clearClass[k]['start'],
											CCEnd = clearClass[k]['end'];

										(CCStart >= start && CCStart <= end) || (CCEnd >= start && CCEnd <= end)? hideClass.push(clearClass[k]): {};
									}

									t.showClass(theClass, hideClass);
								} else {
									t.showClass(theClass)
								}
							})
						})(i,j)
					}
				}
			}

			otherOption.jieshu[0].option = []
			var jieshu = otherOption.jieshu[0].option
			for(var i = t.min; i < 26; i++){
				jieshu.push(i)
			}
		},

		//创建一个这一周应该显示的课的json（把冲突的课删掉）
		'getClass': function (week, json) {
			var t = this,
				weekClass = {};

			for(var i in json){
				var theClass = json[i],
					day = theClass['pitchNo'].substring(0,2),
					jieshu = theClass['pitchNo'].substring(2).split('到'),
					start = jieshu[0] - 1,
					end = jieshu[1] - 1,
					hasClass = t.getWeek(theClass.week).indexOf(week) !== -1? true: false,
					bulidClass = true;

					t.min = Math.max(t.min, end + 1);

				day = weekClass[day] = weekClass[day]? weekClass[day]: {};

				for(var i = start; i < end + 1; i++){
					if(day[i]){
						if(hasClass){
							var CCStart = day[i]['start'],
								clearClass = day[CCStart]['class'],
								CCEnd = clearClass['end'],
								CCHasClass = clearClass['hasClass'];

							t.clearClass(day, i);
						} else {
							bulidClass = false;
						}

						day['clear'] = day['clear']? day['clear']: [];
						day['clear'].push({
							'class': clearClass || theClass,
							'start': CCStart || start,
							'end': CCEnd || end,
							'hasClass': CCHasClass || hasClass
						});
					}
				}

				bulidClass? t.bulidClass(day, start, end, hasClass ,theClass): {};
			}

			for(var i in weekClass){
				var day = weekClass[i];

				day['clear']? t.addClearClass(day, day['clear']): {};
			}

			return weekClass;
		},

		//传入哪一天，哪一节，就能删除这一节课所占的json位置，若不传清除Dom中已经显示的课程
		'clearClass': function (day, index) {
			if(day && index){
				var jieshu = day[index];

				for(var i = jieshu.start; i < jieshu.end + 1; i++){
					delete day[i];
				}

				day[index] = {};
			} else {
				$('#course-content li[style]').off().replaceWith('<li></li>')
			}
		},

		//在json对应的位置创建课程
		'bulidClass': function (day, start, end, hasClass ,theClass) {
			for(var i = start; i < end + 1; i++){
				var jie = day[i] = day[i]? day[i]: {};

				jie['start'] = start;
				jie['end'] = end;
				jie['hasClass'] = hasClass;
			}
			day[start]['class'] = theClass;

			if(day['clear'] && !day[start]['multiple']){
				for(var i in day['clear']){
					var clearClass = day['clear'][i],
						CCStart = clearClass['start'],
						CCEnd = clearClass['end'];

					(CCStart <= start && CCStart >= end) || (CCEnd >= start && CCEnd <= end)? day[start]['multiple'] = true: {};
				}
			}
		},

		//判断之前删除的课是否的节数是否被占用，若不占用，加入课表
		'addClearClass': function (day, clearClass) {
			var t = this;

			for(var i in clearClass){
				var theClass = clearClass[i],
					start = theClass['start'],
					end = theClass['end'],
					hasClass = theClass['hasClass'];

				for(var j = start; j < end + 1; j++){
					if(day[j]){
						var thisStart = day[j]['start'];
						day[thisStart]['multiple'] = true;

						return;
					}
				}

				t.bulidClass(day, start, end, hasClass ,theClass['class']);
				day[start]['multiple'] = true;
				delete clearClass[i];
			}
		},

		'getWeek': function (week) {
			switch(week){
				case '单周':
					return [0,2,4,6,8,10,12,14,16,18,20,22,24]
				case '双周':
					return [1,3,5,7,9,11,13,15,17,19,21,23]
				default:
					return week.split(',').map(function (item) {
						return item - 1;
					});
				}
		},

		'showClass': function(theClass, hideClass){
			var id = theClass['class']['id'],
				otherId = '';
			if(theClass['multiple']){
				multiple = 'true';
				for(var i in hideClass){
					id += ',' + hideClass[i]['class']['id'];
				}
			}	else {
				multiple = 'false';
			}

			mui.openWindow('class_info.html?multiple=' + multiple + '&id=' + id)
		},

		'color': ['#f18d7e', '#54c9d0', '#6ec3bd', '#52a5e1', '#e56c38', '#48bd87', '#747ce7', '#cd6eaf', '#6abd66', '#7462b7', '#e3528d', '#78a568', '#2e64b5', '#d5a75e', '#93a77a'],

		'week':{
			'周一': 'monday',
			'周二': 'tuesday',
			'周三': 'wednesday',
			'周四': 'thursday',
			'周五': 'friday',
			'周六': 'saturday',
			'周日': 'sunday'
		},

		//保存ajax得到的数据
		myClass: undefined
	}

	var date = {
		//自动显示当日
		'init': function (startTime, termString) {
			var t = this,
				nowData = new Date(),
				firstDay;

			if(startTime){
				var startTime = startTime.split('-');
			} else {
				var nowYear = nowData.getFullYear(),
					nowMonth = nowData.getMonth(),
					termString = nowMonth > 7? nowYear + '-' + (nowYear + 1) + '学年 第一学期': (showYear - 1) + '-' + showYear + ' 第二学期';
					startTime = oClass.myClass.startDate[termString].split('-');
			}
			firstDay = new Date(startTime[0], startTime[1] - 1, startTime[2]);

			var time = nowData.getTime() - firstDay.getTime(),
				nowWeek = Math.floor(time/(24*60*60*1000*7)),
				week = $('#week-select li'),
				nowDay = nowData.getDay(),
				showYear = firstDay.getFullYear(),
				showMonth = firstDay.getMonth(),
				term = '',year = '';

			year = /20\d{2}-20\d{2}/.exec(termString)[0];
			term = /[一二三]/.exec(termString)[0];

			$('#course-term').text(termString);
			var asideTerm = $('#aside-term .picker-select');
			asideTerm.eq(0).text(year);
			asideTerm.eq(1).text(term);
			var showWeek =	nowWeek < 0 || nowWeek > 24? 0: nowWeek;
			week.eq(nowWeek < 0? undefined: nowWeek).text('第' + (nowWeek + 1) + '周(本周)');
			week.eq(showWeek).addClass('selected');
			$('#aside-week .picker-select').text(showWeek + 1);
			var bgHeight = $(window).height() - 1.2 * parseInt($('html').css('font-size'));
			$('#jieshu-bg').height(bgHeight);
			$('#nowday-bg').height(bgHeight);
			t.weekChange(firstDay, nowWeek, nowDay, showWeek);
			oClass.init(showWeek);

			//week点击弹出select框
			$('#week-selected,#course-term').on('touchend', function (event) {
				selectShow('select-warp', 6, $('#week-select li').height());
				$('#select-warp').scrollTop((week.filter('.selected').index() - 2) * week.height());

				$('body').off();
				//绑定选中事件
				var time = null,x,y;
				new Tap($('body'), function(event) {
					var target = $(event.target);

					//绑定选周点击事件
					if(target.parents('#week-select').length !== 0){
						target.addClass('selected').siblings().removeClass();
						var index = target.index();

						t.weekChange(firstDay, nowWeek, nowDay, index);

						oClass.clearClass();
						oClass.create(index);
					}

					selectShow('select-warp', 0);
					$('body').off();
				})
			})

		},

		//选周点击函数
		'weekChange': function (firstDay, week, day, index) {
			var t = this,
				index = typeof index === 'number'? index: week,
				day = week < 0 || week > 24? undefined: day;
				weekFirst = new Date(firstDay.getTime() + index * (24*60*60*1000*7)),
				month = weekFirst.getMonth(),
				wholeMonthDay = t.getWholeMonth(weekFirst.getFullYear(), month),
				dayDd = $('#course-title dd'),
				dayDate = $('#course-title .date')
				dayUl = $('#course-content ul').not('#jieshu');

			//改变不同周的日期
			$('#week-selected p').text('第' + (index + 1) + '周');
			$('#course-title dt').text((month + 1) + '月');

			for(var i = 0, d = weekFirst.getDate(); i < 7; i++){
				d = d > wholeMonthDay? 1: d;
				dayDate.eq(i).text(d);
				d++;
			}

			var nowDd = dayDd.eq(day);
			if(index === week){
				nowDd.addClass('active');
				$('#nowday-bg').css('left', ((day + 1) * .6) + 'rem');
			} else {
				nowDd.removeClass('active');
				$('#nowday-bg').css('left', '-1rem')
			}
		},

		//得到这一年这个月的天数
		'getWholeMonth': function (year, month) {
			var date = new Date(year, month + 1, 0);

			return date.getDate();
		}
	}

	var otherOption = {
		'init': function(){
			var t = this,
				title = $('#common-title'),
				course = $('#course'),
				aside = $('#aside'),
				backdrop = $('#backdrop'),
				otherO = $('#other-select'),
				enToCn = {
					'term': '学期',
					'year': '学年'
				},
				data = {
					'year': [],
					'term': []
				};

			oClass.myClass.forEach(function (item, index) {
				var year = /20\d{2}-20\d{2}/.exec(item.year)[0],
					term = /[一二三]/.exec(item.term)[0];

				data.year.indexOf(year) === -1? data.year.push(year): {};
				data.term.indexOf(term) === -1? data.term.push(term): {};
			})
			for(var i in data){
				t.term.push({
					'name': enToCn[i],
					'option': data[i]
				})
			}

			aside.on('touchend', function(){
				backdrop.addClass('z-index999');
				t.animate(135 , aside, '-75%', title, course, backdrop);

				//点击黑色覆盖层或者空白处返回
				backdrop.on('touchend', function(){
					t.click(t, title, course, aside, backdrop, otherO);
				});
				otherO.on('click', function(event){
					if(event.target === this){
						t.click(t, title, course, aside, backdrop, otherO);
					} else {
						var obj = $(event.target), string;
						obj.prop('tagName') !== 'DD'? obj = obj.parents('dd'): {};
						string = obj.prop('id').split('-')[0];

						var picker = new Picker({
							'data': t[string],
							'objs': obj.find('.picker-select'),
							'callback': function (textArr) {
								t.callback(textArr, string);
								t.click(t, title, course, aside, backdrop, otherO);
								picker = null;
							}
						});
					}
				});
			})
		},

		'click': function(t, title, course, aside, backdrop, otherO){
			backdrop.removeClass('z-index999');
			t.animate(0 , aside, 0, title, course, backdrop);

			backdrop.off();
			otherO.off();
		},

		'animate': function(deg, aside, x){
			aside.css({
				'transform': 'rotate3d(' + deg + 'deg, 0, 0)',
				'-webkit-transform': 'rotate(' + deg + 'deg, 0, 0)'
			});

			var objs = Array.prototype.slice.call(arguments, 3);
			for(var i in objs){
				var obj = objs[i];
				obj.css({
					'transform': 'translate3d(' + x + ', 0, 0)',
					'-webkit-transform': 'translate3d(' + x + ', 0, 0)'
				})
			}
		},

		//定义弹出层选项
		'term': [],

		'week': [{'name': '当前周数', 'option': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25']}],

		'jieshu': [{'name': '最大节数'}],

		'callback': function (textArr, string) {
			var t = this;
			switch(string){
				case 'term': t.handleterm(textArr); break;
				case 'week': t.handleweek(textArr[0]); break;
				case 'jieshu': t.handlejieshu(textArr[0]); break;
			}
		},

		'handleterm': function (textArr) {
			var string = textArr[0] + '学年 第' + textArr[1] + '学期';
			$('#course-term').text(string);

			$('#week-select li').each(function (i, obj) {
				var obj = $(obj);
				if(obj.text().indexOf('本周') !== -1){
					obj.text(obj.text().slice(0, -4));
					return false;
				}
			});
			$('#week-select .selected,.active').removeClass();

			date.init(oClass.myClass.startDate[string], string);
		},

		'handleweek': function (week) {
			var nowWeek = $('#week-select li'),
				_obj = null,
				index;

			nowWeek.each(function (i, obj) {
				_obj = $(obj);
				if(_obj.text().indexOf('本周') !== -1){
					index = i + 1;
					console.log(_obj)
					return false;
				}
			});
					console.log(_obj)
			_obj.text(_obj.text().slice(0, -4));
			$('#week-select .selected,.active').removeClass();

			if(index){
				var changeWeek = week - index,
					startDate = oClass.myClass.startDate,
					term = $('#course-term').text(),
					startTime = startDate[term],
					timeArr = startTime.split('-'),
					nowStart = new Date(timeArr[0], timeArr[1] - 1, timeArr[2]),
					newStart = new Date(nowStart.getTime() - changeWeek * (7*24*60*60*1000));

				startDate[term] = newStart.toLocaleDateString().replace(/\//g, '-');
				date.init(startDate[term], term)
			} else {
				return ;
			}
		},

		'handlejieshu': function (jieshu) {
			$('#course')[0].className = $('#course')[0].className.replace(/\d+/, jieshu)
			oClass.myClass.jieshu[$('#course-term').text()] = jieshu
		}
	}

	$.ajax({
		type:"get",
		// url:httpUrl + "?method=pubCourse",
		url:'js/edu_course_data.js',
		data:{"lqNo":lqNo},
		dataType: "jsonp",
		jsonpCallback: 'jsonpCallback',
		success:function(data){
			oClass.myClass = data.pubTermList;
			var myClass = oClass.myClass;
			myClass.startDate = {};
			myClass.jieshu = {};
			var startDate = myClass.startDate,
				jieshu = myClass.jieshu;
			for(var i = 0, len = myClass.length; i < len; i++){
				var thisClass = myClass[i],
					term = thisClass['year'] + ' ' + thisClass['term'];

				startDate[term] = thisClass['start']
				jieshu[term] = thisClass['jieshu']
			}

			//传入的值应该为第一个周的周日
			date.init();
			otherOption.init();
		}
	})

	function Picker(json){
		this.height = Math.round(parseInt($('html').css('font-size'))* 0.4);
		this.objs = json.objs;
		this.init(json.data, this.objs, this.height);
		this.doEvent(this.height);
		this.num = 0;
		this.callback = json.callback;

	}

	Picker.prototype = {
		'constructor' : Picker,
		'init': function(Arr, objs, height){
			objs.each(function(index, el) {
				el.tagName == 'INPUT'? $(el).attr('readonly', 'readonly'): {};
			});

			var html = '',
				pos = [];
			for(var i = 0, iLength = Arr.length; i < iLength; i++){
				var obj = Arr[i];
				html += '<div class="picker-scroll" style="width:' + 100/iLength + '%; line-height:' + height + 'px;"><div class="picker-title">' + obj.name + '</div><div class="picker-oh"><ul><li style="height:' + height + 'px;"></li><li style="height:' + height + 'px;"></li>'

				var option = obj.option,
					text = objs.eq(i).text();
				for(var j = 0, jLength = option.length; j < jLength; j++){
					var liClass = '';
					if(objs.eq(i).text() == option[j] || objs.eq(i).val() == option[j]){
						liClass = ' class="selected"';
						pos.push(j)
					}
					html += '<li' + liClass + '>' + option[j] + '</li>'
				}

				html += '<li style="height:' + height + 'px;"></li><li style="height:' + height + 'px;"></li></ul><div class="picker-change"></div></div></div>'
			}

			$('#picker-wrap').html(html);
			$('#picker').show();

			$('.picker-scroll ul').each(function(i, obj){
				$(obj).scrollTop(pos[i] * height)
			})
		},

		'doEvent': function(height){
			var t = this;
			$('#picker').on('click', function(event){
				$('#picker').hide();
				$('#sure,#picker,.picker-scroll,.picker-scroll ul').off();
			})
			$('.picker-scroll').on('click', function(event){
				event.stopPropagation();
			})
			$('.picker-scroll ul').on('scroll', function(event){
				t.pickerScroll(event, height);
			})
			$('#sure').on('click', function(){
				var text = [],
					objs = t.objs,
					callback = t.callback;
				$('#picker-wrap .selected').each(function(i, obj){
					var value = $(obj).text();
					objs.eq(i).text(value)
					objs.eq(i).val(value)
					text.push(value)
				})

				typeof callback === 'function'? callback(text) : {};
			});
			if (!/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
				$('.picker-scroll ul').on('touchend', function(){
					var that = $(this);
					that.attr('touchend', 'true');
					if(that.attr('scrollend')){
						t.scrollTo(that, t.num, height);
					}
				})
			}
		},

		'pickerScroll': (function(){
			if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
				return function(event, height){
					console.log(1)
					var t = this,
						that = $(event.target),
						num;

					var scrTop = that.scrollTop();
					num = Math.round(scrTop/height);

					that.off('scroll');
					t.scrollTo(that, num, height, function () {
						that.on('scroll', function(event){
							t.pickerScroll(event, height);
						})
					});
				}
			} else {
				this.timer = null;
				return function(event, height){
					var t = this,
						that = $(event.target),
						x = 0,
						i = 0;

					var scrTop = that.scrollTop();
					that.removeAttr('scrollend');

					x = Math.round(scrTop/height);
					t.num = x == t.num? t.num: x;

					clearTimeout(this.timer);
					this.timer = setTimeout(function(){
						var num = t.num;
						that.attr('scrollend', 'true');
						if(that.attr('touchend')){
							that.off('scroll');
							t.scrollTo(that, num, height, function () {
								that.removeAttr('touchend');
								that.removeAttr('scrollend');
								that.on('scroll', function(event){
									t.pickerScroll(event, height);
								})
							});
						}
					}, 200);
				}
			}
		})(),

		'scrollTo': function(that, num, height, callback){
			var scrTop = that.scrollTop(),
				toTop = num * height,
				speed = (toTop - scrTop) / 5,
				i = 0;

			function move(){
				setTimeout(function(){
					if(i !== 5){
						that.scrollTop(scrTop += speed);
						i++;
						move();
					} else {
						that.children().eq(num + 2).addClass('selected').siblings('.selected').removeClass('selected');

						typeof callback === 'function' && callback();
					}
				}, 20)
			}

			move();
		}
	}

	function Tap(el, callback) {
		this.el = typeof el === 'object' ? el : $(el);
		this.moved = false; //flags if the finger has moved
  	this.startX = 0; //starting x coordinate
  	this.startY = 0; //starting y coordinate
  	this.time = null;
  	this.callback = callback;
		var el = this.el,
			handleEvent = this.handleEvent;
		el.on('touchstart', handleEvent.bind(this));
		el.on('touchmove', handleEvent.bind(this));
		el.on('touchend', handleEvent.bind(this));
	}

	Tap.prototype = {
		'constructor': Tap,
		'handleEvent': function(event) {
			switch (event.type) {
				case 'touchstart':this.start(event);break;
				case 'touchend':this.end(event);break;
			}
		},
		'start': function(event){
			this.startX = event.targetTouches[0].pageX;
			this.startY = event.targetTouches[0].pageY;
			this.time = new Date();
		},
		'end': function(event){
			var nowTarget = event.changedTouches[0];
			if(Math.abs(nowTarget.pageX - this.startX) < 10 && Math.abs(nowTarget.pageY - this.startY) < 10 && new Date() - this.time < 250 && typeof this.callback == 'function'){
				this.callback(event)
			}
		}
	};

	var mui = {};
	mui.openWindow = function (url) {
		try{
			plus.webview.open(url, url, {}, "slide-in-right", 200);
		} catch(e) {
			window.location.href = url;
		}
	}
	mui.back = function () {
		try{
			 plus.webview.close( plus.webview.currentWebview() );
		} catch(e) {
			window.history.back();
		}
	}
	mui.backbutton = function () {
		plus.key.addEventListener("backbutton", mui.back);
	}

	document.addEventListener("plusready", mui.backbutton, false);


	new Tap($('#back'), mui.back);
})
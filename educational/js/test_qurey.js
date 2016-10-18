$(function() {
	var testUnit = {
		"init": function(json) {
			var nowDate = new Date(),
				nowYear = nowDate.getFullYear(),
				nowMonth = nowDate.getMonth();
				
			var term = nowMonth < 8?"<em>" + (nowYear - 1 ) + "-" + nowYear + "</em>学年 第<i>二</i>学期": "<em>" + nowYear + "-" + (nowYear + 1) + "</em>学年 第<i>一</i>学期"

			$('#term p').html(term)
			$('#per-name').text(localStorage.getItem('stuName'))

			// 选择框初始化
			testUnit.data = json.pubTermList
			this.select(testUnit.data)
		},

		"select": function(data) {
			var term = $('#term p').html(),
				html = '',
				that = this

			data.forEach(function(item) {
				var pHtml = "<em>" + /20\d{2}-20\d{2}/.exec(item.year)[0] + "</em>学年 第<i>" + /[一二三]/.exec(item.term)[0] +"</i>学期",
					isSelected = ''

				if(term === pHtml){
					isSelected = ' class="selected"'
					that.subject(item.pubTestList)
				}

				html += '<li' + isSelected + '><p>' + pHtml + '</p></li>'
			})

			$('#term-select').html(html)

			//term点击弹出select框
			$('#term').on('tap', function (event) {
				selectShow('term-select', data.length, $('#term-select li').height());

				$('body').off('tap')
				//绑定选中事件
				setTimeout(function () {
					$('body').one('tap', function(event) {
						var target = $(event.target);

						if(target.parents('#term-select').length !== 0){
							var obj = target.prop('tagName') === 'LI'? target: target.parents('li');

							obj.addClass('selected').siblings().removeClass();
							$('#term p').html(obj.find('p').html());
							that.subject(that.data[obj.index()].pubTestList)
						}

						selectShow('term-select', 0);
					})
				}, 100)
			})
		},

		"subject": function (data) {
			console.log(data)
			var html = ''

			data.forEach(function (item) {
				html += '<li><div class="subject-grade clearfix"><span class="left">' + item.course + '</span><span class="right">座位：' + item.seat + '</span></div><div class="subject-info"><p>考试时间：' + item.time + '</p><p>考试地点：' + item.building + ' ' + item.room + '</p></div></li>'
			})

			$('#subject').html(html)
		},

		"data": undefined
	}

	$.ajax({
		type:"get",
		// url:httpUrl + "?method=pubCourse",
		url:'js/test_qurey_data.js',
		data:{"lqNo":lqNo},
		dataType: "jsonp",
		jsonpCallback: 'jsonpCallback',
		success:function (data) {
			testUnit.init(data)
		}
	})
})
$(function () {
	var multiple = getParam('multiple'),
	classId = getParam('id').split(',');

	var info = {
		'init': function(){
			var t = this,
				data = t.data;

			$('#per-name').text(localStorage.getItem('stuName'));

			if(multiple === 'false'){
				t.ajax(classId[0], function (dataJson) {
					t.setClass(dataJson);
				});
			} else {
				var liString = '',
					flag = {};

				for(var i in classId){
					var id = classId[i];
					flag[id] = false;

					t.ajax(id, function (dataJson) {
						data[dataJson['id']] = dataJson;
						flag[dataJson['id']] = true;

						//检查是否全部的jsonp都请求完成
						for(var j in flag){
							if(!flag[j]){
								return;
							}
						}

						for(var k in classId){
							var string = k == 0? ' class="selected"': '';
							liString += '<li' + string + '>' + data[classId[k]]['course'] + '</li>';
						}

						$('#c-name-select').html(liString);
						$('.triangle').show();
						$('#class-title').on('tap', t.show);
						t.setClass(data[classId[0]]);
					});
				}
			}
		},

		'ajax': function (id, callback) {
			$.ajax({
				type:"post",
				async: 'false',
				url:httpUrl + "?method=pubCourseDetail",
				data:{"id": id},
				dataType: "jsonp",
				success:function(data){
					(callback)(data.pubCourse);
				}
			})
		},

		'setClass': function (dataJson) {
			delete dataJson['id'];
			$('#class-title').text(dataJson['course']);

			for(var i in dataJson){
				$('#class-' + i).text(dataJson[i])
			}
		},

		'show': function (event) {
			var select = $('#c-name-select'),
				options = $('#c-name-select').children();

			selectShow('c-name-select', options.length, options.height());

			$('body').off('tap')
			//绑定选中事件w
			setTimeout(function () {
				$('body').one('tap', function(event) {
					var target = $(event.target);

					if(target.parents('#c-name-select').length !== 0){
						target.addClass('selected').siblings().removeClass();
						$('#class-title').text(target.text());
						info.setClass(info['data'][classId[target.index()]])
					}

					selectShow('c-name-select', 0);
				})
			}, 100)
		},

		'data': {}
	}

	info.init();
})
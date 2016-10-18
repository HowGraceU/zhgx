//新生报到流程
$(function (){
	$('#qrcode').click(function (event) {
		if(localStorage.getItem('qrcode') === 'false'){
			saveSuccess();
			event.preventDefault();
		}
	})

	$.ajax({
		type:'GET',
		url: httpUrl + '?method=studentFlow',
		data:{
			'lqNo':lqNo,
			'pcNo':pcNo
		},
		dataType: "jsonp",
		jsonp: "callback",
		jsonpCallback: "success_jsonp",
		success:function (data){
			var flowList = data.flowList,
					studentFlowList = data.studentFlowList,
					tamp;
			
			for(var i in studentFlowList){
				studentFlowList[studentFlowList[i]['flowNodeId']] = true;
			}

			flowList = flowList.filter(function(item){
				if(studentFlowList[item['flowNodeId']]){
					return true;
				} else {
					return false;
				}
			});

			for(var i in flowList){
				var flowName = flowList[i]['linkName'];

				var a = $(flowUnit.list[flowName]);
				a.addClass('finish');
				a.find('strong').text('(已完成)')
				a.prop('href', 'javascript:;');
			}
		}
	});

	var flowUnit = {};
	flowUnit.list = (function(){
		var json = {},
				aList = $('a');

		aList.each(function(index, el) {
			json[$(el).find('span').text()] = el;
		});

		return json;
	})();
});

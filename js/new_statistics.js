//新生报到流程
$(function (){
	$.ajax({
		type:'GET',
		url: httpUrl + '?method=studentStatis',
		data:{
			"pcNo":pcNo
		},
		dataType: "jsonp",
		jsonp: "callback",
		jsonpCallback: "success_jsonp",
		success:function (data){
			//console.log( data );
			var $new_statistics=$('.new_statistics');
			for( var i=0;i<data.studentList.length;i++ ){
				var Thtml=""
				var obj=data.studentList[i];
				var count=(parseInt(obj.count)/data.allCount*100).toFixed(2);
				Thtml+='<p><strong></strong><span>'+ data.studentList[i].linkName +'</span><span>'+ data.studentList[i].count +' 人<em>（'+count+'%）</em></span></span></p>';
				$new_statistics.append( Thtml );
			}
			$(".new_statistics p:eq(0) span:eq(1)").html(data.allCount+' 人');
			$(".new_statistics p:eq(1) span:eq(1)").html( data.leaveCount+' 人<em>（'+ ( count/2 ) +'%）</em>' );
		}
	});
});
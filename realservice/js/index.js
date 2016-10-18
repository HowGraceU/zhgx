
var ct="http://218.205.113.246:9000";
var ctx=ct+"/athena";
var theTime=		function CurentTime() {
							var now = new Date();
			
							var year = now.getFullYear(); //年
							var month = now.getMonth() + 1; //月
							var day = now.getDate(); //日
			
							var hh = now.getHours(); //时
							var mm = now.getMinutes(); //分
							var ss = now.getSeconds(); //秒
			
							var clock = year + "-";
			
							if(month < 10)
								clock += "0";
			
							clock += month + "-";
			
							if(day < 10)
								clock += "0";
			
							clock += day + " ";
			
							if(hh < 10)
								clock += "0";
			
							clock += hh + ":";
							if(mm < 10) clock += '0';
							clock += mm + ":";
			
							if(ss < 10) clock += '0';
							clock += ss;
							return(clock);
					};
					
 function getLocalTime(nS) {     
       return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");      
    }   ;
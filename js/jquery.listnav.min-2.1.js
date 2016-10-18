﻿function xm(){
			var Initials=$('.initials');
			var LetterBox=$('#letter');
			Initials.find('ul').append('<li>A</li><li>B</li><li>C</li><li>D</li><li>E</li><li>F</li><li>G</li><li>H</li><li>I</li><li>J</li><li>K</li><li>L</li><li>M</li><li>N</li><li>O</li><li>P</li><li>Q</li><li>R</li><li>S</li><li>T</li><li>U</li><li>V</li><li>W</li><li>X</li><li>Y</li><li>Z</li>');
			initials();
			
			var iH=$('.sort_letter:eq(0)').height()*1.6;  //获取第一个字母高度
			$(".initials ul li").click(function(){
				var _this=$(this);
				var LetterHtml=_this.html();
				LetterBox.html(LetterHtml).fadeIn();
				LetterBox.fadeOut();
				var _index = _this.index()
				if(_index==0){
					$('html,body').animate({scrollTop: '0px'}, 300);//点击第一个滚到顶部
				}else{
					var letter = _this.text();
					if($('#'+letter).length>0){
						var LetterTop = $('#'+letter).position().top;
						$('html,body').animate({scrollTop: LetterTop-iH+'px'}, 300);
					}
				}
			})
	
			var windowHeight=$(window).height();
			var footer=$('footer').height();
			Initials.height( windowHeight-$('.wrap_header').height()-footer );
			var $li=Initials.find('li');
			var $liH=Math.floor( Initials.height()/26 );
			$li.height( $liH+'px' ).css('lineHeight', $liH+'px');

	
	function initials() {//公众号排序
		var SortList=$(".sort_list");
		var SortBox=$(".sort_box");
		SortList.sort(asc_sort).appendTo('.sort_box');//按首字母排序
		function asc_sort(a, b) {
			return makePy($(b).find('.num_name').text().charAt(0))[0].toUpperCase() < makePy($(a).find('.num_name').text().charAt(0))[0].toUpperCase() ? 1 : -1;
		}
	
		var initials = [];
		var num=0;
		SortList.each(function(i) {
			var initial = makePy($(this).find('.num_name').text().charAt(0))[0].toUpperCase();
			if(initial>='A'&&initial<='Z'){
				if (initials.indexOf(initial) === -1)
					initials.push(initial);
			}else{
				num++;
			}
			
		});
		$.each(initials, function(index, value) {//添加首字母标签
			SortBox.append('<div class="sort_letter" id="'+ value +'">' + value + '</div>');
		});	
		for (var i =0;i<SortList.length;i++) {//插入到对应的首字母后面
			var letter=makePy(SortList.eq(i).find('.num_name').text().charAt(0))[0].toUpperCase();
			switch(letter){
				case "A":
					$('#A').after(SortList.eq(i));
					break;
				case "B":
					$('#B').after(SortList.eq(i));
					break;
				case "C":
					$('#C').after(SortList.eq(i));
					break;
				case "D":
					$('#D').after(SortList.eq(i));
					break;
				case "E":
					$('#E').after(SortList.eq(i));
					break;
				case "F":
					$('#F').after(SortList.eq(i));
					break;
				case "G":
					$('#G').after(SortList.eq(i));
					break;
				case "H":
					$('#H').after(SortList.eq(i));
					break;
				case "I":
					$('#I').after(SortList.eq(i));
					break;
				case "J":
					$('#J').after(SortList.eq(i));
					break;
				case "K":
					$('#K').after(SortList.eq(i));
					break;
				case "L":
					$('#L').after(SortList.eq(i));
					break;
				case "M":
					$('#M').after(SortList.eq(i));
					break;
				case "N":
					$('#N').after(SortList.eq(i));
					break;
				case "O":
					$('#O').after(SortList.eq(i));
					break;
				case "P":
					$('#P').after(SortList.eq(i));
					break;
				case "Q":
					$('#Q').after(SortList.eq(i));
					break;
				case "R":
					$('#R').after(SortList.eq(i));
					break;
				case "S":
					$('#S').after(SortList.eq(i));
					break;
				case "T":
					$('#T').after(SortList.eq(i));
					break;
				case "U":
					$('#U').after(SortList.eq(i));
					break;
				case "V":
					$('#V').after(SortList.eq(i));
					break;
				case "W":
					$('#W').after(SortList.eq(i));
					break;
				case "X":
					$('#X').after(SortList.eq(i));
					break;
				case "Y":
					$('#Y').after(SortList.eq(i));
					break;
				case "Z":
					$('#Z').after(SortList.eq(i));
					break;
				default:
					break;
			}
		};
	}

}
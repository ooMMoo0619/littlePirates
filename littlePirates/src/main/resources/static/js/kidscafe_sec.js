/**
 * 
 */
var s_page_count = 10;
var s_start_page = 1;
var s_cur_page = 1;

$(document).ready(function(){
	
		$("#browsers").on("change", function() {
		
		$.ajax({
 			type:"post",
 			url:"/kidscafe_sec/search",
 			data:{"sido": $(this).val(),
 					"pagenum": s_cur_page},
 			success:function(result){			
 				
 				$("#result").html(result);
 				
 				$("#firstresult").hide();
 							
				addsearchpaging();
				
 			},
 			error:function(){
 				alert("실패");
 			},
 			complete:function(){
 				//alert("작업 완료");
 			}
 		}); // ajax 종료 	

	});

	$("#gugun").on("change", function() {
		
		$.ajax({
 			type:"post",
 			url:"/kidscafe_sec/search_gu",
 			data:{"sido": $("#browsers").val(),
 				  "gu": $("#gugun").val(),
 				  "pagenum": s_cur_page},
 			success:function(result){
 			
 				$("#result").html(result);
 				
 				$("#firstresult").hide();
 							
				addsearchpaging();
				

 			},
 			error:function(){
 				alert("실패");
 			},
 			complete:function(){
 				//alert("작업 완료");
 			}
 		}); // ajax 종료 	

	});

 var area0 = ["시/도 선택","서울특별시","인천광역시","대전광역시","광주광역시","대구광역시","울산광역시","부산광역시","경기도","강원도","충청북도","충청남도","전라북도","전라남도","경상북도","경상남도","제주특별자치도"];
  var area1 = ["강남구","강동구","강서구","관악구","광진구","구로구","금천구","노원구","서초구","성동구","성북구","송파구","양천구","영등포구","용산구","은평구","종로구","중구","중랑구"];
   var area2 = ["계양구","남동구","동구","부평구","서구","연수구","중구","옹진군"];
   var area3 = ["동구","서구","유성구","중구"];
   var area4 = ["광산구","남구","북구","서구"];
   var area5 = ["달서구","동구","북구","서구","수성구","중구","달성군"];
   var area6 = ["남구","동구","북구","중구","울주군"];
   var area7 = ["강서구","금정구","남구","동구","동래구","부산진구","북구","사상구","사하구","서구","수영구","연제구","영도구","중구","해운대구","기장군"];
   var area8 = ["고양시","광명시","광주시","김포시","남양주시","부천시","성남시","시흥시","안산시","안성시","안양시","양주시","오산시","용인시","의왕시","의정부시","이천시","파주시","평택시","포천시","하남시","화성시","가평군","양평군","연천군"];
   var area9 = ["강릉시","동해시","삼척시","속초시","원주시","춘천시","태백시","고성군","양구군","양양군","영월군","인제군","정선군","철원군","평창군","홍천군","화천군","횡성군"];
   var area10 = ["제천시","청주시","충주시","괴산군","단양군","보은군","영동군","옥천군","음성군","증평군","진천군","청원군"];
   var area11 = ["계룡시","공주시","논산시","보령시","서산시","아산시","천안시","금산군","당진군","부여군","서천군","연기군","예산군","청양군","태안군","홍성군"];
   var area12 = ["군산시","익산시","전주시","정읍시","고창군","무주군","순창군","장수군","진안군"];
   var area13 = ["광양시","목포시","순천시","여수시","강진군","고흥군","곡성군","무안군","보성군","영암군","완도군","장성군","진도군","해남군","화순군"];
   var area14 = ["경산시","경주시","구미시","문경시","안동시","영주시","영천시","포항시","군위군","봉화군","성주군","영덕군","영양군","예천군","울릉군","울진군","의성군","청도군","청송군","칠곡군"];
   var area15 = ["거제시","김해시","밀양시","양산시","진주시","창원시","거창군","산청군","하동군"];
   var area16 = ["서귀포시","제주시"];


 // 시/도 선택 박스 초기화
 $("select[name^=browsers]").each(function() {
  $selsido = $(this);
  $.each(eval(area0), function() {
   $selsido.append("<option value='"+this+"'>"+this+"</option>");
  });
  $selsido.next().append("<option value=''>구/군 선택</option>");
 });


 // 시/도 선택시 구/군 설정
 $("select[name^=browsers]").change(function() {
  var area = "area"+$("option",$(this)).index($("option:selected",$(this))); // 선택지역의 구군 Array
  var $gugun = $(this).next(); // 선택영역 군구 객체
  $("option",$gugun).remove(); // 구군 초기화

  if(area == "area0")
   $gugun.append("<option value=''>구/군 선택</option>");
  else {
   $.each(eval(area), function() {
    $gugun.append("<option value='"+this+"'>"+this+"</option>");
   });
  }
 });


});

function addsearchpaging() {
 		var strpage = "";
 			
 		var current = $("#result").find("#s_cur_page").val();
		var end = s_start_page + s_page_count; 	
	 	var total_count = Number($("#s_total_count").val());
	 	var finalPageNo = parseInt(total_count / s_page_count);
		
	    if (total_count % s_page_count > 0) {
	        finalPageNo++;
	    }
	
	    if (finalPageNo < cur_page) {
	        cur_page = finalPageNo;
	    }
	    
	    if(end > finalPageNo) {
	    	end = finalPageNo+1;
	    }		   
 		
 		for(var i = s_start_page; i<end; i++) {
	 		if(i == current) {
				strpage += "<li class='page-item'><a href='javascript:gosearch("+ i +");'> <strong> <font color='red'>" + i + "</font> </strong> </a></li>"
			}
			else {
				strpage += "<li class='page-item'><a href='javascript:gosearch("+ i +");'>" + i + "</a></li>"
			}
		}

 		$(".pagination").html(strpage);
	}
	
function gosearch(page) {
	var s_type = $("#s_type").val();
	
	if(s_type == "sido") {
		$.ajax({
 			type:"post",
 			url:"/kidscafe_sec/search",
 			data:{"sido": $("#browsers").val(),
 					"pagenum": page},
 			success:function(result){			
 				
 				$("#result").html(result);
 				
 				$("#firstresult").hide();
 							
				addsearchpaging();
				
 			},
 			error:function(){
 				alert("실패");
 			},
 			complete:function(){
 				//alert("작업 완료");
 			}
 		}); // ajax 종료 	
	}

	if(s_type == "gu") {
		$.ajax({
 			type:"post",
 			url:"/kidscafe_sec/search_gu",
 			data:{"sido": $("#browsers").val(),
 				  "gu": $("#gugun").val(),
 				  "pagenum": page},
 			success:function(result){
 			
 				$("#result").html(result);
 				
 				$("#firstresult").hide();
 							
				addsearchpaging();
				

 			},
 			error:function(){
 				alert("실패");
 			},
 			complete:function(){
 				//alert("작업 완료");
 			}
 		}); // ajax 종료 	
	}
	

 		
 }
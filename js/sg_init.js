

$(document).ready(function(){
	
	SGE.setSpinner();
	SGE.loadMetaXml();
		
});

SGE.loadMetaXml=function(){
	// 메타 xml 로딩 시작
	/*
	$.ajax({
		type:"GET",
		url:SGE.Const.xmlName,
		dataType:"xml",
		success:SGE.parseMetaXml,
		error:function(xhr,status,error){
			console.log(status,error);	
		}
	})*/
	
	// 테스트일땐 에러창 한번 보자
	var url = (SGE.Const.testMode == "Y")? "xxx.xml" : SGE.Const.xmlName;
	
	var deferred =  $.ajax({
		type:"GET",
		url:url,
		cache: false,
		dataType:"xml",
	}).done(function(data){
		SGE.parseMetaXml(data);
	}).fail(function(data){
		console.log(data);	
		SGE.openErrorPop("meta_xml");
	});
}
SGE.openErrorPop=function(str){
	
	switch(str){
		
		// 메타 로딩 실패시 
		case "meta_xml":		
			$( "#dialog-load-error" ).dialog({
			  resizable: false,
			  height:200,
			  modal: true,
			  buttons: {
				"재시도": function() {
				  $( this ).dialog( "close" );
				  
				  SGE.Const.testMode = "N" // 재시도는 성공해야한다.
				  SGE.loadMetaXml();
				},
				"종료": function() {
				  $( this ).dialog( "close" );
				  trace("앱 종료시켜주세요");
				}
			  }
			});	
		break;
			
	}
}
	
	

function trace(obj){
	//console.log(obj);	
//	console.log(arguments);
	try{
		console.log.apply(console,arguments);
	}catch(e){}
}

//-------------------------------------------------------------------------------------
// 스핀 로딩 셋팅
SGE.setSpinner=function(){
	
	var opts = {
	  lines: 13, // The number of lines to draw
	  length: 20, // The length of each line
	  width: 10, // The line thickness
	  radius: 30, // The radius of the inner circle
	  corners: 1, // Corner roundness (0..1)
	  rotate: 0, // The rotation offset
	  direction: 1, // 1: clockwise, -1: counterclockwise
	  color: '#000', // #rgb or #rrggbb or array of colors
	  speed: 1, // Rounds per second
	  trail: 60, // Afterglow percentage
	  shadow: false, // Whether to render a shadow
	  hwaccel: false, // Whether to use hardware acceleration
	  className: 'spinner', // The CSS class to assign to the spinner
	  zIndex: 2e9, // The z-index (defaults to 2000000000)
	  top: '50%', // Top position relative to parent
	  left: '50%' // Left position relative to parent
	};

	var target = document.getElementById('spinner');	
	var spinner = new Spinner(opts).spin(target);
	SGE.Inst.spinner = $("#spinner").hide();
	
	// ajax 호출시마다 자동으로 로딩스핀 처리
	$(window).ajaxStart(function(){
		SGE.Inst.spinner.show();
	});
    $(window).ajaxStop(function(){
		SGE.Inst.spinner.hide();
	});
	
	
}
//-------------------------------------------------------------------------------------

// lcms 데이터 파싱
SGE.parseMetaXml=function(xml){
	trace("function parseMetaXml");
	var $xml = $(xml).find("main");
	//console.log("xml.@httpURL=" + $xml.attr("httpURL"));

	SGE.mydata ={};

	SGE.mydata.httpURL = $xml.attr("httpURL");
	SGE.mydata.cdnURL = $xml.attr("cdnURL");
	SGE.mydata.uploadURL = $xml.attr("uploadURL");
	SGE.mydata.summaryURL = $xml.attr("summaryURL");
	SGE.mydata.subject = (function(){
		if(SGE.mydata.httpURL.indexOf("jr_kuk_") > -1) return "kuk";
		else if(SGE.mydata.httpURL.indexOf("jr_suh_") > -1) return "suh";
		else if(SGE.mydata.httpURL.indexOf("jr_ton_") > -1) return "ton";
		else if(SGE.mydata.httpURL.indexOf("jr_sah_") > -1) return "sah";
		else if(SGE.mydata.httpURL.indexOf("jr_kwa_") > -1) return "kwa";
		return null;
	})();
	
	var httpUrlSplit = SGE.mydata.httpURL.split("/");
	SGE.mydata.studyFolder = httpUrlSplit.pop();//jr_kuk_201_01
			
	var studyCodeArr = SGE.mydata.studyFolder.split('_');
	//4번째 인덱스 이후로 제거
	studyCodeArr.splice(4);
	SGE.mydata.studyCode = studyCodeArr.join('_');
				
	httpUrlSplit.pop();
	
	var studyCodeSplit = SGE.mydata.studyCode.split("_");
	SGE.mydata.grade = studyCodeSplit[2].charAt(0);
	SGE.mydata.gradeForm = SGE.getGradeForm(SGE.mydata.grade);
	SGE.mydata.term = studyCodeSplit[2].charAt(2);
	SGE.mydata.chapter = parseInt(studyCodeSplit[3]).toString();//"01"을 "1"로//문자열
	//mydata.cdnURL = $xml.@cdnURL;
	SGE.mydata.currentHead = 0;
	
	SGE.mydata.title = $xml.find("intro").attr("title");
	SGE.mydata.unit = $xml.find("intro").attr("unit");

	SGE.mydata.page = $xml.find("content").attr("title").split("|")[1];
	
	SGE.mydata.itemNumObj={};
	SGE.mydata.content = {
		
		title:$xml.find("content").attr("title").split("|")[0],
		items:(function(){
					var arr = [];
					var movieflag = false;
					var summaryflag = false;
										
					//for each(var o in $xml.content.*){
					$xml.find('item').each(function(){
						var type = $(this).attr('type');
						var page = $(this).attr('page');
						var code = $(this).attr('code');
						
						var obj = {type:String(type), page:parseInt(page), code:String(code)};
						
						var str
						var jobj
						//각 메인메뉴에 하위태그가 있다면 루프
						var jsonTags="movie,summary,menutitle,menugroup";
						
						//for each(var p in o.*){
						$(this).children().each(function(idx){
						
							var pname = this.tagName;
							trace("pname ==== " + pname + "/" +jsonTags.indexOf(pname));
							if(jsonTags.indexOf(pname) > -1){
								str = $(this).text();
								if(str != ""){
									if(!movieflag) movieflag = true;
									//trace("str = " + str);
									jobj = JSON.parse(str);
									//trace("jobj = " + jobj);
								}
								
								obj[pname + "List"] = jobj;
							}
						});
						
						SGE.mydata.itemNumObj[type] = arr.length;
						
						arr.push(obj)
					});
					return arr;
					
			})()

		
	}
	
	trace("SGE.mydata == " , SGE.mydata);

	SGE.onCompleteParseMetaXml();
	
}

SGE.getGradeForm=function($grade){
		return ($grade%2 == 1)?$grade+""+($grade+1):($grade-1)+""+$grade;
}

// 메타 데이터 파싱이 끝났다.  다음엔 모하진
SGE.onCompleteParseMetaXml=function(){
	trace("SGE.onCompleteParseMetaXml");


	
	SGE.loadStyle(SGE.mydata.subject);
	
	//SGE.loadSkin(SGE.Const.SKININTRO,"#intro-skin","#skin");
	SGE.Event.trigger( SGE.Event.Const.StartLoadSkin, SGE.Const.SKININTRO );
	
	// iframe setting  아이프레임 관련 셋팅이다.


}
//----------------------------------------------------------------------------------------------------------------

/*
 해당과목의 스타일시트 로딩
 @param $subject
 */
SGE.loadStyle=function($subject){

	var skinStyleUrl= "css/" + $subject + "/" + "style.css";
	if (document.createStyleSheet){
	    document.createStyleSheet(skinStyleUrl);
	}else{
	    $('<link rel="stylesheet" type="text/css" href="' + skinStyleUrl + '" />').appendTo('head'); 
	}

}


//----------------------------------------------------------------------------------------------------------------



//------------------------------------------------------------------------------


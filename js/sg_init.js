
SGE.Const.SKININTRO = "intro";
SGE.Const.SKINSTUDY = "study";
SGE.Const.SKINREAD = "read";
SGE.Const.SKINSTRONG = "strong";
SGE.Const.SKINREALIZE = "realize";
SGE.Const.SKINTEST = "test";

//-------------------------------------------------------------------------------------
$(document).ready(function(){
	
	SGE.setSpinner();
		
	// 메타 xml 로딩 시작
	$.ajax({
		type:"GET",
		url:SGE.Const.xmlName,
		dataType:"xml",
		success:SGE.parseMetaXml,
		error:function(xhr,status,error){
			console.log(status,error);	
		}
	});

	
});


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
	
	
	trace("SGE.mydata == " , SGE.mydata);

	SGE.onCompleteParseMetaXml();
	
}

SGE.getGradeForm=function($grade){
		return ($grade%2 == 1)?$grade+""+($grade+1):($grade-1)+""+$grade;
}

// 메타 데이터 파싱이 끝났다.  다음엔 모하진
SGE.onCompleteParseMetaXml=function(){
	trace("SGE.onCompleteParseMetaXml");
	SGE.loadSkin(SGE.Const.SKININTRO,"#container","#container");
	
//	loadStudySkin();
}
//----------------------------------------------------------------------------------------------------------------

SGE.Var.currentSkinStr = null;
SGE.Var.nextSkinStr = null;
	

/*
스킨로드
@param str  스킨이름
@param $copyId  로드하는 스킨 html 에서 복사할 태그의 id
@param $pasteId 붙여넣을 태그의 id
*/
SGE.loadSkin=function(str , $copyId,$pasteId){
	trace("SGE.loadSkin");
	
	SGE.Var.nextSkinStr = str;

	if(SGE.Var.currentSkinStr && SGE.Var.currentSkinStr != "study"){// study 로딩할땐 예외다.
		SGE.removeCurrentSkin();
	}


	var skinId = str + "css";
	var skinStyleUrl= "skins/" + SGE.mydata.subject + "/" + str + ".css";
	$('head').append( $('<link rel="stylesheet" type="text/css"' + 'id="' + skinId + '" />').attr('href', skinStyleUrl) );
	

	var skinUrl = 	"skins/" + SGE.mydata.subject + "/skin_" + str + ".html  " + $copyId;
	//console.log("skinUrl=" + skinUrl);
	$($pasteId).load(skinUrl,function(txt,txtStatus,xhr){
		trace("onComplete skin load");
		//SGE.setSkin(this);
		SGE.onCompleteLoadSkin(this);
	});


}
SGE.removeCurrentSkin=function(){
	// 일단 css 지워라.
	$("#"+SGE.Var.currentSkin+"css").remove();// remove skin style
}

SGE.onCompleteLoadSkin=function(el){
	
	trace("SGE.onCompleteLoadSkin");
	SGE.Var.currentSkinStr = SGE.Var.nextSkinStr;
	
	var currentSkinInst = SGE.getSkinClassInstance(SGE.Var.currentSkinStr)
	currentSkinInst.setStage(el);
	
}
//------------------------------------------------------------------------------


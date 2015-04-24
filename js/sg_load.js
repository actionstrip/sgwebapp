
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

	/*  
	var skinId = str + "css";
	var skinStyleUrl= "skins/" + SGE.mydata.subject + "/" + str + ".css";
	$('head').append( $('<link rel="stylesheet" type="text/css"' + 'id="' + skinId + '" />').attr('href', skinStyleUrl) );
	-- 150413 이방식은. 메인에서 그냥 물고 있기로 한다.
	*/
	
	
	var skinUrl = 	"skins/" + SGE.mydata.subject + "/skin_" + str + ".html  " + $copyId;
	console.log("skinUrl=" + skinUrl);
	$($pasteId).load(skinUrl,function(txt,txtStatus,xhr){
		trace("onComplete skin load");
		 //console.timeStamp("onComplete skin loads");

		 $(this).waitForImages(function () {
    	    trace("오 로드완료네");
			//console.timeStamp("onComplete waitForImages");
		  	SGE.onCompleteLoadSkin(this);
	    });

		
	});
	//이방식은..  images 패스가 안맞아서 



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
	
	if(SGE.Var.currentSkinStr == SGE.Const.SKINSTUDY){// 스터디스킨은 저장해두고. 계속 접근해야 한다.
		SGE.Inst.studySkin = currentSkinInst;
		
		SGE.initloadContent();// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$//
	}else{// 메뉴클릭으로 로드되는 스킨들의 인스턴스
		SGE.Inst.currentSkin = currentSkinInst;
	}
	
}

//---------------------------------------------------------------------------------------------------------------------------
// 컨텐츠 로딩 전에 한번만 실행해라.
// 아이프레임 연결 관련 셋팅이다.
// SGE.onCompleteLoadSkin   StudySkin 로딩 끝나면 호출한다.

SGE.initloadContent=function()
{
	trace("initloadContent");
	var el = $("#iframe-content"); 		
	el.load(function(){
		
		trace("이건.. el.load 에서 찍은거다.loadContent complete");
	})
}

SGE.loadContent=function(url){
	
	var el = $("#iframe-content"); 
	el.attr("src",url);
			/*
            iframe.load( function() {
                //EC.debug("iframe load done");
                // Wait for inner composition to be bootstrapped
                innerWindow.AdobeEdge.bootstrapCallback(function (compId) {
                    //EC.debug("Inner composition was bootstrapped: ", LOG_GROUP, compId);
                    // alpha: ignore compId (just one inner comp supported so far)
                    var innerComp = innerWindow.AdobeEdge.getComposition(compId);
                    //EC.debug("innerComp", LOG_GROUP, innerComp);
                    //innerComp.getStage().$('targetContainer').html("<hr/>TEST<hr/>");
                    promise.resolve(innerComp, uniqueId, innerWindow.AdobeEdge);
                });
            });*/
       
}
SGE.onCompleteLoadContent=function($Method){

	trace("SGE.onCompleteLoadSkin");
	
	//trace("$Method.getFileName- " , $Method.getFileName());
	$Method.setNum(1);
	//$Method.setAnswer('["0"]');
	//$Method.verify();
	
	
	/*
	var fileName = $innerWindow.getFileName();
	trace("fileName-" , fileName);*/
}

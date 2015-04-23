//----------------------------------------------------------------------------------------------------------------
/*
모든 이벤트는 여길 통한다.
*/


SGE.Event=SGE.Event || $({});
SGE.Event.Const=SGE.Event.Const || {};

SGE.Event.Const.StartLoadSkin = "startLoadSkin";
SGE.Event.Const.OnSelectMainMenu = "selectMainMenu";

SGE.Event.Const.startLoadContent = "startLoadContent";
SGE.Event.Const.OnSelectSubMenu = "selectSubMenu";

SGE.Event.Const.onContentReady = "contentReady";

SGE.Event.on( SGE.Event.Const.StartLoadSkin, {},Event_StartLoadSkin);
SGE.Event.on( SGE.Event.Const.OnSelectMainMenu, {},Event_StartLoadSkin);

SGE.Event.on(SGE.Event.Const.startLoadContent,{},Event_StartLoadContent);
SGE.Event.on(SGE.Event.Const.OnSelectSubMenu,{},Event_StartLoadContent);

// iframe 에 컨텐츠가 로드 되었을때.  로드된 페이지에서 이벤트를 날려줍니다.
SGE.Event.on(SGE.Event.Const.onContentReady,{},Event_ContentReady);

/*
메인 메뉴가 클릭될때 호출됩니다.
*/
function Event_StartLoadSkin(e, $nextSkinStr){
	trace("EEE-Event_StartLoadSkin");
	// intro 와 study 
	if($nextSkinStr == SGE.Const.SKINSTUDY || $nextSkinStr == SGE.Const.SKININTRO){
		SGE.loadSkin($nextSkinStr,"#" + $nextSkinStr +"-skin","#skin-container-main");
	}else{// 여긴.. read,realize,test 등
		SGE.loadSkin($nextSkinStr,"#" + $nextSkinStr +"-skin","#skin-container-other");		
	}
		
};

/*
 페이지번호가 클릭될때  호출됩니다.
*/
function Event_StartLoadContent(e, $nextSubNum){
	trace("EEE-Event_StartLoadContent");
	//SGE.Inst.studySkin
	//SGE.Inst.currentSkin
	
	//SGE.Var.currentSkinStr // 현재스킨 스트링.  read , test, realize
	
	
	var filePath="contents/" + SGE.mydata.httpURL + "/" + SGE.mydata.studyCode + "_" + SGE.Var.currentSkinStr + "_" + SGE.Class.core.Utils.getStringChipher($nextSubNum) + "/";
	var fileUrl=filePath + "index.html";
	//filename=  jr_kuk_6-1/jr_kuk_601_03/jr_kuk_601_03_test.html
	
	trace("filename= " , fileUrl);

		
	SGE.loadContent(fileUrl); // fileUrl 파일을 iframe 에 로드해라.
}

/*
iframe 에 컨텐츠가 로드 되었을때.  로드된 페이지에서 이벤트를 날려줍니다.
*/
function Event_ContentReady(e,$Method){
	trace("EEE-Event_ContentReady");
	
	SGE.onCompleteLoadContent($Method);
	
}


//SGE.Event.trigger( SGE.Event.Const.StartLoadSkin, SGE.Const.SKINSTUDY );

/*
SGE.Event.on( "myCustomEvent", {
    foo: "bar"
}, function( event, arg1, arg2 ) {
    console.log( event.data.foo ); // "bar"
    console.log( arg1 );           // "bim"
    console.log( arg2 );           // "baz"
});*/

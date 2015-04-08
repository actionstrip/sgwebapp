// JavaScript Document

var SGE=SGE || {};

/*
* 해당 스킨 클래스 인스턴스를 반환한다.
*/
SGE.getSkinClassInstance=function(skinStr){
	
	var inst 
	
	switch(skinStr){
		
		case "intro":
			inst = IntroSkinFunc();
		break;	
	}
	
	return inst
}


/*
IntroSkin 클래스
*/
var IntroSkinFunc=function(){
	
	
	var setStage=function(el){
		trace("IntroSkinFunc > setStage");
		$("#unit").html("<h2>" + SGE.mydata.unit + "</h2>");
	}
	
	return{
		setStage:setStage	
	}
}

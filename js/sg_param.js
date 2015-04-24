// JavaScript Document

var SGE=SGE || {}; 

SGE.Param = SGE.Param || {};// 초기 파라메타
SGE.Const = SGE.Const || {};//글로벌 상수
SGE.Var=SGE.Var || {};//글로벌 변수
SGE.mydata=SGE.mydata || {};
SGE.Inst=SGE.Inst ||{}; // 인스턴스 참조 변수들 모아보자.
SGE.Class = SGE.Class || {}; 
SGE.Event=$({});// 모든이벤트는 여길통한다.
SGE.Fn ={};//함수모아.. 흠.. 이건 머 달라?? 


SGE.Const.SKINOPEN = "open";
SGE.Const.SKININTRO = "intro";
SGE.Const.SKINSTUDY = "study";
SGE.Const.SKINREAD = "read";
SGE.Const.SKINSTRONG = "strong";
SGE.Const.SKINREALIZE = "realize";
SGE.Const.SKINTEST = "test";
SGE.Const.SKINSUMMARY = "summary";


(function(){
	var urlString = location.href;
	var urlParamTemp = urlString.split("?");
	if(urlParamTemp.length > 1){
		var urlParamString = urlParamTemp[1];
		var urlParamArr = urlParamString.split("&");
		
		//변수에 파라메터 셋팅
		for (var i = 0; i < urlParamArr.length; i++) {
			var tempParam = urlParamArr[i].split("=");
			var paramKey = tempParam[0];
			try {
				var paramValue = tempParam[1];
			} catch (e) {
				var paramValue = "";
			}
		
			if (paramKey == "plan_de")
				SGE.Param.planDe = paramValue;
			else if (paramKey == "module_no")
				SGE.Param.moduleNo = paramValue;
			else if (paramKey == "subj_lesson_no")
				SGE.Param.subjLessonNo = paramValue;
			else if (paramKey == "subj_no")
				SGE.Param.subjNo = paramValue;
			else if (paramKey == "student_no")
				SGE.Param.studentNo = paramValue;
			else if (paramKey == "dictionary_no")
				SGE.Param.dictionaryNo = paramValue;
			else if (paramKey == "f_test_id")
				SGE.Param.fTestId = paramValue;
			else if (paramKey == "studying")
				SGE.Param.studying = paramValue;
			else if (paramKey == "adminmode")
				SGE.Param.adminmode = paramValue;
			else if (paramKey == "movieLimit")
				SGE.Param.movieLimit = paramValue; //학생별 동영상 제어여부 값
		}
	}
	
	SGE.Const.testMode = "Y";
		
	if(SGE.Const.testMode == "Y"){
		// 5-1 개정국어 1장 
		SGE.Param.subjLessonNo = "7280";
		SGE.Param.subjNo= "257";
		SGE.Param.planDe="";
		SGE.Param.moduleNo="";
		SGE.Param.studentNo="";
		SGE.Const.xmlName = "xml/jr_kuk_601_03.xml";	
	
	}
	//SGE.Const.xmlName = 'http://www.home-learn.com/sigong/student/cmpc/ReNewCStudentContentsListXml.do?subj_lesson_no=' + SGE.Param.subjLessonNo + '%26plan_de=' + SGE.Param.planDe + '%26module_no=' + SGE.Param.moduleNo + "%26student_no=" + SGE.Param.studentNo;
	
	
	SGE.Const.studying = SGE.Param.studying; //Y인 경우는 오늘의 학습 모듈넘버가 있는경우 학습내역 저장, N인경우는 예복습에서 띄우는 경우 학습내역 저장 안함
	SGE.Const.adminmode = SGE.Param.adminmode; //Y면 관리자에서 띄우는 경우, N이면 예복습이나 오늘의 학습
	SGE.Const.plan_de = SGE.Param.planDe;
	SGE.Const.module_no = SGE.Param.moduleNo;
	SGE.Const.student_no = SGE.Param.studentNo;
	SGE.Const.movieLimit = SGE.Param.movieLimit; //학생별 동영상 제어여부 값

})();

//---------------------------------------------------------------------
//메인메뉴 이름들.
SGE.Var.mainMenuName_obj={
		kuk:{
			open:"생각 열기",
			read:"교과서 읽기",
			realize:"개념 깨치기",
			summary:"교과서로 정리하기",
			test:"기본 핵심 문제"
		},
		suh:{
			innermovie:"단원 학습 줄기",
			open:"스토리텔링",
			strong:"개념 깨치기",
			summary:"교과서로 정리하기",
			test:"기본 핵심 문제"
		},
		sah:{
			innermovie:"단원 만나기",
			realize:"개념 깨치기",
			summary:"교과서로 정리하기",
			test:"기본 핵심 문제"
		},
		kwa:{
			innermovie:"단원 만나기",
			realize:"개념 깨치기",
			summary:"교과서로 정리하기",
			test:"기본 핵심 문제"
		}
}


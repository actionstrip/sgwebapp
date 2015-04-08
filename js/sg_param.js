// JavaScript Document

var SGE=SGE || {};

SGE.Param = {};// 초기 파라메타
SGE.Const = {};//글로벌 상수
SGE.Var={};//글로벌 변수
SGE.mydata={};
SGE.Inst={}; // 인스턴스 참조 변수들 모아보자.






(function(SGE){
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
	
	// 5-1 개정국어 1장 
	SGE.Param.subjLessonNo = "7280";
	SGE.Param.subjNo= "257";
	SGE.Param.planDe="";
	SGE.Param.moduleNo="";
	SGE.Param.studentNo="";
	SGE.Const.xmlName = "xml/jr_kuk_601_03.xml";	
	
	//SGE.Const.xmlName = 'http://www.home-learn.com/sigong/student/cmpc/ReNewCStudentContentsListXml.do?subj_lesson_no=' + SGE.Param.subjLessonNo + '%26plan_de=' + SGE.Param.planDe + '%26module_no=' + SGE.Param.moduleNo + "%26student_no=" + SGE.Param.studentNo;
	
	
	SGE.Const.studying = SGE.Param.studying; //Y인 경우는 오늘의 학습 모듈넘버가 있는경우 학습내역 저장, N인경우는 예복습에서 띄우는 경우 학습내역 저장 안함
	SGE.Const.adminmode = SGE.Param.adminmode; //Y면 관리자에서 띄우는 경우, N이면 예복습이나 오늘의 학습
	SGE.Const.testMode = "N";
	SGE.Const.plan_de = SGE.Param.planDe;
	SGE.Const.module_no = SGE.Param.moduleNo;
	SGE.Const.student_no = SGE.Param.studentNo;
	SGE.Const.movieLimit = SGE.Param.movieLimit; //학생별 동영상 제어여부 값

})(SGE);
// JavaScript Document
SGE.Class.core=SGE.Class.core || {};
SGE.Class.core.Utils={};


/*
	getStringChipher(7,100)  --> 007
	
*/
SGE.Class.core.Utils.getStringChipher=function($n,$chipher){
	
	$chipher = $chipher || 10;// 두자리가 기본이다.
	
	return String($chipher).substr(String($n).length) + String($n);
	
}
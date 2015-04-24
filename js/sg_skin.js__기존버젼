// JavaScript Document

//var SGE=SGE || {};
//SGE.Class = SGE.Class || {}; 
/*
* 해당 스킨 클래스 인스턴스를 반환한다.
*/

SGE.Class.skin={};

SGE.getSkinClassInstance=function(skinStr){
	
	var inst 
	
	switch(skinStr){
		
		case SGE.Const.SKININTRO:
			inst = new SGE.Class.skin.IntroSkinClass();
		break;	
		
		case SGE.Const.SKINSTUDY:
			inst = new SGE.Class.skin.StudySkinClass();
		break;	
	}
	
	return inst
}

/*
IntroSkin 클래스
*/
SGE.Class.skin.IntroSkinClass=function(){};

SGE.Class.skin.IntroSkinClass.prototype = {
	
	baseId:"#intro-skin",
	
	setStage:function(el){
		trace("IntroSkinFunc > setStage");
		$(this.baseId +" #unit").html("<h2>" + SGE.mydata.unit + "</h2>");
		
		$(this.baseId +" #enter").click(function(){
				SGE.Event.trigger( SGE.Event.Const.StartLoadSkin, SGE.Const.SKINSTUDY );
		})
	}	
	
}


/*
StudySkin 클래스
*/
SGE.Class.skin.StudySkinClass=function(){};

SGE.Class.skin.StudySkinClass.prototype = {
	
	baseId:"#study-skin",
	
	mainNavi:null,
		
	
	setStage:function(el){
		trace("StudySkinFunc > setStage");
		$(this.baseId + " #title").text(SGE.mydata.content.title)
		
		this.setNavigation();
	},
	
	setNavigation:function(){
		
		
		var menu_arr=[];
		
		var ul = $(this.baseId + " #selectable");
		ul.empty();
		
		var items = SGE.mydata.content.items;
		for(var i=0;i< items.length;i++){
			var item = items[i];
			var menuName = SGE.Var.mainMenuName_obj[SGE.mydata.subject][item.type];
			//trace("li=" + item.type);
			var li_el = $("<li><a href='#'></a></li>");
			ul.append(li_el);
			
			var a_el = el.children("a");
			a_el.text(menuName);
			a_el.attr("id","menu-" + item.type);
			
			var mObj = {};
			mObj.mIdx = i+1;
			mObj.type = item.type;
			mObj.tag=a_el;
			menu_arr.push(mObj);
		}
		
		
		this.mainNavi= new SGE.Class.core.MainNavigation();
		mainNavi.init(menu_arr);
		
	}
	
}




/*
 selected 메뉴선택 클래스
 disabled 비활성 클래스
 */
SGE.Class.core.MainNavigation = function(){
	
}
SGE.Class.core.MainNavigation.prototype={
	
	selectIdx:null,
	menu_arr:null,
	
	init:function(arr){
		var owner = this;
		this.menu_arr =arr;	
		
		for(var i=0;i<menu_arr.length;i++){
				
			var mObj = menu_arr[i];
			
			mObj.tag.click(function(){
				
				owner.selectMenu(mObj);
				
			});
			
			
		}
		
		
	}
	
	
}

//SGE.Fn.getMenuName=function(

	

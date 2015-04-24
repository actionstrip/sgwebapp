// JavaScript Document

//var SGE=SGE || {};
//SGE.Class = SGE.Class || {}; 
/*
* 해당 스킨 클래스 인스턴스를 반환한다.
*/

SGE.Class.skin= SGE.Class.skin || {};
SGE.Class.core= SGE.Class.core || {};

SGE.getSkinClassInstance=function(skinStr){
	
	var inst 
	
	switch(skinStr){
		
		case SGE.Const.SKININTRO:
			inst = new SGE.Class.skin.IntroSkinClass();
		break;	
		
		case SGE.Const.SKINSTUDY:
			inst = new SGE.Class.skin.StudySkinClass();
		break;	
		
		case SGE.Const.SKINTEST:
			inst = new SGE.Class.skin.TestSkinClass();
		break;
		
		case SGE.Const.SKINREAD:
			inst = new SGE.Class.skin.ReadSkinClass();
		break;	
		
		case SGE.Const.SKINREALIZE:
			inst = new SGE.Class.skin.RealizeSkinClass();
		break;	
		
		case SGE.Const.SKINSUMMARY:
			inst = new SGE.Class.skin.SummarySkinClass();
		break;	
		
		case SGE.Const.SKINOPEN:
			inst = new SGE.Class.skin.OpenSkinClass();
		break;	
		
		case SGE.Const.SKINSTRONG:
			inst = new SGE.Class.skin.StrongSkinClass();
		break;	
		
	}
	
	return inst
}

/*-------------------------------------------------------------------------------------------------------------------------
IntroSkin 클래스
*/

SGE.Class.skin.IntroSkinClass = SGE.Klass(function(){
	
	var baseId = "#intro-skin";
	
	
	function _constructor(){
    
    }
	
	function setStage(el){
		
		trace("IntroSkinFunc > setStage");
		$(baseId +" #unit").html("<h2>" + SGE.mydata.unit + "</h2>");
		
		$(baseId +" #enter").click(function(){
				SGE.Event.trigger( SGE.Event.Const.StartLoadSkin, SGE.Const.SKINSTUDY );
		})
	}
	
	function getBaseId(){	return baseId;	}
	
	return {
		_constructor:_constructor,
		setStage:setStage,
		getBaseId:getBaseId
	}
	
});


/*-------------------------------------------------------------------------------------------------------------------------
StudySkin 클래스
*/
SGE.Class.skin.StudySkinClass = SGE.Klass(function(){
    
    
	var baseId = "#study-skin";
	var mainNavi;
	var subNavi;
	
    function _constructor(){
    
    }
    
	
	function setStage(el){
		trace("StudySkinFunc > setStage");
		$(baseId + " #title").text(SGE.mydata.content.title)
		
		initNavigation();
		initSubNavigation();
	}
	
	function initNavigation(){
		
		
		var menu_arr=[];
		
		var ul = $(baseId + " #nav #selectable");
		ul.empty();
		
		var items = SGE.mydata.content.items;
		for(var i=0;i< items.length;i++){
			var item = items[i];
			var menuName = SGE.Var.mainMenuName_obj[SGE.mydata.subject][item.type];
			//trace("li=" + item.type);
			var li_el = $("<li><a href='#'></a></li>");
			ul.append(li_el);
			
			var a_el = li_el.children("a");
			a_el.text(menuName);
			a_el.attr("id","menu-" + item.type);
			a_el.attr("mIdx",String(i+1));
			
			var mObj = {};
			mObj.mIdx = i+1;
			mObj.type = item.type;
			mObj.tag=a_el;
			menu_arr.push(mObj);
		}
		
		
		mainNavi= new SGE.Class.core.MainNavigation();
		mainNavi.init(ul,menu_arr);
		
		mainNavi.exClick(1);
		
	}
	function initSubNavigation(){
		
		var el = $(baseId + " #paging");
		subNavi= new SGE.Class.core.SubNavigation();
		subNavi.init(el);
	}
	function resetSubNavigation($subMenuTotal,$selectNum){
		trace("study resetSubNavigation  ",$subMenuTotal);
		subNavi.reset($subMenuTotal,$selectNum);
		
		return subNavi;
	}
	
	function getBaseId(){	return baseId;	}
    
    return {_constructor:_constructor,
    		setStage:setStage,
			getBaseId:getBaseId,
			resetSubNavigation:resetSubNavigation
           };
    
})

/*-------------------------------------------------------------------------------------------------------------------------
 selected 메뉴선택 클래스
 disabled 비활성 클래스
 */
 
SGE.Class.core.MainNavigation = SGE.Klass(function(){
    
	
	var selectIdx;
	var menu_arr;
	var ul;// 최상위 ul 태그
    
    function _constructor(){
    
    }
    
	
	function init($ul,$arr){
		var owner = this;
		ul=$ul
		menu_arr =$arr;	
		
		for(var i=0;i<menu_arr.length;i++){
				
			var mObj = menu_arr[i];
			
			mObj.tag.click(function(){
				
				selectMenu($(this));
				
			});
			
			
		}
		
	}
	
	function selectMenu(el){
		
		var id= el.attr("id");
		var mIdx = el.attr("mIdx");
		var mObj = menu_arr[mIdx -1];
		// 이전 셀렉트 해제하고.
		$("#nav ul .selected").removeClass("selected");
		
		// 셀렉트 표시한다.
		el.addClass("selected");
		
		selectIdx = mIdx ;
		
		
		SGE.Event.trigger( SGE.Event.Const.OnSelectMainMenu, mObj.type );
	}
	
	function exClick(n){
		
		//var el = $("#nav ul").find("#page-"+ n);
		//		selectMenu(el);
		var mObj = menu_arr[n-1];
		
		selectMenu($(mObj.tag))
		

	}
	
	
    return {_constructor:_constructor,
 				init:init,
				exClick:exClick
           };
    
})



//-----------------------------------------------------------------------------------------------
SGE.Class.core.SubNavigation = SGE.Klass(function(){
    
	
	var selectIdx;
	
	var root_el;
	var prev_el;
	var next_el;
	var ul;
    
    function _constructor(){
    	trace("SubNavigation constructor");
    }
    
	
	function init($el){
		
		trace("SubNavigation init " , $el);
		
		root_el = $el;
		
		ul = root_el.find("#selectable");
		
		trace("#selectable " , ul);
		ul.empty();
				
	}
	
	function reset($subMenuTotal,$selectNum){
		
		trace("SubNavigation rest " , ul);
		ul.empty();
		
		/*
		ul.children().each(function(index, element) {
            
        });*/
				trace("what- ", $subMenuTotal);
		for(var i=0;i< $subMenuTotal;i++){
	
			
			var li_el = $("<li><a href='#'></a></li>");
			ul.append(li_el);
			
			var a_el = li_el.children("a");
			var n = (i+1);
			a_el.attr("id","page-" + n);
			a_el.data("id","page-" + n);
			a_el.data("sIdx",n);
			a_el.text(n);
						
			a_el.click(function(){
				
				selectMenu($(this));
				
			});
		}
		
		
	}
	
	
	function selectMenu(el){
		
		$("#navsub ul .selected").removeClass("selected");
		
		el.addClass("selected");
		
		trace("selected sIdx=", el.data("sIdx"));
		
		selectIdx = el.data("sIdx");
		
		SGE.Event.trigger( SGE.Event.Const.OnSelectSubMenu, selectIdx );
		
		
	}
	
	function exClick(n){
		
		var el = $("#navsub ul").find("#page-"+ n);
		selectMenu(el);
	}
	
    return {_constructor:_constructor,
 				init:init,
				reset:reset,
				exClick:exClick
           };
    
})

/*-------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------
ElementSkin 클래스
	- 모든  학습요소 스킨의  부모 
*/
SGE.Class.skin.ElementSkinClass = SGE.Klass(function(){
    
	
	
    function _constructor(){
		
    	trace("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
		this.type ="none";
		this.baseId = "#element-skin";
		this.item ="none";
		this.subNavi = "none";
		
	
    }
    function setStage(el){
		trace("ElementSkinFunc > setStage");
				trace("subMenuTotal== " , this.item);
				
		

		var n = SGE.mydata.itemNumObj[this.type]
		this.item = SGE.mydata.content.items[n];
		var subMenuTotal = this.item.page;
		
		this.subNavi =  SGE.Inst.studySkin.resetSubNavigation(subMenuTotal);
	}
    
	
/*	function getBaseId(){	return baseId;	}
	function setBaseId(str){ baseId = str	}*/
	
    return {_constructor:_constructor,
    		setStage:setStage,
           };
    
})
/*-------------------------------------------------------------------------------------------------------------------------
TestSkin 클래스
*/
SGE.Class.skin.TestSkinClass = SGE.Klass(SGE.Class.skin.ElementSkinClass,function(){
        
	
		//SGE.mydata.itemNumObj[type]
    function _constructor(){
		trace("TestSkinClass  > constructor");
    	//SGE.Class.skin.TestSkinClass.uber.setBaseId("#test-skin");
		this.baseId="#test-skin";
		this.type = SGE.Const.SKINTEST;
		//trace("item1==== " ,this.item);
		
		
//		trace("item2==== " ,this.item);
		
    }
    function setStage(el){
		SGE.Class.skin.TestSkinClass.uber.setStage.call(this,el);
		
		this.subNavi.exClick(1);
		//trace("testSkinFunc > setStage");
		//trace("TestSkinClass setStage item==== " ,this.item);
	}
    	
    return {_constructor:_constructor,
    		setStage:setStage
           };
    
})

/*-------------------------------------------------------------------------------------------------------------------------
OpenSkin 클래스
*/
SGE.Class.skin.OpenSkinClass = SGE.Klass(SGE.Class.skin.ElementSkinClass,function(){
    
    function _constructor(){
    	//SGE.Class.skin.OpenSkinClass.uber.setBaseId("#open-skin");
		this.baseId="#open-skin";
		this.type = SGE.Const.SKINOPEN;
    }
    function setStage(el){
		SGE.Class.skin.OpenSkinClass.uber.setStage.call(this,el);
		trace("OpenSkinFunc > setStage");
		this.subNavi.exClick(1);
	}
    	
    return {_constructor:_constructor,
    		setStage:setStage,
           };
    
})

/*-------------------------------------------------------------------------------------------------------------------------
ReadSkin 클래스
*/
SGE.Class.skin.ReadSkinClass = SGE.Klass(SGE.Class.skin.ElementSkinClass,function(){
    
    function _constructor(){
    	//SGE.Class.skin.ReadSkinClass.uber.setBaseId("#read-skin");
		this.baseId="#read-skin";
		this.type = SGE.Const.SKINREAD;
    }
    function setStage(el){
		SGE.Class.skin.ReadSkinClass.uber.setStage.call(this,el);
		trace("ReadSkinFunc > setStage");
		this.subNavi.exClick(1);
	}
    	
    return {_constructor:_constructor,
    		setStage:setStage
           };
    
})

/*-------------------------------------------------------------------------------------------------------------------------
RealizeSkin 클래스
*/
SGE.Class.skin.RealizeSkinClass = SGE.Klass(SGE.Class.skin.ElementSkinClass,function(){
    
    function _constructor(){
		//SGE.Class.skin.RealizeSkinClass.uber.setBaseId("#realize-skin");
		this.baseId="#realize-skin";
		this.type = SGE.Const.SKINREALIZE;
    }
    function setStage(el){
		SGE.Class.skin.RealizeSkinClass.uber.setStage.call(this,el);
		trace("RealizeSkinFunc > setStage");
		this.subNavi.exClick(1);
	}
    	
    return {_constructor:_constructor,
    		setStage:setStage
           };
    
})
/*-------------------------------------------------------------------------------------------------------------------------
StrongSkin 클래스
*/
SGE.Class.skin.StrongSkinClass = SGE.Klass(SGE.Class.skin.ElementSkinClass,function(){
    
    function _constructor(){
    	//SGE.Class.skin.StrongSkinClass.uber.setBaseId("#strong-skin");
		this.baseId="#strong-skin";
		this.type = SGE.Const.SKINSTRONG;
    }
    function setStage(el){
		SGE.Class.skin.StrongSkinClass.uber.setStage.call(this,el);
		trace("StrongSkinFunc > setStage");
		this.subNavi.exClick(1);
	}
    	
    return {_constructor:_constructor,
    		setStage:setStage
           };
    
})
/*-------------------------------------------------------------------------------------------------------------------------
SummarySkin 클래스
*/
SGE.Class.skin.SummarySkinClass = SGE.Klass(SGE.Class.skin.ElementSkinClass,function(){
        
    function _constructor(){
    	//SGE.Class.skin.SummarySkinClass.uber.setBaseId("#summary-skin");
		this.baseId="#summary-skin";
		this.type = SGE.Const.SKINSUMMARY;
    }
    function setStage(el){
		SGE.Class.skin.SummarySkinClass.uber.setStage.call(this,el);
		trace("SummarySkinFunc > setStage");
		this.subNavi.exClick(1);
	}
    	
    return {_constructor:_constructor,
    		setStage:setStage
           };
    
})




	

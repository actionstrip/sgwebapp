$(document).ready(function(){
	//api.jqueryui.com/selectable/
	$("#selectable").selectable({
		selected:function(event,ui){
			var str = $(ui.selected).attr("name")
			SGE.loadSkin(str);
		}
	});	
});


var SGE={};
SGE.currentSkinType

SGE.log=function(str){
	console.log("j--",str);
//		console.log(str);
}

SGE.loadSkin=function(str){
	
	$("#"+SGE.currentSkinType+"css").remove();// remove skin style
	
	
	SGE.currentSkinType = str;
	var skinId = str + "css";
	var skinStyleUrl= "css/" + str + ".css";
	$('head').append( $('<link rel="stylesheet" type="text/css"' + 'id="' + skinId + '" />').attr('href', skinStyleUrl) );
	
	var skinUrl = 	str + ".html  #skinContents";
	//console.log("skinUrl=" + skinUrl);
	$("#skin").load(skinUrl,function(txt,txtStatus,xhr){
		SGE.log("onComplete skin load");
		SGE.setSkin(this);
	});
}

SGE.setSkin=function(el){
	SGE.log("SGE.setSkin()");
	
	$("#skinSelectable").selectable({
		selected:function(event,ui){
			var str = $(ui.selected).attr("name")
			//SGE.loadSkin(str);
			SGE.log("load content-" + str);
			
			var contentUrl = "comps/" + SGE.currentSkinType + "/" +str + "/" +  str + ".html"
			var promise = SGE.loadComposition(contentUrl, $("#skinIframe"));
			promise.done(function(innerComp,uniqueId,innerAdobeEdge){
				
				SGE.log("promise done !!");
				SGE.log(innerComp);
				
				var stage =innerComp.getStage();
				SGE.log(stage);

				var compType = stage.getCompType();
				SGE.log("compType == " + compType);
				
			});
		}
	});
}

SGE.loadComposition = function(src, symbolOrElement) {
        // Check arguments 
        
        try {
            // Symbol or Element
            var el= symbolOrElement;
            SGE.log("el= "+ el);
            // Inject IFrame
            var uniqueId = "ec_"+Math.random().toString(36).substring(7);
            el.html('<iframe id="'+uniqueId+'" src="'+src+'" style="visibility:hidden; overflow: hidden; width: 100%; height: 100%; margin: auto; border: 0 none; background-color: rgba(255,255,255,0)" onload="this.style.visibility=\'visible\';"></iframe>');

            SGE.log("src= "+ src);
            // Create promise
            var promise = new jQuery.Deferred();
            
            // Wait for IFrame to be loaded
            var iframe = jQuery("#"+uniqueId);
			            SGE.log("iframe= "+ iframe);
            //EC.debug("iframe", LOG_GROUP, iframe);
            var innerWindow = iframe[0].contentWindow;
			
		            SGE.log("innerWindow = "+ innerWindow );
            //EC.debug("innerWindow", LOG_GROUP, innerWindow);
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
            });
        } 
        catch (err) {
            SGE.log("error !!!");
        }
        return promise;
}  

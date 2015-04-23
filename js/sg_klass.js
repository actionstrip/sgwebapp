
var SGE=SGE || {};
SGE.Klass = function(){
	var Parent, props, Child, F, i;
	if( arguments.length == 1){
		Parent = Object;
		//props = arguments[0];
		if( typeof arguments[0] === "function" ){
			props = arguments[0]() || {};
		}else{
			props = arguments[0];
		}
	}else if( arguments.length == 2){
		Parent = arguments[0];
		//props = arguments[1];
		if( typeof arguments[1] === "function" ){
			props = arguments[1]() || {};
		}else{
			props = arguments[1];
		}
	}else{
		console.log("Klass arguments.length : ", arguments.length);
		return {};
	}
	
	Child = function(){
		if( Child.uber && Child.uber.hasOwnProperty("_constructor") ){
			Child.uber._constructor.apply( this, arguments );
		}
		if( Child.prototype.hasOwnProperty("_constructor") ){
			Child.prototype._constructor.apply( this, arguments );
		}
	};
	
	F = function(){};
	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child.uber = Parent.prototype;
	Child.prototype.constructor = Child;
	
	for( i in props ){
		if( props.hasOwnProperty(i) ){
			Child.prototype[i] = props[i];
		}
	}
	
	return Child;
}
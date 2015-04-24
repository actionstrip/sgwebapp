/*

var str = "KKK"
function Test(){
    
    var str="Name";
    var getName=function(){
        return this.str;
    }
    
    this.name="Jang Jun";
    this.getName=function(){
        return str;
    }
    
}

console.log("str",str);
*/


var Test = SGE.Klass((function(){
    
    var private_name = "hi";
        
    function _constructor(str){
       // console.log("parent_constructor",str);
        this.name = str;
    }
    
    function getName(){
       // console.log("getName",name);
        return this.name;   
    }
    
    
    return {_constructor:_constructor,
            getName:getName,
            name:private_name
           };
    
}))

var Test2 = SGE.Klass(Test,(function(){
    
    var subname;
    
    function _constructor(str){
       // console.log("sub _constructor",str);
        subname = str;
    }
    
    function getName2(){
       // return Test2.uber.name;
        return this.name;   
    }
    function getSubName(){
       // return Test2.uber.name;
        return subname;
    }
    
    return {_constructor:_constructor,
            getSubName:getSubName,
            getName2:getName2
        };
}));


var ttt= (function(){
    
    var name;
    var _publicName="publicName";
    
    function _constructor(str){
      //  console.log("_constructor",str);
        this.publicName = str;
    }
    
    function getName(){
        console.log("getName",name);
        return this.publicName;   
    }
    function setName(str){
        this.publicName = "jun";
    }
    
    return {_constructor:_constructor,
            getName:getName,
            setName:setName,
            publicName:_publicName
           };
    
})();

console.log(1,ttt.getName());
ttt.setName("jun");
console.log(2,ttt.getName());

console.log(3,ttt.publicName);



/*
var Test = SGE.Klass({
    _constructor:function(what){
        console.log("_constructor");
        this.name = what;
    },                     
    getName:function(){
        return  this.name;
    }
     
});*/
/*
var t= new Test("jun");
//t._constructor("jun");
console.log(t.getName());
console.log(t instanceof Test);
*/
var t2= new Test2("ok");
console.log("inst",t2.name);
t2.name="ktj";
console.log("getName2",t2.getName2());
console.log("getSubName",t2.getSubName());
console.log(t2 instanceof Test);
console.log(t2 instanceof Test2);

var t3 = new Test("newName3");
console.log("getName",t3.getName());
var t4 = new Test2("newName4");
console.log("getName",t4.getName2());


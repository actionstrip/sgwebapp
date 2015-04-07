// JavaScript Document

$.ajax({
	type:"GET",
	url:SGE.Const.xmlName,
	dataType:"xml",
	success:parseMetaXml,
	error:function(xhr,status,error){
		console.log(status,error);	
	}
});

function parseMetaXml(xml){
	console.log(xml);
}
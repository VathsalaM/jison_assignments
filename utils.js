var converter = require('number-to-words');

var utils = {list:[]};

var identity = function(number){
	return number;
}

var operations = {
	"+" : {name:"plus",op:function(a,b){return a+b;}},
	"*" : {name:"times",op:function(a,b){return a*b;}},
	"-" : {name:"minus",op:function(a,b){return a-b;}},
	"/" : {name:"div",op:function(a,b){return a/b;}},
	"=" : {name:"assign",op:function(a,b){return b;}}
}

var evaluate = function(){
	return operations[operator];
}

utils.add = function(parseTree){
	this.list.push(parseTree);
}

utils.newTree = function(leftChild,node,rightChild){
	return {leftChild:leftChild,rightChild:rightChild,node:node};
}

var represent = function(parseTree,delimiters,convertFunc,operatorFunc){
	var data = JSON.parse(JSON.stringify(parseTree));
	var result = data.children.reduce(function(prevResult,child){
		if(typeof(child) != 'number'){
			child = represent(child,delimiters,ConvertFunc,operatorFunc);
		}else{
			child = convertFunc(child);
		}
		return (prevResult.length>0)?prevResult+" "+operatorFunc(data.node)+" "+child:child.toString();
	},'')
	return delimiters[0]+result+delimiters[1];
}

utils.parse = function(){
	console.log(evaluate(this.list));
	// console.log(represent(parseTree,["( " , " )"],identity,identity));
	// console.log(represent(parseTree,["( " , " )"],converter.toWords,operatorToWord));
}

module.exports = utils;

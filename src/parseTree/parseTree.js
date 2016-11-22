var NumberNode = require('./nodes/numberNode.js');

var ParseTree = function(node,children){
	this.node = node;
	var argKeys = Object.keys(arguments).slice(1);
	var args = arguments;
	this.children = argKeys.map(function(key){ return args[key]; });
};

ParseTree.prototype.toStr = function(openBrace,cloceBrace,space){
	var node = this.node;
    var result = this.children.slice(1).reduce(function(prevResult,child){
        return prevResult + space + node.toStr("(",")",space)+ space+child.toStr("(",")",space);
    },openBrace+this.children[0].toStr("(",")",space));
    return result+cloceBrace;
};

ParseTree.prototype.represent = function(){
	var node = this.node;
    var result = this.children.slice(1).reduce(function(prevResult,child){
        return prevResult + " "+ node.represent()+ " "+child.represent()
    },"( "+this.children[0].represent());
    return result+" )";
};

ParseTree.prototype.evaluate = function(){
	var node = this.node;
	var evaluatedChildrenList = this.children.map(function(child){ return child.evaluate();});
	return evaluatedChildrenList.slice(1).reduce(function(a,b){return node.evaluate(a,b)},evaluatedChildrenList[0]);
};

ParseTree.prototype.replaceIdentifiers = function(identifiers){
	var identSet = new Set(Object.keys(identifiers));
	this.children.forEach(function(child){
			child.replaceIdentifiers(identifiers);
	})
}

ParseTree.prototype.toJS = function(identifiers){
	var code = this.toStr("","","");
	if(this.node.value=="="){
		return "var "+code+ ";";
	}
	return "console.log("+ code +");";
}

module.exports = ParseTree;
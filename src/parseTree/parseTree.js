var NumberNode = require('./nodes/numberNode.js');

var ParseTree = function(node,children){
	this.node = node;
	var argKeys = Object.keys(arguments).slice(1);
	this.children = argKeys.map(function(key){ return arguments[key]; });
};

var addBraces = function(value) {
	return value.toStr("(",")",space);
};

ParseTree.prototype.toStr = function(openBrace,cloceBrace,space){
	var node = this.node;
    var result = this.children.slice(1).reduce(function(prevResult,child){
        return addBraces(prevResult) + space + addBraces(node) + space + addBraces(child);
    }, openBrace);
    return result + cloceBrace;
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

ParseTree.prototype.toJS = function(){
	var code = this.toStr("","","");
	if(this.node.value=="="){
		return "var "+code+ ";";
	}
	return "console.log("+ code +");";
}

module.exports = ParseTree;
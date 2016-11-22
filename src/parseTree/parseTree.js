var NumberNode = require('./nodes/numberNode.js');

var ParseTree = function(node,children){
	this.node = node;
	var argKeys = Object.keys(arguments).slice(1);
	var args = arguments;
	this.children = argKeys.map(function(key){ return args[key]; });
};

ParseTree.prototype.toStr = function(){
	var node = this.node;
    var result = this.children.slice(1).reduce(function(prevResult,child){
        return prevResult + " "+ node.toStr()+ " "+child.toStr();
    },"( "+this.children[0].toStr());
    return result+" )";
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
	var start = evaluatedChildrenList[0];
	// console.log('tree ',this.toStr());
	for(var i=1;i<evaluatedChildrenList.length;i++){
		// console.log("start: ",start.toStr());
		// console.log("next: ",evaluatedChildrenList[i].toStr());
		start = node.evaluate(start,evaluatedChildrenList[i]);
	}
	// return evaluatedChildrenList.reduce(function(a,b){return node.evaluate(a,b)},new NumberNode(0));
	return start;
};

ParseTree.prototype.replaceIdentifiers = function(identifiers){
	var identSet = new Set(Object.keys(identifiers));
	// console.log("identSet: ",identSet)
	this.children.forEach(function(child){
		// console.log("child: ",child.toStr());
		// if(identSet.has(child.name)){
			// console.log("child before: ",child.toStr())
			child.replaceIdentifiers(identifiers);
			// console.log("child after: ",child.toStr())
		// }
	})
}

module.exports = ParseTree;
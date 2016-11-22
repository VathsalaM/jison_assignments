var Evaluator = function(){
	this.parseTrees = [];
};

Evaluator.prototype.evaluate = function(){
	var identifiers = {};
	// console.log(this.parseTrees.length);
	var result = this.parseTrees.map(function(parseTree){
		parseTree.replaceIdentifiers(identifiers);
		// console.log("parseTree....",parseTree.toStr());
		var result = parseTree.evaluate();
		// console.log("==>",result.toStr());
		if(result.type == 'identifier'){
			identifiers[result.name] = result.value;
		}
		return result;
	});
	return result.filter(function(node){return node.type!='identifier'})
};

Evaluator.prototype.addTree = function(parseTree){
	// console.log("adding",this.parseTrees.length);
	this.parseTrees.push(parseTree);
	// console.log("afterAdding..",this.parseTrees.length);
}

module.exports = Evaluator;
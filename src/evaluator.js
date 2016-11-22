var Evaluator = function(){
	this.parseTrees = [];
};

Evaluator.prototype.evaluate = function(){
	var identifiers = {};
	var result = this.parseTrees.map(function(parseTree){
		parseTree.replaceIdentifiers(identifiers);
		var result = parseTree.evaluate();
		if(!parseTree.node){
			result.makeParent();
		}else if(result.type == 'identifier'){
			identifiers[result.name] = result.value;
		}
		return result;
	});
	return result.filter(function(node){return (node.type!='identifier')||(node.isParent)})
};

Evaluator.prototype.addTree = function(parseTree){
	this.parseTrees.push(parseTree);
}

module.exports = Evaluator;
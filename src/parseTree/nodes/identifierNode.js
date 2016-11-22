var IdentifierNode = function(name){
	this.name = name;
	this.value;
    this.type = "identifier";
    this.evaluate = function(){ return this;}
};

IdentifierNode.prototype.toStr = function(){
	return this.value?this.value.toString():this.name;
};

IdentifierNode.prototype.replaceIdentifiers = function(identifiers){
	this.value = identifiers[this.name];
};

IdentifierNode.prototype.replaceValue = function(newValue){
	this.value = newValue
}
module.exports = IdentifierNode;
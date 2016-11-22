var number_to_words = require('number-to-words');

var NumberNode = function(value){
    this.value = value;
    this.type = "number";
    this.isParent;
    this.evaluate = function(){return this};
};

NumberNode.prototype.toStr = function(){
	return this.value.toString();
};

NumberNode.prototype.represent = function(){
	return number_to_words.toWords(this.value);
};

NumberNode.prototype.replaceIdentifiers = function(identifiers){
};

NumberNode.prototype.makeParent = function(){
	this.isParent = true;
};

module.exports = NumberNode;
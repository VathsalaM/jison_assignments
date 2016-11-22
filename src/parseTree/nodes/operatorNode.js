var operators = require('./operators.js');

var OperatorNode = function(value){
    this.value = value;
    this.type = "operator";
    this.isParent;
    this.evaluate = operators[value].eval;
};

OperatorNode.prototype.toStr = function(){
	return this.value.toString();
};

OperatorNode.prototype.represent = function(){
	return operators[this.value].name;
}

OperatorNode.prototype.makeParent = function(){
	this.isParent = true;
}

OperatorNode.prototype.toJS = function(){
	return this.toStr();
}

module.exports = OperatorNode;


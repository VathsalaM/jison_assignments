var operators = require('./operators.js');

var OperatorNode = function(value){
    this.value = value;
    this.type = "operator";
    this.evaluate = operators[value].eval;
};

OperatorNode.prototype.toStr = function(){
	return this.value.toString();
};

OperatorNode.prototype.represent = function(){
	return operators[this.value].name;
}

module.exports = OperatorNode;


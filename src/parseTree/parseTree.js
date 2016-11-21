var node = require('./node');

var parseTree = function(node,children){
	this.node = node;
	this.children = children;
}

parseTree.prototype.createOperatorNode = function(nodeName) {
	return new node(nodeName,'operator')
};


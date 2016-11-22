var assert=require('chai').assert;
var Evaluator = require('../src/evaluator.js');
var OperatorNode = require('../src/parseTree/nodes/operatorNode.js');
var NumberNode = require('../src/parseTree/nodes/numberNode.js');
var IdentifierNode = require('../src/parseTree/nodes/identifierNode.js');
var ParseTree = require('../src/parseTree/parseTree.js');

describe("addTree",function(){
	it("should add tree in evaluator",function(){
		var plus = new OperatorNode("+");
        var arg1 = new NumberNode(1);
        var arg2 = new NumberNode(2);
        var tree1 = new ParseTree(plus,arg1,arg2);
        var tree2 = new ParseTree(plus,arg1,arg2);
        var evaluator = new Evaluator();
        evaluator.addTree(tree1);
        evaluator.addTree(tree2);
        assert.equal(evaluator.parseTrees.length,2);
	});
});

describe("evaluate",function(){
	it("should evauate all trees and return result",function(){
		var plus = new OperatorNode("+");
        var arg1 = new NumberNode(1);
        var arg2 = new NumberNode(2);
        var tree1 = new ParseTree(plus,arg1,arg2);
        var tree2 = new ParseTree(plus,arg1,arg2);
        var evaluator = new Evaluator();
        evaluator.addTree(tree1);
        evaluator.addTree(tree2);
        var actual = evaluator.evaluate();
        assert.equal(actual[0].value,3);
        assert.equal(actual[1].value,3);
        assert.equal(actual.length,2)
	});
	it("should evauate all trees and substitute the variables",function(){
		var plus = new OperatorNode("+");
	    var arg1 = new NumberNode(1);
	    var arg2 = new IdentifierNode("x");
	    var tree1 = new ParseTree(new OperatorNode("="),new IdentifierNode("x"),new NumberNode(2));
	    var tree2 = new ParseTree(plus,arg1,arg2);
	    var evaluator = new Evaluator();
	    evaluator.addTree(tree1);
	    evaluator.addTree(tree2);
	    var actual = evaluator.evaluate();
	    assert.equal(actual.length,1);
	    assert.equal(actual[0].value,3);
	});
})
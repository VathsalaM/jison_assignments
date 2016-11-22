var assert=require('chai').assert;
var ParseTree = require('../src/parseTree/ParseTree.js');
var OperatorNode = require('../src/parseTree/nodes/operatorNode.js');
var NumberNode = require('../src/parseTree/nodes/numberNode.js');
var IdentifierNode = require('../src/parseTree/nodes/identifierNode.js');

describe("new",function(){
	it("should create new parse tree with a node and its child",function(){
	    var actual = new ParseTree("+",1);
	    var expected = {node:"+",children:[1]}
		assert.deepEqual(actual.node,expected.node);
		assert.deepEqual(actual.children,expected.children);
	});
    it("should create new parse tree with a node and its children",function(){
        var actual = new ParseTree("+",1,2,3,4);
        var expected = {node:"+",children:[1,2,3,4]}
        assert.deepEqual(actual.node,expected.node);
        assert.deepEqual(actual.children,expected.children);
    });
});

describe("evaluate",function(){
    it("should evaluate the tree and return result",function(){
        var plus = new OperatorNode("+");
        var arg1 = new NumberNode(1);
        var arg2 = new NumberNode(2);
        var actual = new ParseTree(plus,arg1,arg2).evaluate();
        var expected = 3;
        assert.equal(actual.value,expected);
    })
})

describe("represent",function(){
    it("should represent the tree using paranthesis and value",function(){
        var plus = new OperatorNode("+");
        var arg1 = new NumberNode(1);
        var arg2 = new NumberNode(2);
        var actual = new ParseTree(plus,arg1,arg2).represent();
        var expected = "( one plus two )";
        assert.equal(actual,expected);
    });
});

describe("toString",function(){
    it("should return the tree in string format ",function(){
        var plus = new OperatorNode("+");
        var arg1 = new NumberNode(1);
        var arg2 = new NumberNode(2);
        var actual = new ParseTree(plus,arg1,arg2).toStr("( "," )"," ");
        var expected = "( 1 + 2 )";
        assert.equal(actual,expected);
    })
})

describe("replaceIdentifiers",function(){
    it("should replace all identifiers with their values",function(){
        var plus = new OperatorNode("+");
        var arg1 = new NumberNode(1);
        var arg2 = new IdentifierNode("x");
        var actual = new ParseTree(plus,arg1,arg2);
        actual.replaceIdentifiers({"x":2});
        var expected = "( 1 + 2 )";
        assert.equal(actual.toStr("( "," )"," "),expected);
    })
});

describe("toJS",function(){
    it("should return console.log if it is not assignment",function(){
        var plus = new OperatorNode("+");
        var arg1 = new NumberNode(1);
        var arg2 = new IdentifierNode("x");
        var actual = new ParseTree(plus,arg1,arg2);
        var expected = "console.log(1+x);";
        assert.equal(actual.toJS(),expected);
    });
    it("should return var if it is assignment",function(){
        var plus = new OperatorNode("+");
        var arg1 = new NumberNode(1);
        var arg2 = new NumberNode(2);
        var parseTree = new ParseTree(plus,arg1,arg2);
        var actual = new ParseTree(new OperatorNode("="),new IdentifierNode("x"),parseTree);
        var expected = "var x=(1+2);";
        assert.equal(actual.toJS(),expected);
    })
})
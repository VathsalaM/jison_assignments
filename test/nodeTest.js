var assert=require('chai').assert;
var OperatorNode = require('../src/parseTree/nodes/operatorNode.js');
var NumberNode = require('../src/parseTree/nodes/numberNode.js');
var IdentifierNode = require('../src/parseTree/nodes/identifierNode.js');

describe("OperatorNode",function(){
    it("should return new node with its type, value and evaluate function",function(){
        var actual = new OperatorNode("+");
        var expected = {type:"operator",value:"+",evaluate:function(a,b){return a+b}}
        assert.deepEqual(actual.type,expected.type);
        assert.deepEqual(actual.value,expected.value);
        assert.deepEqual(actual.evaluate(new NumberNode(1),new NumberNode(2)).value,expected.evaluate(1,2));
    });
});

describe("NumberNode",function(){
    it("should return new node with its type, value and evaluate function",function(){
        var actual = new NumberNode(1);
        var expected = {type:"number",value:1,evaluate:function(a){return a}}
        assert.deepEqual(actual.type,expected.type);
        assert.deepEqual(actual.value,expected.value);
        assert.deepEqual(actual.evaluate().value,expected.evaluate(1));

    });
});

describe("IdentifierNode",function(){
    it("should return new node with its type, value and evaluate function",function(){
        var actual = new IdentifierNode("x");
        actual.replaceValue(1);
        var expected = {type:"identifier",value:1,evaluate:function(a){return a}}
        assert.deepEqual(actual.type,expected.type);
        assert.deepEqual(actual.value,expected.value);
        assert.deepEqual(actual.evaluate().value,1);

    });
});
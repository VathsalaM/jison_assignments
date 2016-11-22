var NumberNode = require('./numberNode.js');
var identifierNode = require('./identifierNode.js');

var operators = {
    "+" : {value:"+",name:"plus",eval:function(a,b){return new NumberNode(a.value+b.value);}},
    "-" : {value:"-",name:"minus",eval:function(a,b){return new NumberNode(a.value-b.value);}},
    "*" : {value:"*",name:"times",eval:function(a,b){return new NumberNode(a.value*b.value);}},
    "/" : {value:"/",name:"div",eval:function(a,b){return new NumberNode(a.value/b.value);}},
    "=" : {value:"=",name:"assign",eval:function(a,b){a.replaceValue(b.value);return a;}},
    "^" : {value:"^",name:"pow",eval:function(a,b){return new NumberNode(Math.pow(a.value,b.value))}}
};

module.exports = operators;
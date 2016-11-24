/* lexical grammar */

%{
	var ParseTree = require('./src/parseTree/parseTree.js');
	var Eval = require('./src/evaluator.js');
	var evaluator = new Eval();
	var NumberNode = require('./src/parseTree/nodes/numberNode.js');
	var OperatorNode = require('./src/parseTree/nodes/operatorNode.js');
	var IdentifierNode = require('./src/parseTree/nodes/identifierNode.js');
%}

%lex
%%
\s+         							{/* skip whitespace */}
[0-9]+("."[0-9]+)?\b					return 'NUMBER'
[a-zA-Z]+		                     	return 'IDENTIFIER'
"-"           							return '-';
"/"           							return '/';
"+"										return '+';
"*"           							return '*';
"^"           							return '^';
"("           							return '(';
")"           							return ')';
"="           							return 'ASSIGNMENT_OPERATOR';
";"           							return ';';
<<EOF>>        							return 'EOF';
.             							return 'INVALID';

/lex

%left '+' '-'
%left '*' '/'
%left '^'

%%

EX 
	: expression_list EOF 
		{
			evaluator.toJS();
		}
	;

expression_list
	:	expression 
	|	expression_list	expression 
	;

expression	
	: 	assignment_expression statement {$$ = evaluator.addTree($$);}
	|	eval_expression	statement {$$ = evaluator.addTree($$);}
	;

assignment_expression 
	:	IDENTIFIER ASSIGNMENT_OPERATOR eval_expression 
			{$$ = new ParseTree(new OperatorNode($2),new IdentifierNode($1),$3);}
	;

value 
	:	IDENTIFIER	{$$=new IdentifierNode(yytext);}
	|	NUMBER 		{$$=new NumberNode(Number(yytext))}
	;

eval_expression
    : eval_expression '+' eval_expression
        {$$ = new ParseTree(new OperatorNode($2),$1,$3);}
    | eval_expression '-' eval_expression
        {$$ = new ParseTree(new OperatorNode($2),$1,$3);}
    | eval_expression '*' eval_expression
        {$$ = new ParseTree(new OperatorNode($2),$1,$3);}
    | eval_expression '/' eval_expression
        {$$ = new ParseTree(new OperatorNode($2),$1,$3);}
    | eval_expression '^' eval_expression
        {$$ = new ParseTree(new OperatorNode($2),$1,$3);}
    | '(' eval_expression ')'
    	{$$ = $2;}
    | value
    ;

statement 
	: ';'
	;
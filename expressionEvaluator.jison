/* lexical grammar */

%lex
%%
\n										{	if(yylloc.first_line==1 && yylloc.first_column==0){
												ParseTree = require('./src/parseTree/parseTree.js');
												Eval = require('./src/evaluator.js');
												evaluator = new Eval();
												NumberNode = require('./src/parseTree/nodes/numberNode.js');
												OperatorNode = require('./src/parseTree/nodes/operatorNode.js');
												IdentifierNode = require('./src/parseTree/nodes/identifierNode.js');
											}
										}
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
	:	expression_list EOF { 
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
	:	IDENTIFIER ASSIGNMENT_OPERATOR eval_expression {$$ = new ParseTree(new OperatorNode($2),new IdentifierNode($1),$3);}
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
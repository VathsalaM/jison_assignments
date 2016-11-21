/* lexical grammar */

%lex
%%
\n										{	if(yylloc.first_line==1 && yylloc.first_column==0)
												parser = require('./utils.js');
										}
\s+         							{/* skip whitespace */}
[0-9]+("."[0-9]+)?\b					return 'NUMBER'
[a-zA-Z]+		                     	return 'IDENTIFIER'
"-"           							return '-';
"/"           							return '/';
"+"										return '+';
"*"           							return '*';
"="           							return 'ASSIGNMENT_OPERATOR';
";"           							return ';';
<<EOF>>        							return 'EOF';
.             							return 'INVALID';

/lex

%%

EX 
	:	expression_list EOF { 
								parser.parse();
							}
	;

expression_list
	:	expression
	|	expression_list	expression 
	;

expression	
	:	assignment_expression statement {parser.add($$);}
	|	eval_expression	statement {parser.add($$);}
	;

assignment_expression 
	:	IDENTIFIER ASSIGNMENT_OPERATOR NUMBER {$$ = parser.newTree($1,$2,$3);}
	;

value 
	:	IDENTIFIER	{$$=yytext}
	|	NUMBER 		{$$=Number(yytext)}
	;

OPERATOR
	:	'+'
	|	'-'
	|	'*'
	|	'/'
	;

eval_expression
	:	value OPERATOR eval_expression {$$ = parser.newTree($1,$2,$3);}
	|	value
	;	

statement 
	: ';'
	;
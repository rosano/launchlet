import { parse } from 'acorn';
import { simple } from 'acorn-walk';

const flaggedIdentifiers = [
	'eval',
	'Function',
];

export const _LCHFlags = function(inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('LCHErrorInputInvalid');
	}

	let ast = parse(inputData);

	if (!ast.body.length) {
		return [];
	};

	if (ast.body.length > 1) {
		return ['LCHFlagMultipleExpressions']
	};

	if (ast.body[0].type === 'ExpressionStatement' && ast.body[0].expression.type === 'SequenceExpression' && ast.body[0].expression.expressions.length > 1) {
		return ['LCHFlagMultipleExpressions']
	};

	let outputData = [];

	simple(ast, {
	  Identifier(node) {
	  	if (flaggedIdentifiers.indexOf(node.name) !== -1) {
	  		outputData.push('LCHFlagEvaluatesString')
	  	};
	  },
	  MemberExpression(node) {
	  	if (flaggedIdentifiers.indexOf(node.property.name) !== -1) {
	  		outputData.push('LCHFlagEvaluatesString')
	  	};
	  },
	})

	return outputData;
};

export const LCHFlags = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputInvalid');
	}

	return Object.entries(inputData).reduce(function (coll, item) {
		const flags = typeof item[1] === 'string' ? _LCHFlags(item[1]) : [];
		
		if (flags.length) {
			(coll = coll || {})[item[0]] = flags
		};
		
		return coll;
	}, null);
};

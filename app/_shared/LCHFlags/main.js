import { parse } from 'acorn';
import { simple } from 'acorn-walk';

export const _LCHFlags = function(inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('LCHErrorInputNotValid');
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

	function flagIdentifier(inputData) {
		if (['eval', 'Function'].indexOf(inputData) !== -1) {
			outputData.push('LCHFlagEval')
		};

		if (['cookie', 'localStorage', 'sessionStorage', 'indexedDB', 'Cache'].indexOf(inputData) !== -1) {
			outputData.push('LCHFlagStateful')
		};

		if (['XMLHttpRequest', '$', 'fetch'].indexOf(inputData) !== -1) {
			outputData.push('LCHFlagStateful')
		};
	}

	simple(ast, {
	  Identifier(node) {
	  	flagIdentifier(node.name)
	  },
	  MemberExpression(node) {
	  	flagIdentifier(node.property.name)
	  },
	})

	return outputData;
};

export const LCHFlags = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputNotValid');
	}

	return Object.entries(inputData).reduce(function (coll, item) {
		const flags = typeof item[1] === 'string' ? _LCHFlags(item[1]) : [];

		if (flags.length) {
			(coll = coll || {})[item[0]] = flags
		};

		return coll;
	}, null);
};

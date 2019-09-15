import { parse } from 'acorn';
import { simple } from 'acorn-walk';

const flaggedIdentifiers = [
	'eval',
	'Function',
];

export const _LCHSafetyFlags = function(inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('LCHErrorInputInvalid');
	}

	let outputData = [];

	simple(parse(inputData), {
	  Identifier(node) {
	  	if (flaggedIdentifiers.indexOf(node.name) !== -1) {
	  		outputData.push('LCHSafetyFlagEvaluatesString')
	  	};
	  },
	  MemberExpression(node) {
	  	if (flaggedIdentifiers.indexOf(node.property.name) !== -1) {
	  		outputData.push('LCHSafetyFlagEvaluatesString')
	  	};
	  },
	})

	return outputData;
};

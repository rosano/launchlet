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

export const LCHSafetyFlags = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputInvalid');
	}

	return Object.entries(inputData).reduce(function (coll, item) {
		const flags = _LCHSafetyFlags(item[1]);
		
		if (flags.length) {
			(coll = coll || {})[item[0]] = flags
		};
		
		return coll;
	}, null);
};

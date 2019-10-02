export const LCHBuildFunctionString = function(param1, param2 = '') {
	if (typeof param1 !== 'string') {
		throw new Error('LCHErrorInputNotValid');
	}

	if (typeof param2 !== 'string') {
		throw new Error('LCHErrorInputNotValid');
	}

	return `function (${ param2 }) { ${ param1 } }`;
};

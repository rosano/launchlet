export const LCHBookmarkletLogicFilter = function (inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('LCHErrorInputInvalid');
	}

	return function (e) {
		return [].concat([e.name]).concat(e.labels).filter(function (e) {
			if (!e) {
				return false;
			}

			return e.match(new RegExp(inputData, 'i'));
		}).length > 0;
	};
};

export const LCHLinkElements = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null || typeof inputData.querySelectorAll !== 'function') {
		throw new Error('LCHErrorInputInvalid');
	}
	return [].concat.apply([], inputData.querySelectorAll('a')).filter(function (e) {
		if (!e.href) {
			return false;
		};
		
		if (!e.textContent.trim() && !e.title.trim()) {
			return false;
		};
		
		return true;
	}).map(function (e) {
		return {
			LCHRecipeName: e.textContent.trim() || e.title.trim(),
		};
	});
};

export const LCHActiveDocumentLinkElementsCallback = function() {
	return LCHLinkElements(document);
};

export const LCHActiveDocumentLinkElementsRecipe = function() {
	return {
		LCHRecipeName: 'Active Document Link Elements',
		LCHRecipeOutputType: 'SubjectContainer',
		LCHRecipeCallback: LCHActiveDocumentLinkElementsCallback,
		LCHRecipeSignature: 'LCHActiveDocumentLinkElements',
	};
};

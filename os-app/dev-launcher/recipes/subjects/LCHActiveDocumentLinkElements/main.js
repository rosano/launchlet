// https://stackoverflow.com/questions/1599660/which-html-elements-can-receive-focus
const LCHFocusElementsSelector= [
	'a[href]:not([tabindex="-1"])',
].join(',')

export const LCHLinkElements = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null || typeof inputData.querySelectorAll !== 'function') {
		throw new Error('LCHErrorInputInvalid');
	}
	return [].concat.apply([], inputData.querySelectorAll(LCHFocusElementsSelector)).filter(function (e) {
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
			LCHRecipeCallback () {
				return e;
			},
			LCHRecipeOutputType: 'DOMElement',
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

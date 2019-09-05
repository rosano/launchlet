// https://stackoverflow.com/questions/1599660/which-html-elements-can-receive-focus
const LCHFocusElementsSelector= [
	'a[href]:not([tabindex="-1"])',
  // 'area[href]:not([tabindex="-1"])',
  // 'input:not([disabled]):not([tabindex="-1"])',
  // 'select:not([disabled]):not([tabindex="-1"])',
  // 'textarea:not([disabled]):not([tabindex="-1"])',
  // 'button:not([disabled]):not([tabindex="-1"])',
  // 'iframe:not([tabindex="-1"])',
  // '[tabindex]:not([tabindex="-1"])',
  // '[contentEditable=true]:not([tabindex="-1"])',
].join(',')

export const LCHActiveDocumentsFocusElements = function(inputData) {
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

export const LCHActiveDocumentFocusElementsCallback = function() {
	return LCHActiveDocumentsFocusElements(document);
};

export const LCHActiveDocumentFocusElementsRecipe = function() {
	return {
		LCHRecipeName: 'Active Document Link Elements',
		LCHRecipeOutputType: 'SubjectContainer',
		LCHRecipeCallback: LCHActiveDocumentFocusElementsCallback,
		LCHRecipeSignature: 'LCHActiveDocumentFocusElements',
	};
};

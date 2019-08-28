export const LCHInputElements = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null || typeof inputData.querySelectorAll !== 'function') {
		throw new Error('LCHErrorInputInvalid');
	}

	const labels = Array.from(inputData.querySelectorAll('label'));
	return [].concat.apply([], inputData.querySelectorAll('input')).map(function (e) {
		const label = labels.filter(function (label) {
			return label.getAttribute('for') === e.id;
		}).map(function (e) {
			return e.textContent.trim();
		}).shift();

		return {
			names: [
				label && e.id ? label : '',
				e.placeholder.trim(),
				e.name.trim(),
			].filter(function (e) {
				return !!e;
			}),
			element: e,
		};
	}).filter(function (e) {
		if (!e.names.length) {
			return false;
		};
		
		if (e.element.type === 'hidden') {
			return false;
		};
		
		return true;
	}).map(function (e) {
		return {
			LCHRecipeName: e.names.shift(),
			LCHRecipeCallback () {
				return e.element;
			},
			LCHRecipeOutputType: 'DOMElement',
		};
	});
};

export const LCHActiveDocumentInputElementsCallback = function() {
	return LCHInputElements(document);
};

export const LCHActiveDocumentInputElementsRecipe = function() {
	return {
		LCHRecipeName: 'Active Document Input Elements',
		LCHRecipeOutputType: 'SubjectContainer',
		LCHRecipeCallback: LCHActiveDocumentInputElementsCallback,
		LCHRecipeSignature: 'LCHActiveDocumentInputElements',
	};
};

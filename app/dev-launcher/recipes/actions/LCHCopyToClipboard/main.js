export const LCHCopyToClipboardCallback = function(inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('LCHErrorInputNotValid');
	}

	if (!inputData.trim().length) {
		throw new Error('LCHErrorInputNotValid');
	}

	// if (typeof navigator !== 'undefined' && navigator.clipboard) {
	// 	return Promise.resolve((async function () {
	// 		return await navigator.clipboard.writeText(inputData);
	// 	})());
	// }

	// if (typeof document !== 'undefined') {
	// 	(function () {
	// 		const el = document.createElement('textarea');

	// 		el.value = inputData;

	// 		el.setAttribute('readonly', '');
	// 		el.style.position = 'fixed';
	// 		el.style.top = 0;

	// 		document.body.appendChild(el);
	// 		el.select();
	// 		document.execCommand('copy');

	// 		el.remove();
	// 	})();
	// }

	return {
		LCHComponentDescriptorName: 'LCHCopyToClipboard',
		LCHComponentDescriptorProps: {
			inputData: inputData,
		},
		LCHComponentDescriptorCompletionHandlerSignature: 'LCHCopyToClipboardCompletionHandler',
		LCHComponentDescriptorOLSKLocalized: true,
	};
};

export const LCHCopyToClipboardRecipe = function() {
	return {
		LCHRecipeSignature: 'LCHCopyToClipboard',
		LCHRecipeInputTypes: 'String',
		LCHRecipeCallback: LCHCopyToClipboardCallback,
	};
};

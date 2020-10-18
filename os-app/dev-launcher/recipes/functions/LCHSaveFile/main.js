import FileSaver from 'file-saver';

export const LCHSaveFileCallback = function(param1, param2) {
	if (typeof param1 !== 'string') {
		throw new Error('LCHErrorInputNotValid');
	}

	if (typeof param2 !== 'string') {
		throw new Error('LCHErrorInputNotValid');
	}

	if (!param2.trim()) {
		throw new Error('LCHErrorInputNotValid');
	}

	return FileSaver.saveAs(new Blob([param1], {type: 'text/plain;charset=utf-8'}), param2);
};

export const LCHSaveFileRecipe = function() {
	return {
		LCHRecipeSignature: 'LCHSaveFile',
		LCHRecipeCallback: LCHSaveFileCallback,
	};
};

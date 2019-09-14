export const LCHVitrinePageColoursRestoreIsHidden = function() {
	return !document.querySelector('style.LCHVitrinePageColoursRandomize');
};

export const LCHVitrinePageColoursRestoreCallback = function() {
	document.querySelector('style.LCHVitrinePageColoursRandomize').remove()
};

export const LCHVitrinePageColoursRestoreRecipe = function() {
	return {
		LCHRecipeCallback: LCHVitrinePageColoursRestoreCallback,
		LCHRecipeSignature: 'LCHVitrinePageColoursRestore',
		LCHRecipeIsHidden: LCHVitrinePageColoursRestoreIsHidden,
	};
};

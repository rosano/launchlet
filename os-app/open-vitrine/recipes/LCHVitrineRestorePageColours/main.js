export const LCHVitrineRestorePageColoursIsHidden = function() {
	return !document.querySelector('style.LCHVitrinePageColoursRandomize');
};

export const LCHVitrineRestorePageColoursCallback = function() {
	document.querySelector('style.LCHVitrinePageColoursRandomize').remove()
};

export const LCHVitrineRestorePageColoursRecipe = function() {
	return {
		LCHRecipeCallback: LCHVitrineRestorePageColoursCallback,
		LCHRecipeSignature: 'LCHVitrineRestorePageColours',
		LCHRecipeIsHidden: LCHVitrineRestorePageColoursIsHidden,
	};
};

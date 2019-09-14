import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting'

export const LCHVitrineRestorePageColoursIsHidden = function() {
	return !document.querySelector('style.LCHVitrineRandomizePageColours');
};

export const LCHVitrineRestorePageColoursCallback = function() {
	document.querySelector('style.LCHVitrineRandomizePageColours').remove()
};

export const LCHVitrineRestorePageColoursRecipe = function() {
	return {
		LCHRecipeCallback: LCHVitrineRestorePageColoursCallback,
		LCHRecipeSignature: 'LCHVitrineRestorePageColours',
		LCHRecipeIsHidden: LCHVitrineRestorePageColoursIsHidden,
	};
};

export const LCHServiceSearchWikipediaCallback = function() {
	return 'https://wikipedia.org/w/index.php?search=LCHSEARCHTOKEN';
};

export const LCHServiceSearchWikipediaRecipe = function() {
	return {
		LCHRecipeName: 'Wikipedia',
		LCHRecipeOutputType: 'ServiceSearchURLTemplate',
		LCHRecipeCallback: LCHServiceSearchWikipediaCallback,
		LCHRecipeSignature: 'LCHServiceSearchWikipedia',
	};
};

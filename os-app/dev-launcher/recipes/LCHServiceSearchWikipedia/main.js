export const LCHServiceSearchWikipediaCallback = function() {
	return 'https://en.wikipedia.org/w/index.php?search=LCHSEARCHTOKEN1+LCHSEARCHTOKEN2';
};

export const LCHServiceSearchWikipediaRecipe = function() {
	return {
		LCHRecipeName: 'Wikipedia',
		LCHRecipeOutputType: 'ServiceSearchURLTemplate',
		LCHRecipeCallback: LCHServiceSearchWikipediaCallback,
		LCHRecipeSignature: 'LCHServiceSearchWikipedia',
	};
};

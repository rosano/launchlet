export const LCHVitrinePageLinksHighlightRemoveIsHidden = function() {
	return !document.querySelector('style.LCHVitrinePageLinksHighlightAdd');
};

export const LCHVitrinePageLinksHighlightRemoveCallback = function() {
	document.querySelector('style.LCHVitrinePageLinksHighlightAdd').remove()
};

export const LCHVitrinePageLinksHighlightRemoveRecipe = function() {
	return {
		LCHRecipeCallback: LCHVitrinePageLinksHighlightRemoveCallback,
		LCHRecipeSignature: 'LCHVitrinePageLinksHighlightRemove',
		LCHRecipeIsExcluded: LCHVitrinePageLinksHighlightRemoveIsHidden,
	};
};

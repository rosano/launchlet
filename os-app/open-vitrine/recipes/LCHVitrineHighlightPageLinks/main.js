export const LCHVitrineHighlightPageLinksIsHidden = function() {
	return document.querySelector('style.LCHVitrineHighlightPageLinks');
};

export const LCHVitrineHighlightPageLinksCallback = function() {
	let element = document.body.appendChild(document.createElement('style'))
	
	element.classList.add('LCHVitrineHighlightPageLinks')
	element.innerHTML = `a { background: yellow; }`
};

export const LCHVitrineHighlightPageLinksRecipe = function() {
	return {
		LCHRecipeCallback: LCHVitrineHighlightPageLinksCallback,
		LCHRecipeSignature: 'LCHVitrineHighlightPageLinks',
		LCHRecipeIsHidden: LCHVitrineHighlightPageLinksIsHidden,
	};
};

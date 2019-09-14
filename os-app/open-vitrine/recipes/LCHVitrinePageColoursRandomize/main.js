export const LCHVitrinePageColoursRandomizeCallback = function() {
	let element = document.querySelector('style.LCHVitrinePageColoursRandomize')
	
	if (!element) {
		document.body.appendChild(element = document.createElement('style')).classList.add('LCHVitrinePageColoursRandomize')
	};

	const random = Math.random() * 100

	element.innerHTML = `
	body {

	--LCHVitrineBackground: hsl(0, 0%, ${ random }%);
	--LCHVitrineForeground: hsl(0, 0%, ${ 100.0 - random }%);
	}
`
};

export const LCHVitrinePageColoursRandomizeRecipe = function() {
	return {
		LCHRecipeCallback: LCHVitrinePageColoursRandomizeCallback,
		LCHRecipeSignature: 'LCHVitrinePageColoursRandomize',
	};
};

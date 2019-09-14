export const LCHVitrineRandomizePageColoursCallback = function() {
	let element = document.querySelector('style.LCHVitrineRandomizePageColours')
	
	if (!element) {
		document.body.appendChild(element = document.createElement('style')).classList.add('LCHVitrineRandomizePageColours')
	};

	const random = Math.random() * 100

	element.innerHTML = `
	body {

	--LCHVitrineBackground: hsl(0, 0%, ${ random }%);
	--LCHVitrineForeground: hsl(0, 0%, ${ 100.0 - random }%);
	}
`
};

export const LCHVitrineRandomizePageColoursRecipe = function() {
	return {
		LCHRecipeCallback: LCHVitrineRandomizePageColoursCallback,
		LCHRecipeSignature: 'LCHVitrineRandomizePageColours',
	};
};

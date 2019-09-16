export const LCHVitrinePageColoursRandomizeCallback = function() {
	let element = document.querySelector('style.LCHVitrinePageColoursRandomize')
	
	if (!element) {
		document.body.appendChild(element = document.createElement('style')).classList.add('LCHVitrinePageColoursRandomize')
	};

	let random = Math.random()

	const match = element.innerHTML.match(/LCHVitrineBackground: hsl\(0\, 0\%\, (.*)\%/)
	if (match) {
		const previous = parseFloat(match.pop()) / 100;

		while (Math.abs(random - previous) < 0.5) {
			random = Math.random();
		}
	};

	element.innerHTML = `
	body {

	--LCHVitrineBackground: hsl(0, 0%, ${ random * 100 }%);
	--LCHVitrineForeground: hsl(0, 0%, ${ 100.0 - random * 100 }%);
	}
`
};

export const LCHVitrinePageColoursRandomizeRecipe = function() {
	return {
		LCHRecipeCallback: LCHVitrinePageColoursRandomizeCallback,
		LCHRecipeSignature: 'LCHVitrinePageColoursRandomize',
	};
};

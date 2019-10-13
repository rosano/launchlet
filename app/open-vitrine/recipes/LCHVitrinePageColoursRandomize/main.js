export const LCHVitrinePageColoursRandomizeCallback = function() {
	let element = document.querySelector('style.LCHVitrinePageColoursRandomize')

	if (!element) {
		document.body.appendChild(element = document.createElement('style')).classList.add('LCHVitrinePageColoursRandomize')
	};

	let random = Math.random()

	const match = element.innerHTML.match(/LCHCommonBackground: hsl\(0\, 0\%\, (.*)\%/)
	if (match) {
		const previous = parseFloat(match.pop()) / 100;

		while (Math.abs(random - previous) < 0.1 || (random >= 0.4 && random <= 0.6)) {
			random = Math.random();
		}
	};

	element.innerHTML = `
	body {
	--LCHCommonBackground: hsl(0, 0%, ${ random * 100 }%);
	--LCHCommonForeground: hsl(0, 0%, ${ 100.0 - random * 100 }%);
	}
`
};

export const LCHVitrinePageColoursRandomizeRecipe = function() {
	return {
		LCHRecipeCallback: LCHVitrinePageColoursRandomizeCallback,
		LCHRecipeSignature: 'LCHVitrinePageColoursRandomize',
	};
};

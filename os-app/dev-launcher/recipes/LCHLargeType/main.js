export const LCHLargeTypeCallback = function(inputData) {
	if (typeof document === 'undefined') {
		return;
	};

	const item = document.createElement('div');
	item.id = 'LCHLargeTypeContainer';
	item.textContent = inputData;
	
	item.style.display = 'block'
	item.style.borderRadius = '20px'
	item.style.boxShadow = '0 0 10px 0px hsla(0, 0%, 0%, 0.1)';
	item.style.padding = '20px'

	item.style.background = 'hsla(0, 0%, 0%, 0.8)'
	item.style.color = 'white'
	item.style.fontFamily = 'Arial'
	item.style.fontSize = '72pt'
	item.style.fontWeight = 'bold'
	item.style.textAlign = 'center'
	item.style.textShadow = '5px 5px 10px hsla(0, 0%, 0%, 0.5)'
	item.style.overflowWrap = 'break-word'

	item.style.cursor = 'default'

	document.body.appendChild(item);

	let handler = function (event) {
		if (event.target === item) {
	  	return;
		}
		
		window.removeEventListener('click', handler);
		item.remove()
	}
	setTimeout(function () {
		window.addEventListener('click', handler)
	});
};

export const LCHLargeTypeRecipe = function() {
	return {
		LCHRecipeName: 'Large Type',
		LCHRecipeSignature: 'LCHLargeType',
		LCHRecipeInputTypes: 'String',
		LCHRecipeCallback: LCHLargeTypeCallback,
	};
};

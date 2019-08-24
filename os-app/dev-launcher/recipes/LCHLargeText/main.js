export const LCHLargeTextCallback = function(inputData) {
	if (typeof document === 'undefined') {
		return;
	};

	const div = document.createElement('div');
	div.id = 'LCHLargeTextContainer';

	for (let [key, value] of Object.entries({
		width: '100%',

		position: 'fixed',
		top: '45%',
		left: '0',

		textAlign: 'center',

		cursor: 'default',
	})) {
		div.style[key] = value;
	}

	const span = document.createElement('span');
	span.textContent = inputData;
	div.appendChild(span);

	for (let [key, value] of Object.entries({
		display: 'block-inline',
		borderRadius: '20px',
		boxShadow: '0 0 10px 0px hsla(0, 0%, 0%, 0.1)',
		padding: '20px',

		background: 'hsla(0, 0%, 0%, 0.8)',
		color: 'white',
		fontFamily: 'Arial',
		fontSize: '72pt',
		fontWeight: 'bold',
		textAlign: 'center',
		textShadow: '5px 5px 10px hsla(0, 0%, 0%, 0.5)',
		overflowWrap: 'break-word',
	})) {
		span.style[key] = value;
	}
	
	document.body.appendChild(div);

	let handler = function (event) {
		if (event.target === div) {
	  	return;
		}
		
		window.removeEventListener('click', handler);
		div.remove()
	}
	setTimeout(function () {
		window.addEventListener('click', handler)
	});
};

export const LCHLargeTextRecipe = function() {
	return {
		LCHRecipeName: 'Large Text',
		LCHRecipeSignature: 'LCHLargeText',
		LCHRecipeInputTypes: 'String',
		LCHRecipeCallback: LCHLargeTextCallback,
	};
};

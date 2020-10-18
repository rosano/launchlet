export const LCHReadTextFileCallback = async function(inputData = {}) {
	return new Promise(function (res, rej) {
		Object.assign(document.createElement('input'), inputData, {
			type: 'file',
			onchange (e) {
				const fileReader = new FileReader();
				
				fileReader.onload = function (event) {
					return res(event.target.result);
				};

				fileReader.readAsText(e.target.files[0]);
			},
		}).click();
	});
};

export const LCHReadTextFileRecipe = function() {
	return {
		LCHRecipeSignature: 'LCHReadTextFile',
		LCHRecipeCallback: LCHReadTextFileCallback,
	};
};

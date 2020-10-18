export const LCHReadTextFileCallback = async function(inputData = {}) {
	return new Promise(function (res, rej) {
		return Object.assign(document.createElement('input'), inputData, {
			type: 'file',
			onchange (event) {
				return Object.assign(new FileReader(), {
					onload (event) {
						return res(event.target.result);
					},
				}).readAsText(event.target.files[0]);
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

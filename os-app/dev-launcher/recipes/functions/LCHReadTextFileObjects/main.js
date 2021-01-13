export const LCHReadTextFileObjectsCallback = async function(inputData = {}) {
	return new Promise(function (res, rej) {
		return Object.assign(document.createElement('input'), inputData, {
			type: 'file',
			onchange (event) {
				return res(Promise.all([...event.target.files].map(function (e) {
					return new Promise(function (res, rej) {
						return Object.assign(new FileReader(), {
							onload (event) {
								return res(Object.assign(e, {
									_LCHReadTextFileObjectContent: event.target.result,
								}));
							},
						}).readAsText(e);
					});
				})));
			},
		}).click();
	});
};

export const LCHReadTextFileObjectsRecipe = function() {
	return {
		LCHRecipeSignature: 'LCHReadTextFileObjects',
		LCHRecipeCallback: LCHReadTextFileObjectsCallback,
	};
};

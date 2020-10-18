export const LCHReadTextFileCallback = async function() {
	return new Promise(function (res, rej) {
		const inputElement = document.createElement('input');
		
		inputElement.type = 'file';

		inputElement.onchange = function (e) {
			const fileReader = new FileReader();
			
			fileReader.onload = function (event) {
				return res(event.target.result);
			};

			fileReader.readAsText(inputElement.files[0]);
		};

		inputElement.click();
	});
};

export const LCHReadTextFileRecipe = function() {
	return {
		LCHRecipeSignature: 'LCHReadTextFile',
		LCHRecipeCallback: LCHReadTextFileCallback,
	};
};

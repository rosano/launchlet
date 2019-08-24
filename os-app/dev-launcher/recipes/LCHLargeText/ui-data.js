window.LCHLauncherRecipesAdd([
	{
		LCHRecipeName: 'LCHLargeTextTest',
		LCHRecipeCallback: function () {
			return this.api.LCHLargeText(document.querySelector('textarea').value = 'LCHLargeTextAlfa');
		},
	},
]);

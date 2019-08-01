window.LCHLauncherRecipesAdd([
	{
		LCHRecipeTitle: 'LCHCopyToClipboardTest',
		LCHRecipeCallback: function () {
			return this.api.fn('LCHCopyToClipboard')(document.querySelector('textarea').value = 'LCHCopyToClipboardAlfa');
		},
	},
]);

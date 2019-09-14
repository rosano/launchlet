export const LCHVitrineMinimalistDateStringCallback = function() {
	return (new Date()).toJSON().slice(0, 10).replace(/-/g, '.');
};

export const LCHVitrineMinimalistDateStringRecipe = function() {
	return {
		LCHRecipeCallback: LCHVitrineMinimalistDateStringCallback,
		LCHRecipeSignature: 'LCHVitrineMinimalistDateString',
		LCHRecipeOutputType: 'String',
	};
};

module.exports = {
	OLSKRollupConfigCustom (inputData) {
		(function StripTerser() {
			inputData.plugins = inputData.plugins.filter(function (e) {
				if (typeof e !== 'object') {
					return false;
				};

				return e.name !== 'terser';
			});
		})();

		return inputData;
	},
};

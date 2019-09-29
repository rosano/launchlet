const pathPackage = require('path');

module.exports = {
	LCHPackageRollupConfigCustom (inputData, options) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('LCHErrorInputNotValid');
		}

		inputData.output.name = 'Launchlet';

		inputData.output.file = pathPackage.join(__dirname, '__compiled/launchlet.js');

		inputData.plugins.splice(inputData.plugins.indexOf(inputData.plugins.filter(function (e) {
			return e.name === 'livereload';
		}).pop()), 1);

		if (!inputData.plugins.length) {
			return inputData
		};

		inputData.plugins.splice(inputData.plugins.indexOf(inputData.plugins.filter(function (e) {
			return e.name === 'svelte';
		}).pop()), 1, require('rollup-plugin-svelte')(Object.assign(require('OLSKRollup').OLSKRollupSvelteConfig(options), {
			css (css) {
				css.code = require('fs').readFileSync(pathPackage.join(__dirname, '../dev-launcher/__compiled/ui-style.css'), 'utf8').replace('ui-style', 'launchlet');

				return css.write(pathPackage.join(__dirname, '__compiled/launchlet.css'));
			},
		})));

		return inputData;
	},
	OLSKRollupConfigCustom (inputData, options) {
		return module.exports.LCHPackageRollupConfigCustom(inputData, options);
	},
};

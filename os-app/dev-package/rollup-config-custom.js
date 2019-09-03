const pathPackage = require('path');

module.exports = {
	OLSKRollupConfigCustomFor (inputData, options) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('LCHErrorInputInvalid');
		}

		inputData.output.name = 'Launchlet';

		inputData.output.file = pathPackage.join(__dirname, '__compiled/launchlet.js');

		if (!inputData.plugins.length) {
			return inputData
		};

		inputData.plugins.splice(inputData.plugins.filter(function (e) {
			return e.name === 'svelte';
		}).pop(), 1, require('rollup-plugin-svelte')(Object.assign(require('OLSKRollup').OLSKRollupSvelteConfig(options), {
			css (css) {
				css.code = require('fs').readFileSync(pathPackage.join(__dirname, '../dev-launcher/__compiled/ui-style.css'), 'utf8').replace('ui-style', 'launchlet');

				return css.write(pathPackage.join(__dirname, '__compiled/launchlet.css'));
			},
		})));

		return inputData;
	},	
};

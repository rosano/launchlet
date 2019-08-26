module.exports = {
	OLSKRollupConfigCustomFor (inputData) {
		const production = !process.env.ROLLUP_WATCH;

		(function SetModuleName() {
			inputData.output.name = 'Launchlet';
		})();

		(function PublishToDistribution() {
			const svelte = require('rollup-plugin-svelte');
			const pathPackage = require('path');

			inputData.output.file = pathPackage.join(__dirname, '__compiled/launchlet.js');

			inputData.plugins.splice(inputData.plugins.indexOf(inputData.plugins.filter(function (e) {
				return e.name === 'svelte';
			}).pop()), 1, svelte({
				css (css) {
					// css.code = require('fs').readFileSync(pathPackage.join(__dirname, '../dev-launcher/__compiled/ui-style.css'), 'utf8').replace('ui-style', 'launchlet');
					return css.write(pathPackage.join(__dirname, '__compiled/launchlet.css'));
				},

				// --- COPY PREVIOUS CONFIGURATION ---

				// enable run-time checks when not in production
				dev: !production,
			}));
		})();

		(function StripLiveReload() {
			let plugins = inputData.plugins.filter(function (e) {
				return e.name !== 'livereload';
			});

			if (!production && plugins.length === inputData.plugins.length) {
				throw new Error('Failed to remove livereload');
			}

			inputData.plugins = plugins;
		})();

		return inputData;
	},	
};

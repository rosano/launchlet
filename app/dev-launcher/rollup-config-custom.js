const svelte = require('rollup-plugin-svelte');
const autoPreprocess = require('svelte-preprocess');

const pathPackage = require('path');

const production = !process.env.ROLLUP_WATCH;

module.exports = {
	LCHLauncherRollupGrabContainerSelector (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('LCHErrorInputNotValid');
		}

		let match;

		if (!(match = inputData.trim().match(/^(\.Container) ?{/))) {
			throw new Error('LCHErrorInputNotValid');
		}

		return match[1];
	},
	LCHLauncherRollupPrefixSelector (param1, param2) {
		if (typeof param1 !== 'string') {
			throw new Error('LCHErrorInputNotValid');
		}

		if (typeof param2 !== 'string') {
			throw new Error('LCHErrorInputNotValid');
		}

		return param2.replace(/\n(.*)\{/g, `\n${ param1 } :global($1) {`).replace(/body|html/g, '').replace(/ \:global\( \)/g, '');
	},
	LCHLauncherRollupConfigCustom (inputData, options = {}) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('LCHErrorInputNotValid');
		}

		inputData.output.format = 'umd';

		if (!inputData.plugins) {
			return inputData
		};

		inputData.plugins.splice(inputData.plugins.indexOf(inputData.plugins.filter(function (e) {
			if (typeof e !== 'object') {
				return false;
			};

			return e.name === 'svelte';
		}).pop()), 1, require('rollup-plugin-svelte')(Object.assign(require('OLSKRollup').OLSKRollupSvelteConfig(options), {
			preprocess: [
				autoPreprocess({}),
				{
					style({ content, filename }) {
						return {
							code: (filename.match(pathPackage.join(__dirname, 'main.svelte')) ? module.exports.LCHLauncherRollupPrefixSelector(module.exports.LCHLauncherRollupGrabContainerSelector(content), require('fs').readFileSync(pathPackage.join(__dirname, '../_shared/__external/normalize.css/normalize.css'), 'utf8')) : '') + content,
							map: ''
						};
					}
				},
			],
		})));

		return inputData;
	},
	OLSKRollupConfigCustom (inputData, options) {
		return module.exports.LCHLauncherRollupConfigCustom(inputData, options);
	}
};

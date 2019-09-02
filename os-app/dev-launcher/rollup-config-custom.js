const svelte = require('rollup-plugin-svelte');
const autoPreprocess = require('svelte-preprocess');

const pathPackage = require('path');

const production = !process.env.ROLLUP_WATCH;

module.exports = {
	LCHRollupGrabContainerSelector (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('LCHErrorInputInvalid');
		}

		let match;

		if (!(match = inputData.trim().match(/^(\.Container) ?{/))) {
			throw new Error('LCHErrorInputInvalid');
		}

		return match[1];
	},
	LCHRollupPrefixSelector (param1, param2) {
		if (typeof param1 !== 'string') {
			throw new Error('LCHErrorInputInvalid');
		}

		if (typeof param2 !== 'string') {
			throw new Error('LCHErrorInputInvalid');
		}

		return param2.replace(/\n(.*)\{/g, `\n${ param1 } :global($1) {`).replace(/body|html/g, '').replace(/ \:global\( \)/g, '');
	},
	OLSKRollupConfigCustomFor (inputData) {
		inputData.plugins.splice(inputData.plugins.filter(function (e) {
			return e.name === 'svelte';
		}).pop(), 1, svelte({
			preprocess: [autoPreprocess({}), {
				style({ content, filename }) {
					return {
						code: (filename.match(pathPackage.join(__dirname, 'main.svelte')) ? module.exports.LCHRollupPrefixSelector(module.exports.LCHRollupGrabContainerSelector(content), require('fs').readFileSync(pathPackage.join(__dirname, '../_shared/__external/normalize.css/normalize.css'), 'utf8')) : '') + content,
						map: ''
					};
				}
			}],

			// --- COPY PREVIOUS CONFIGURATION ---

			// enable run-time checks when not in production
			dev: !production,

			// extract component CSS into separate file for better performance
			css: function (css) {
				return css.write(pathPackage.join(pathPackage.dirname(inputData.input), '__compiled/ui-style.css'));
			},
		}));

		return inputData;
	},	
};

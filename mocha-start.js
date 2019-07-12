//# OLSKMochaReplaceES6Import

(function OLSKMochaReplaceES6Import() {
	const fs = require('fs');

	require.extensions['.js'] = function(module, filename) {
		const exportable = [];

		let code = fs.readFileSync(filename, 'utf-8')
			.replace(/^import \* as (\w+) from ['"]([^'"]+)['"];?/gm, 'var $1 = require("$2");')
			.replace(/^import (\w+) from ['"]([^'"]+)['"];?/gm, 'var {default: $1} = require("$2");')
			.replace(/^import {([^}]+)} from ['"](.+)['"];?/gm, 'var {$1} = require("$2");')
			.replace(/^export default /gm, 'exports.default = ')
			.replace(/^export (const|let|var|class|function) (\w+)/gm, (match, type, name) => {
				exportable.push(name);
				return `${type} ${name}`;
			})
			.replace(/^export \{([^}]+)\}(?: from ['"]([^'"]+)['"];?)?/gm, (match, names, source) => {
				names.split(',').filter(Boolean).forEach(name => {
					exportable.push(name);
				});

				return source ? `const { ${names} } = require("${source}");` : '';
			})
			.replace(/^export function (\w+)/gm, 'exports.$1 = function $1');

		exportable.forEach(name => {
			code += `\nexports.${name} = ${name};`;
		});

		try {
			return module._compile(code, filename);
		} catch (err) {
			console.log(code); // eslint-disable-line no-console
			throw err;
		}
	};
})();

//# LCHMochaSetup

(function LCHMochaSetup() {
	let moduleSlugs = [
		'lch_members',
	];

	const uSerial = function (inputData) {
		return inputData.reduce(async function (coll, e) {
			return e.then(Array.prototype.concat.bind(await coll));
		}, Promise.resolve([]));
	};

	before(function(done) {
		global.LCHTestingStorageClient = require('./os-app/_shared/LCHStorageClient/main.js').LCHStorageClientForModules(moduleSlugs.map(function (e) {
			return require(`./os-app/_shared/rs-modules/${ e }/rs-module.js`).RSModuleProtocolModuleForChangeDelegate(null);
		}));

		done();
	});

	beforeEach(async function() {
		await uSerial(moduleSlugs.map(async function (e) {
			return await Promise.all(Object.keys(await global.LCHTestingStorageClient[e].listObjects()).map(global.LCHTestingStorageClient[e].deleteObject));
		}));
	});
})();

//# OLSKMochaErrors

(function OLSKMochaErrors() {
	process.on('unhandledRejection', (reason, promise) => {
		// console.log('Unhandledd Rejection at:', reason, promise)
		// Recommended: send the information to sentry.io
		// or whatever crash reporting service you use
	});
})();

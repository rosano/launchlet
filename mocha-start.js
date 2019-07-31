(function OLSKMochaReplaceES6Import() {
	require('OLSKTesting')._OLSKTestingMochaReplaceES6Import();
})();



(function OLSKMochaLocalizedStrings() {
	if (process.env.OLSK_TESTING_BEHAVIOUR !== 'true') {
		return;
	}

	const pathPackage = require('path');
	const OLSKInternational = require('OLSKInternational');

	let baseDirectory = pathPackage.join(__dirname, 'os-app');
	let languageDictionary = require('glob').sync('*i18n*.y*(a)ml', {
	  matchBase: true,
	  cwd: baseDirectory,
	}).filter(function(e) {
	  return OLSKInternational.OLSKInternationalInputDataIsTranslationFileBasename(pathPackage.basename(e));
	}).map(function (e) {
		return pathPackage.join(baseDirectory, e);
	}).reduce(function(coll, item) {
		let languageID = OLSKInternational.OLSKInternationalLanguageIDForTranslationFileBasename(pathPackage.basename(item));

		return (coll[languageID] = Object.assign(coll[languageID] || {}, require('js-yaml').safeLoad(require('fs').readFileSync(item, 'utf8')))) && coll;
	}, {});

	global.OLSKTestingLocalized = function(translationConstant, languageCode) {
		return OLSKInternational.OLSKInternationalLocalizedStringWithTranslationKeyAndTranslationDictionary(translationConstant, languageDictionary[languageCode]);
	};
})();

(function LCHMochaStorage() {
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

(function OLSKMochaErrors() {
	process.on('unhandledRejection', () => {
		// console.log('Unhandledd Rejection at:', arguments)
		// Recommended: send the information to sentry.io
		// or whatever crash reporting service you use
	});
})();

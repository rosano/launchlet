import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';
import { LCHLauncherModeCommit, LCHLauncherModePreview, LCHLauncherModePipe } from '../dev-launcher/ui-logic.js';

const kTesting = {
	StubAppClass: function() {
		return function Alfa (type) {
			this.$destroy = function () {};
		};
	},
};

describe('kRunModeDefault', function testkRunModeDefault() {

	it('returns LCHLauncherModeCommit', function() {
		deepEqual(mainModule.kRunModeDefault, LCHLauncherModeCommit());
	});

});

describe('kRunModePreview', function testkRunModePreview() {

	it('returns LCHLauncherModePreview', function() {
		deepEqual(mainModule.kRunModePreview, LCHLauncherModePreview());
	});

});

describe('kRunModePipe', function testkRunModePipe() {

	it('returns LCHLauncherModePipe', function() {
		deepEqual(mainModule.kRunModePipe, LCHLauncherModePipe());
	});

});

describe('instanceCreate', function testinstanceCreate() {

	before(function () {
		mainModule.AppClass(kTesting.StubAppClass());
	});

	after(function () {
		mainModule.instanceDestroy();
	});

	it('returns undefined', function() {
		deepEqual(mainModule.instanceCreate(), undefined);
	});

	context('param1', function () {

		it('throws error if not array', function() {
			throws(function() {
				mainModule.instanceCreate({});
			}, /LCHErrorInputNotArray/);
		});

	});

	context('param2', function () {

		it('throws error if not object', function() {
			throws(function() {
				mainModule.instanceCreate([], 'alfa');
			}, /LCHErrorInputNotObject/);
		});		

		context('runMode', function () {

			it('throws error if not valid', function() {
				throws(function() {
					mainModule.instanceCreate([], {
						runMode: function () {
							return 'alfa';
						},
					});
				}, /LCHErrorInputNotValidRunMode/);
			});

			it('returns undefined', function() {
				deepEqual(mainModule.instanceCreate([], {
					runMode: mainModule.kRunModePreview,
				}), undefined);
			});

		});		

		context('completionHandler', function () {

			it('throws error if not function', function() {
				throws(function() {
					mainModule.instanceCreate([], {
						completionHandler: 'alfa',
					});
				}, /LCHErrorInputNotFunction/);
			});

			it('returns undefined', function() {
				deepEqual(mainModule.instanceCreate([], {
					completionHandler () {},
				}), undefined);
			});

		});

	});

});

describe('instanceExists', function testinstanceExists() {

	before(function () {
		mainModule.AppClass(kTesting.StubAppClass());
	});

	it('returns false', function() {
		deepEqual(mainModule.instanceExists(), false);
	});

	it('returns true after instanceCreate', function() {
		mainModule.instanceCreate();
		deepEqual(mainModule.instanceExists(), true);
	});

	it('returns false after instanceDestroy', function() {
		mainModule.instanceCreate();
		mainModule.instanceDestroy();
		deepEqual(mainModule.instanceExists(), false);
	});

});

describe('LCHPackageStyle', function testLCHPackageStyle() {

	it('contains normalize', function() {
		deepEqual(require('fs').readFileSync(require('path').join(__dirname, '__compiled/launchlet.css'), 'utf8').match(/\{(.*00%)\}/)[1], 'line-height:1.15;-webkit-text-size-adjust:100%');
	});

});

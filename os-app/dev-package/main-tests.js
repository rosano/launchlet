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

describe('LPKModeCommit', function testLPKModeCommit() {

	it('sets value', function() {
		deepEqual(mainModule.LPKModeCommit, LCHLauncherModeCommit());
	});

});

describe('LPKModePreview', function testLPKModePreview() {

	it('sets value', function() {
		deepEqual(mainModule.LPKModePreview, LCHLauncherModePreview());
	});

});

describe('LPKModePipe', function testLPKModePipe() {

	it('sets value', function() {
		deepEqual(mainModule.LPKModePipe, LCHLauncherModePipe());
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

		context('LRTOptionMode', function () {

			it('throws error if not valid', function() {
				throws(function() {
					mainModule.instanceCreate([], {
						LRTOptionMode: function () {
							return 'alfa';
						},
					});
				}, /LCHErrorInputModeNotValid/);
			});

			it('returns undefined', function() {
				deepEqual(mainModule.instanceCreate([], {
					LRTOptionMode: mainModule.LPKModePreview,
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

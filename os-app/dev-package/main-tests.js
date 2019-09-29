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

describe('LRTModeCommit', function testLRTModeCommit() {

	it('sets value', function() {
		deepEqual(mainModule.LRTModeCommit, LCHLauncherModeCommit());
	});

});

describe('LRTModePreview', function testLRTModePreview() {

	it('sets value', function() {
		deepEqual(mainModule.LRTModePreview, LCHLauncherModePreview());
	});

});

describe('LRTModePipe', function testLRTModePipe() {

	it('sets value', function() {
		deepEqual(mainModule.LRTModePipe, LCHLauncherModePipe());
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

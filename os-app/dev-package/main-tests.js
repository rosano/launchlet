const { rejects, deepEqual } = require('assert');

const mainModule = require('./main.js');

const kTesting = {
	StubValueClass: function(inputData) {
		return function () {
			this.check1 = function () {
				return inputData;
			};

			this.$destroy = function () {};
		};
	},
};

mainModule.mod._ValueClass = kTesting.StubValueClass('alfa');

describe('DataSingletonExists', function testDataSingletonExists() {

	beforeEach(function () {
		deepEqual(mainModule.mod._ValueSingleton, undefined);
	});

	afterEach(function () {
		deepEqual(mainModule.mod._ValueSingleton, undefined);
	});

	it('returns false', function() {
		deepEqual(mainModule.mod.DataSingletonExists(), false);
	});

	it('returns true after LifecycleSingletonCreate', function() {
		mainModule.mod.LifecycleSingletonCreate();
		
		deepEqual(mainModule.mod.DataSingletonExists(), true);

		mainModule.mod.LifecycleSingletonDestroy();
	});

	it('returns true after LifecycleSingletonDestroy', function() {
		mainModule.mod.LifecycleSingletonCreate();
		mainModule.mod.LifecycleSingletonDestroy();
		
		deepEqual(mainModule.mod.DataSingletonExists(), false);
	});

});

describe('LifecycleSingletonCreate', function testLifecycleSingletonCreate() {

	beforeEach(function () {
		deepEqual(mainModule.mod._ValueSingleton, undefined);
	});

	afterEach(function () {
		mainModule.mod.LifecycleSingletonDestroy();
	});
	
	afterEach(function () {
		deepEqual(mainModule.mod._ValueSingleton, undefined);
	});

	it('sets ValueSingleton', function() {
		mainModule.mod.LifecycleSingletonCreate();

		deepEqual(mainModule.mod._ValueSingleton.check1(), 'alfa');
	});

	it('calls LifecycleSingletonDestroy if exists', function() {
		mainModule.mod.LifecycleSingletonCreate();
		
		mainModule.mod._ValueClass = kTesting.StubValueClass('bravo');

		mainModule.mod.LifecycleSingletonCreate();

		deepEqual(mainModule.mod._ValueSingleton.check1(), 'bravo');
	});

});

describe('LifecycleSingletonDestroy', function testLifecycleSingletonDestroy() {

	beforeEach(function () {
		deepEqual(mainModule.mod._ValueSingleton, undefined);
	});

	beforeEach(function () {
		mainModule.mod.LifecycleSingletonCreate();
	});
	
	afterEach(function () {
		deepEqual(mainModule.mod._ValueSingleton, undefined);
	});

	it('deletes ValueSingleton', function() {
		mainModule.mod.LifecycleSingletonDestroy();

		deepEqual(mainModule.mod._ValueSingleton, undefined);
	});

});

import { LCHLauncherModeCommit, LCHLauncherModePreview, LCHLauncherModePipe } from '../dev-launcher/ui-logic.js';

describe('LCHModeCommit', function testLCHModeCommit() {

	it('sets value', function() {
		deepEqual(mainModule.LCHModeCommit, LCHLauncherModeCommit());
	});

});

describe('LCHModePreview', function testLCHModePreview() {

	it('sets value', function() {
		deepEqual(mainModule.LCHModePreview, LCHLauncherModePreview());
	});

});

describe('LCHModePipe', function testLCHModePipe() {

	it('sets value', function() {
		deepEqual(mainModule.LCHModePipe, LCHLauncherModePipe());
	});

});

describe('LCHPackage', function testLCHPackage() {

	it('returns object', function() {
		deepEqual(mainModule.LCHPackage(), {
			LCHModeCommit: mainModule.LCHModeCommit,
			LCHModePreview: mainModule.LCHModePreview,
			LCHModePipe: mainModule.LCHModePipe,

			LCHSingletonCreate: mainModule.mod.LifecycleSingletonCreate,
			LCHSingletonExists: mainModule.mod.DataSingletonExists,
			LCHSingletonDestroy: mainModule.mod.LifecycleSingletonDestroy,
			
			LCHTasksRun: mainModule.mod.ControlRunTasks,
		});
	});

	it('freezes object', function() {
		let item = mainModule.LCHPackage();

		item.alfa = 'bravo',
		
		deepEqual(item.alfa, undefined);
	});

});

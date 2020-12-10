const { rejects, deepEqual } = require('assert');

const mod = require('./package.js');

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

mod.mod._ValueClass = kTesting.StubValueClass('alfa');

describe('DataSingletonExists', function test_DataSingletonExists() {

	beforeEach(function () {
		deepEqual(mod.mod._ValueSingleton, undefined);
	});

	afterEach(function () {
		deepEqual(mod.mod._ValueSingleton, undefined);
	});

	it('returns false', function() {
		deepEqual(mod.mod.DataSingletonExists(), false);
	});

	it('returns true after LifecycleSingletonCreate', function() {
		mod.mod.LifecycleSingletonCreate();
		
		deepEqual(mod.mod.DataSingletonExists(), true);

		mod.mod.LifecycleSingletonDestroy();
	});

	it('returns true after LifecycleSingletonDestroy', function() {
		mod.mod.LifecycleSingletonCreate();
		mod.mod.LifecycleSingletonDestroy();
		
		deepEqual(mod.mod.DataSingletonExists(), false);
	});

});

describe('LifecycleSingletonCreate', function test_LifecycleSingletonCreate() {

	beforeEach(function () {
		deepEqual(mod.mod._ValueSingleton, undefined);
	});

	afterEach(function () {
		mod.mod.LifecycleSingletonDestroy();
	});
	
	afterEach(function () {
		deepEqual(mod.mod._ValueSingleton, undefined);
	});

	it('sets ValueSingleton', function() {
		mod.mod.LifecycleSingletonCreate();

		deepEqual(mod.mod._ValueSingleton.check1(), 'alfa');
	});

	it('calls LifecycleSingletonDestroy if exists', function() {
		mod.mod.LifecycleSingletonCreate();
		
		mod.mod._ValueClass = kTesting.StubValueClass('bravo');

		mod.mod.LifecycleSingletonCreate();

		deepEqual(mod.mod._ValueSingleton.check1(), 'bravo');
	});

});

describe('LifecycleSingletonDestroy', function test_LifecycleSingletonDestroy() {

	beforeEach(function () {
		deepEqual(mod.mod._ValueSingleton, undefined);
	});

	beforeEach(function () {
		mod.mod.LifecycleSingletonCreate();
	});
	
	afterEach(function () {
		deepEqual(mod.mod._ValueSingleton, undefined);
	});

	it('deletes ValueSingleton', function() {
		mod.mod.LifecycleSingletonDestroy();

		deepEqual(mod.mod._ValueSingleton, undefined);
	});

});

describe('LCHPackage', function test_LCHPackage() {

	it('returns object', function() {
		deepEqual(mod.LCHPackage(), {
			LCHSingletonCreate: mod.mod.LifecycleSingletonCreate,
			LCHSingletonExists: mod.mod.DataSingletonExists,
			LCHSingletonDestroy: mod.mod.LifecycleSingletonDestroy,
		});
	});

	it('freezes object', function() {
		let item = mod.LCHPackage();

		item.alfa = 'bravo',
		
		deepEqual(item.alfa, undefined);
	});

});

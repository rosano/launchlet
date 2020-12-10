const { throws, rejects, deepEqual } = require('assert');

const mod = require('./main.js').default;

describe('LCHRuntimeURLFilter', function test_LCHRuntimeURLFilter() {

	it('throws if param1 not string', function() {
		throws(function() {
			mod.LCHRuntimeURLFilter(null, '');
		}, /LCHErrorInputNotValid/);
	});

	it('throws if param2 not string', function() {
		throws(function() {
			mod.LCHRuntimeURLFilter('', null);
		}, /LCHErrorInputNotValid/);
	});

	it('throws if param2 not filled', function() {
		throws(function() {
			mod.LCHRuntimeURLFilter('', '');
		}, /LCHErrorInputNotValid/);
	});

	it('returns true if param1 empty', function() {
		deepEqual(mod.LCHRuntimeURLFilter('', 'alfa'), true);
	});

	it('returns true if param1 wildcard', function() {
		deepEqual(mod.LCHRuntimeURLFilter('*', 'alfa'), true);
	});

	it('treats regex characters as string if no slashes', function() {
		deepEqual(mod.LCHRuntimeURLFilter('alfa?bravo', 'alfabravo'), false);
	});

	it('matches as regex', function() {
		deepEqual(mod.LCHRuntimeURLFilter('/\\w/', 'alfa'), true);
		deepEqual(mod.LCHRuntimeURLFilter('/\\d/', 'alfa'), false);
		deepEqual(mod.LCHRuntimeURLFilter('/A/', 'alfa'), false);
		deepEqual(mod.LCHRuntimeURLFilter('/A/i', 'alfa'), true);
		deepEqual(mod.LCHRuntimeURLFilter('/alfa?bravo/', 'alfbravo'), true);
	});

	context('string', function () {
		
		it('interprets as string', function() {
			deepEqual(mod.LCHRuntimeURLFilter('alfa?bravo', 'alfbravo'), false);
		});

		it('returns false if no match', function() {
			deepEqual(mod.LCHRuntimeURLFilter('bravo', 'alfa'), false);
		});

		it('returns true if match', function() {
			deepEqual(mod.LCHRuntimeURLFilter('alfa', 'alfa'), true);
		});
	
	});

	context('regex', function () {

		it('interprets as regex', function() {
			deepEqual(mod.LCHRuntimeURLFilter('/alfa?bravo/', 'alfbravo'), true);
		});

		it('returns false if no match', function() {
			deepEqual(mod.LCHRuntimeURLFilter('/ALFA/', 'alfa'), false);
		});

		it('returns true if match', function() {
			deepEqual(mod.LCHRuntimeURLFilter('/ALFA/i', 'alfa'), true);
		});
	
	});

});

describe('LCHRuntimeInputTypes', function test_LCHRuntimeInputTypes() {

	it('throws if not string', function() {
		throws(function() {
			mod.LCHRuntimeInputTypes(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns array', function() {
		deepEqual(mod.LCHRuntimeInputTypes(''), []);
	});

	it('excludes if blank', function() {
		deepEqual(mod.LCHRuntimeInputTypes(','), []);
	});

	it('includes if single', function() {
		deepEqual(mod.LCHRuntimeInputTypes('alfa'), ['alfa']);
	});

	it('includes if multiple', function() {
		deepEqual(mod.LCHRuntimeInputTypes('alfa,bravo'), ['alfa', 'bravo']);
	});

	it('trims whitespace', function() {
		deepEqual(mod.LCHRuntimeInputTypes('alfa , bravo'), ['alfa', 'bravo']);
	});

});

describe('LCHRuntimeAPI', function test_LCHRuntimeAPI() {

	it('throws if not array', function() {
		throws(function() {
			mod.LCHRuntimeAPI(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns object', function() {
		deepEqual(typeof mod.LCHRuntimeAPI([]), 'object');
	});

	context('function', function () {
		
		it('returns LCHRecipeCallback output', function() {
			deepEqual(mod.LCHRuntimeAPI([{
				LCHRecipeSignature: 'alfa',
				LCHRecipeCallback() {
					return 'bravo';
				},
			}]).alfa(), 'bravo');
		});

		it('throws if type mismatch single', function () {
			throws(function () {
				mod.LCHRuntimeAPI([{
					LCHRecipeSignature: 'alfa',
					LCHRecipeOutputType: 'Bool',
					LCHRecipeCallback(inputData) {
						return inputData === 'bravo';
					},
				}, {
					LCHRecipeSignature: 'charlie',
					LCHRecipeInputTypes: 'alfa',
					LCHRecipeCallback() {},
				}]).charlie('delta');
			}, /ErrorTypeMismatch/);
		});

		it('throws if type mismatch multiple', function () {
			throws(function () {
				mod.LCHRuntimeAPI([{
					LCHRecipeSignature: 'alfa',
					LCHRecipeOutputType: 'Bool',
					LCHRecipeCallback(inputData) {
						return inputData === 'bravo';
					},
				}, {
					LCHRecipeSignature: 'charlie',
					LCHRecipeInputTypes: 'alfa, alfa',
					LCHRecipeCallback() {},
				}]).charlie('bravo', 'delta');
			}, /ErrorTypeMismatch/);
		});
	
	});

	context('this.api.fn', function() {

		it('throws if not string', function() {
			throws(function() {
				mod.LCHRuntimeAPI([]).fn(null);
			}, /LCHErrorIdentifierNotString/);
		});

		it('throws if blank', function() {
			throws(function() {
				mod.LCHRuntimeAPI([]).fn('');
			}, /LCHErrorIdentifierBlank/);
		});

		it('throws if contains untrimmed whitespace', function() {
			throws(function() {
				mod.LCHRuntimeAPI([]).fn(' alfa');
			}, /LCHErrorIdentifierContainsUntrimmedWhitespace/);
			throws(function() {
				mod.LCHRuntimeAPI([]).fn('alfa ');
			}, /LCHErrorIdentifierContainsUntrimmedWhitespace/);
		});

		it('throws if not defined', function() {
			throws(function() {
				mod.LCHRuntimeAPI([]).fn('alfa');
			}, /LCHErrorIdentifierNotDefined/);
		});

		it('returns LCHRecipeCallback output', function() {
			deepEqual(mod.LCHRuntimeAPI([{
				LCHRecipeSignature: 'alfa',
				LCHRecipeCallback() {
					return 'bravo';
				},
			}]).fn('alfa')(), 'bravo');
		});

		it('populates this.api.fn', function() {
			deepEqual(mod.LCHRuntimeAPI([{
				LCHRecipeSignature: 'alfa',
				LCHRecipeCallback(inputData) {
					return `hello ${ inputData }`;
				},
			}, {
				LCHRecipeSignature: 'charlie',
				LCHRecipeCallback() {
					return this.api.fn('alfa')('bravo');
				},
			}]).fn('charlie')(), 'hello bravo');
		});

		it('ignores duplicates', function() {
			deepEqual(mod.LCHRuntimeAPI([{
				LCHRecipeCallback(inputData) {
					return `hello ${ inputData }`;
				},
				LCHRecipeSignature: 'alfa',
			}, {
				LCHRecipeCallback(inputData) {
					return `bye ${ inputData }`;
				},
				LCHRecipeSignature: 'alfa',
			}]).fn('alfa')('bravo'), 'hello bravo');
		});

		it('returns frozen object', function() {
			deepEqual(mod.LCHRuntimeAPI([{
				LCHRecipeCallback(inputData) {
					return `hello ${ inputData }`;
				},
				LCHRecipeSignature: 'alfa',
			}, {
				LCHRecipeCallback() {
					this.api.fn = function () {
						return function () {
							return 'charlie';
						};
					};
					return this.api.fn('alfa')('bravo');
				},
				LCHRecipeSignature: 'charlie',
			}]).fn('charlie')(), 'hello bravo');
		});

	});

	context('this.api', function() {

		it('populates this.api', function() {
			deepEqual(mod.LCHRuntimeAPI([{
				LCHRecipeCallback(inputData) {
					return `hello ${ inputData }`;
				},
				LCHRecipeSignature: 'alfa',
			}, {
				LCHRecipeCallback() {
					return this.api.alfa('bravo');
				},
				LCHRecipeSignature: 'charlie',
			}]).charlie(), 'hello bravo');
		});

		it('ignores duplicates', function() {
			deepEqual(mod.LCHRuntimeAPI([{
				LCHRecipeCallback(inputData) {
					return `hello ${ inputData }`;
				},
				LCHRecipeSignature: 'alfa',
			}, {
				LCHRecipeCallback(inputData) {
					return `bye ${ inputData }`;
				},
				LCHRecipeSignature: 'alfa',
			}]).alfa('bravo'), 'hello bravo');
		});

		it('returns frozen object', function() {
			deepEqual(mod.LCHRuntimeAPI([{
				LCHRecipeCallback(inputData) {
					return `hello ${ inputData }`;
				},
				LCHRecipeSignature: 'alfa',
			}, {
				LCHRecipeCallback(inputData) {
					this.api.alfa = function () {
						return `bye ${ inputData }`;
					};
					
					return this.api.alfa(inputData);
				},
				LCHRecipeSignature: 'bravo',
			}]).bravo('charlie'), 'hello charlie');
		});

	});

});

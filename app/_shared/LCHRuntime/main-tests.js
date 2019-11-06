const { throws, rejects, deepEqual } = require('assert');

const mainModule = require('./main.js');

describe('LCHRuntimeURLFilter', function testLCHRuntimeURLFilter() {

	it('throws if param1 not string', function() {
		throws(function() {
			mainModule.LCHRuntimeURLFilter(null, '');
		}, /LCHErrorInputNotValid/);
	});

	it('throws if param2 not string', function() {
		throws(function() {
			mainModule.LCHRuntimeURLFilter('', null);
		}, /LCHErrorInputNotValid/);
	});

	it('throws if param2 not filled', function() {
		throws(function() {
			mainModule.LCHRuntimeURLFilter('', '');
		}, /LCHErrorInputNotValid/);
	});

	it('returns true if param1 empty', function() {
		deepEqual(mainModule.LCHRuntimeURLFilter('', 'alfa'), true);
	});

	it('returns true if param1 wildcard', function() {
		deepEqual(mainModule.LCHRuntimeURLFilter('*', 'alfa'), true);
	});

	it('treats regex characters as string if no slashes', function() {
		deepEqual(mainModule.LCHRuntimeURLFilter('alfa?bravo', 'alfabravo'), false);
	});

	it('matches as regex', function() {
		deepEqual(mainModule.LCHRuntimeURLFilter('/\\w/', 'alfa'), true);
		deepEqual(mainModule.LCHRuntimeURLFilter('/\\d/', 'alfa'), false);
		deepEqual(mainModule.LCHRuntimeURLFilter('/A/', 'alfa'), false);
		deepEqual(mainModule.LCHRuntimeURLFilter('/A/i', 'alfa'), true);
		deepEqual(mainModule.LCHRuntimeURLFilter('/alfa?bravo/', 'alfbravo'), true);
	});

	context('string', function () {
		
		it('interprets as string', function() {
			deepEqual(mainModule.LCHRuntimeURLFilter('alfa?bravo', 'alfbravo'), false);
		});

		it('returns false if no match', function() {
			deepEqual(mainModule.LCHRuntimeURLFilter('bravo', 'alfa'), false);
		});

		it('returns true if match', function() {
			deepEqual(mainModule.LCHRuntimeURLFilter('alfa', 'alfa'), true);
		});
	
	});

	context('regex', function () {

		it('interprets as regex', function() {
			deepEqual(mainModule.LCHRuntimeURLFilter('/alfa?bravo/', 'alfbravo'), true);
		});

		it('returns false if no match', function() {
			deepEqual(mainModule.LCHRuntimeURLFilter('/ALFA/', 'alfa'), false);
		});

		it('returns true if match', function() {
			deepEqual(mainModule.LCHRuntimeURLFilter('/ALFA/i', 'alfa'), true);
		});
	
	});

});

describe('LCHRuntimeInputTypes', function testLCHRuntimeInputTypes() {

	it('throws if not string', function() {
		throws(function() {
			mainModule.LCHRuntimeInputTypes(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns array', function() {
		deepEqual(mainModule.LCHRuntimeInputTypes(''), []);
	});

	it('excludes if blank', function() {
		deepEqual(mainModule.LCHRuntimeInputTypes(','), []);
	});

	it('includes if single', function() {
		deepEqual(mainModule.LCHRuntimeInputTypes('alfa'), ['alfa']);
	});

	it('includes if multiple', function() {
		deepEqual(mainModule.LCHRuntimeInputTypes('alfa,bravo'), ['alfa', 'bravo']);
	});

	it('trims whitespace', function() {
		deepEqual(mainModule.LCHRuntimeInputTypes('alfa , bravo'), ['alfa', 'bravo']);
	});

});

describe('LCHRuntimeAPI', function testLCHRuntimeAPI() {

	it('throws if not array', function() {
		throws(function() {
			mainModule.LCHRuntimeAPI(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns object', function() {
		deepEqual(typeof mainModule.LCHRuntimeAPI([]), 'object');
	});

	context('function', function () {
		
		it('returns LCHRecipeCallback output', function() {
			deepEqual(mainModule.LCHRuntimeAPI([{
				LCHRecipeSignature: 'alfa',
				LCHRecipeCallback() {
					return 'bravo';
				},
			}]).alfa(), 'bravo');
		});

		it('throws if type mismatch single', function () {
			throws(function () {
				mainModule.LCHRuntimeAPI([{
					LCHRecipeSignature: 'alfa',
					LCHRecipeOutputType: 'Bool',
					LCHRecipeCallback(inputData) {
						return inputData === 'bravo'
					},
				}, {
					LCHRecipeSignature: 'charlie',
					LCHRecipeInputTypes: 'alfa',
					LCHRecipeCallback() {},
				}]).charlie('delta')
			}, /ErrorTypeMismatch/);
		});

		it('throws if type mismatch multiple', function () {
			throws(function () {
				mainModule.LCHRuntimeAPI([{
					LCHRecipeSignature: 'alfa',
					LCHRecipeOutputType: 'Bool',
					LCHRecipeCallback(inputData) {
						return inputData === 'bravo'
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
				mainModule.LCHRuntimeAPI([]).fn(null);
			}, /LCHErrorIdentifierNotString/);
		});

		it('throws if blank', function() {
			throws(function() {
				mainModule.LCHRuntimeAPI([]).fn('');
			}, /LCHErrorIdentifierBlank/);
		});

		it('throws if contains untrimmed whitespace', function() {
			throws(function() {
				mainModule.LCHRuntimeAPI([]).fn(' alfa');
			}, /LCHErrorIdentifierContainsUntrimmedWhitespace/);
			throws(function() {
				mainModule.LCHRuntimeAPI([]).fn('alfa ');
			}, /LCHErrorIdentifierContainsUntrimmedWhitespace/);
		});

		it('throws if not defined', function() {
			throws(function() {
				mainModule.LCHRuntimeAPI([]).fn('alfa');
			}, /LCHErrorIdentifierNotDefined/);
		});

		it('returns LCHRecipeCallback output', function() {
			deepEqual(mainModule.LCHRuntimeAPI([{
				LCHRecipeSignature: 'alfa',
				LCHRecipeCallback() {
					return 'bravo';
				},
			}]).fn('alfa')(), 'bravo');
		});

		it('populates this.api.fn', function() {
			deepEqual(mainModule.LCHRuntimeAPI([{
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
			deepEqual(mainModule.LCHRuntimeAPI([{
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
			deepEqual(mainModule.LCHRuntimeAPI([{
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
			deepEqual(mainModule.LCHRuntimeAPI([{
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
			deepEqual(mainModule.LCHRuntimeAPI([{
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
			deepEqual(mainModule.LCHRuntimeAPI([{
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
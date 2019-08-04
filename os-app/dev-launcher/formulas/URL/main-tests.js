import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHTypeURLCallback', function testLCHTypeURLCallback() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.LCHTypeURLCallback(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns false if no scheme', function() {
		deepEqual(mainModule.LCHTypeURLCallback('://example'), false);
	});

	it('returns false if no colon', function() {
		deepEqual(mainModule.LCHTypeURLCallback('http//example'), false);
	});

	it('returns false if no slashes', function() {
		deepEqual(mainModule.LCHTypeURLCallback('http:/example'), false);
	});

	it('returns false if no host', function() {
		deepEqual(mainModule.LCHTypeURLCallback('http://'), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHTypeURLCallback('http://example'), true);
	});

	it('accepts https', function() {
		deepEqual(mainModule.LCHTypeURLCallback('https://example'), true);
	});

	it('accepts domain', function() {
		deepEqual(mainModule.LCHTypeURLCallback('http://example.com'), true);
	});

	it('accepts port', function() {
		deepEqual(mainModule.LCHTypeURLCallback('http://example.com:80'), true);
	});

	it('accepts path', function() {
		deepEqual(mainModule.LCHTypeURLCallback('http://example.com/alfa'), true);
	});

	it('accepts anchor', function() {
		deepEqual(mainModule.LCHTypeURLCallback('http://example.com#alfa'), true);
	});

	it('accepts query', function() {
		deepEqual(mainModule.LCHTypeURLCallback('http://example.com?alfa'), true);
	});

});

describe('LCHTypeURLRecipe', function testLCHTypeURLRecipe() {

	it('returns LCHRecipe', function() {
		deepEqual(mainModule.LCHTypeURLRecipe(), {
			LCHRecipeName: 'URL',
			LCHRecipeSignature: 'URL',
			LCHRecipeCallback: mainModule.LCHTypeURLCallback,
			LCHRecipeOutputType: 'Bool',
		});
	});

});

import { throws, deepEqual } from 'assert';

import * as mainModule from './ui-logic.js';

describe('LCHGuideExampleFormatted', function testLCHGuideExampleFormatted() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHGuideExampleFormatted(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns object', function() {
		deepEqual(mainModule.LCHGuideExampleFormatted({}), {});
	})

	it('includes input entries', function() {
		deepEqual(mainModule.LCHGuideExampleFormatted({
			alfa: 'bravo',
		}), {
			alfa: 'bravo',
		});
	})

	context('LCHDocumentBody', function () {

		it('formats value', function() {
			deepEqual(mainModule.LCHGuideExampleFormatted({
				LCHDocumentBody: 'bravo',
			}), {
				LCHDocumentBody: '```bravo```',
			});
		});

	});

});

describe('LCHGuideExampleQuotes', function testLCHGuideExampleQuotes() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHGuideExampleQuotes(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns array', function() {
		deepEqual(mainModule.LCHGuideExampleQuotes({}), []);
	});

	it('splits into entries', function() {
		deepEqual(mainModule.LCHGuideExampleQuotes({
			alfa: 'bravo',
		}), ['> **alfa**\n>> bravo']);
	});

});

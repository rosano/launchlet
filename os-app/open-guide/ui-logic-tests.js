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

	context('LCHDocumentCallbackBody', function () {

		it('formats value', function() {
			deepEqual(mainModule.LCHGuideExampleFormatted({
				LCHDocumentCallbackBody: 'bravo',
			}), {
				LCHDocumentCallbackBody: '```bravo```',
			});
		});

	});

});

describe('LCHGuideExampleQuoted', function testLCHGuideExampleQuoted() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHGuideExampleQuoted(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns array', function() {
		deepEqual(mainModule.LCHGuideExampleQuoted({}), []);
	});

	it('splits into entries', function() {
		deepEqual(mainModule.LCHGuideExampleQuoted({
			alfa: 'bravo',
		}), ['> **alfa**\n>> bravo']);
	});

});

describe('LCHGuideExampleTemplate', function testLCHGuideExampleTemplate() {

	it('throws error if not array', function() {
		throws(function() {
			mainModule.LCHGuideExampleTemplate(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.LCHGuideExampleTemplate([]), `<div class="LCHGuideExample">\n\n\n\n</div>`);
	});

	it('inserts input', function() {
		deepEqual(mainModule.LCHGuideExampleTemplate(['alfa']), `<div class="LCHGuideExample">\n\nalfa\n\n</div>`);
	});

	it('joins multiple with newlines', function() {
		deepEqual(mainModule.LCHGuideExampleTemplate(['alfa', 'bravo']), `<div class="LCHGuideExample">\n\nalfa\n\nbravo\n\n</div>`);
	});

});

describe('LCHGuideStringify', function testLCHGuideStringify() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHGuideStringify(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.LCHGuideStringify({}), '{}');
	});

	it('strips key quotes', function() {
		deepEqual(mainModule.LCHGuideStringify({
			alfa: null,
		}), '{\n alfa: null\n}');
	})

});

const { throws, deepEqual } = require('assert');

const mainModule = require('./ui-logic.js');

describe('LCHGuideExampleFormatted', function test_LCHGuideExampleFormatted() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHGuideExampleFormatted(null);
		}, /LCHErrorInputNotValid/);
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
				LCHDocumentCallbackBody: '<code>bravo</code>',
			});
		});

	});

});

describe('LCHGuideExampleQuoted', function test_LCHGuideExampleQuoted() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHGuideExampleQuoted(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns array', function() {
		deepEqual(mainModule.LCHGuideExampleQuoted({}), []);
	});

	it('splits into entries', function() {
		deepEqual(mainModule.LCHGuideExampleQuoted({
			alfa: 'bravo',
		}), ['<dt>alfa</dt><dd>bravo</dd>']);
	});

});

describe('LCHGuideExampleTemplate', function test_LCHGuideExampleTemplate() {

	it('throws error if not array', function() {
		throws(function() {
			mainModule.LCHGuideExampleTemplate(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.LCHGuideExampleTemplate([]), `<dl class="LCHGuideExample">\n\n\n\n</dl>`);
	});

	it('inserts input', function() {
		deepEqual(mainModule.LCHGuideExampleTemplate(['alfa']), `<dl class="LCHGuideExample">\n\nalfa\n\n</dl>`);
	});

	it('joins multiple with newlines', function() {
		deepEqual(mainModule.LCHGuideExampleTemplate(['alfa', 'bravo']), `<dl class="LCHGuideExample">\n\nalfa\n\nbravo\n\n</dl>`);
	});

});

describe('LCHGuideStringify', function test_LCHGuideStringify() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHGuideStringify(null);
		}, /LCHErrorInputNotValid/);
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

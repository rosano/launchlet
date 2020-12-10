const { throws, deepEqual } = require('assert');

const mod = require('./ui-logic.js');

describe('LCHGuideExampleFormatted', function test_LCHGuideExampleFormatted() {

	it('throws error if not object', function() {
		throws(function() {
			mod.LCHGuideExampleFormatted(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns object', function() {
		deepEqual(mod.LCHGuideExampleFormatted({}), {});
	})

	it('includes input entries', function() {
		deepEqual(mod.LCHGuideExampleFormatted({
			alfa: 'bravo',
		}), {
			alfa: 'bravo',
		});
	})

	context('LCHDocumentCallbackBody', function () {

		it('formats value', function() {
			deepEqual(mod.LCHGuideExampleFormatted({
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
			mod.LCHGuideExampleQuoted(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns array', function() {
		deepEqual(mod.LCHGuideExampleQuoted({}), []);
	});

	it('splits into entries', function() {
		deepEqual(mod.LCHGuideExampleQuoted({
			alfa: 'bravo',
		}), ['<dt>alfa</dt><dd>bravo</dd>']);
	});

});

describe('LCHGuideExampleTemplate', function test_LCHGuideExampleTemplate() {

	it('throws error if not array', function() {
		throws(function() {
			mod.LCHGuideExampleTemplate(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mod.LCHGuideExampleTemplate([]), `<dl class="LCHGuideExample">\n\n\n\n</dl>`);
	});

	it('inserts input', function() {
		deepEqual(mod.LCHGuideExampleTemplate(['alfa']), `<dl class="LCHGuideExample">\n\nalfa\n\n</dl>`);
	});

	it('joins multiple with newlines', function() {
		deepEqual(mod.LCHGuideExampleTemplate(['alfa', 'bravo']), `<dl class="LCHGuideExample">\n\nalfa\n\nbravo\n\n</dl>`);
	});

});

describe('LCHGuideStringify', function test_LCHGuideStringify() {

	it('throws error if not object', function() {
		throws(function() {
			mod.LCHGuideStringify(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mod.LCHGuideStringify({}), '{}');
	});

	it('strips key quotes', function() {
		deepEqual(mod.LCHGuideStringify({
			alfa: null,
		}), '{\n alfa: null\n}');
	})

});

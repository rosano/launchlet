import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('OLSKServiceWorkerViewForVersionID', function testOLSKServiceWorkerViewForVersionID() {

	it('throws if not string', function() {
		throws(function() {
			mainModule.OLSKServiceWorkerViewForVersionID(null);
		}, /OLSKrrorInputInvalid/);
	});

	it('throws if not filled', function() {
		throws(function() {
			mainModule.OLSKServiceWorkerViewForVersionID('');
		}, /OLSKrrorInputInvalid/);
	});

	it('throws if contains leading whitespace', function() {
		throws(function() {
			mainModule.OLSKServiceWorkerViewForVersionID(' alfa');
		}, /OLSKrrorInputInvalid/);
	});

	it('throws if contains trailing whitespace', function() {
		throws(function() {
			mainModule.OLSKServiceWorkerViewForVersionID('alfa ');
		}, /OLSKrrorInputInvalid/);
	});

	it('throws if contains middle whitespace', function() {
		throws(function() {
			mainModule.OLSKServiceWorkerViewForVersionID('alfa bravo');
		}, /OLSKrrorInputInvalid/);
	});

	it('returns function body', function() {
		deepEqual(mainModule.OLSKServiceWorkerViewForVersionID('alfa'), mainModule._OLSKServiceWorkerTemplate.toString().replace('{ OLSKServiceWorkerVersionID }', 'alfa').replace('function () {', '').trim().slice(0, -1));
	});

});

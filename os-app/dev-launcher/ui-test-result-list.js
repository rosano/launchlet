const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('OLSKResultsList', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			StubRecipes: uStubStringify(uStubTwoItems()),
			LCHOptionMode: 'LCHModePipe',
		});
	});	

	before(function () {
		return browser.OLSKFireKeyboardEvent(browser.window, 'a');
	});

	context('Tab', function () {

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
		});

		it('hides OLSKResultsList', function() {
			browser.assert.elements('.OLSKResultsList', 0);
		});

		after(function () {
			browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
			return browser.OLSKFireKeyboardEvent(browser.window, 'a');
		});
	
	});

	context('Escape', function () {

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		it('hides OLSKResultsList', function() {
			browser.assert.elements('.OLSKResultsList', 0);
		});

		after(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'a');
		});
	
	});

	context('DotMode', function () {

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, '.');
		});

		it('hides OLSKResultsList', function() {
			browser.assert.elements('.OLSKResultsList', 0);
		});
		
		after(function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			return browser.OLSKFireKeyboardEvent(browser.window, 'a');
		});
	
	});

	context('keydown', function() {

		before(function () {
			browser.OLSKFireKeyboardEvent(browser.window, 'a');
		})

		it('hides OLSKResultsList', function() {
			browser.assert.elements('.OLSKResultsList', 0);
		});

	});

	context('ArrowDown', function () {

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
		});

		it('shows OLSKResultsList', function() {
			browser.assert.elements('.OLSKResultsList', 1);
		});

		it('selects first item', function() {
			browser.assert.text('.OLSKResultsListItemSelected', 'alfa');
		});

		context('visible', function () {
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
			});

			it('selects next item', function() {
				browser.assert.text('.OLSKResultsListItemSelected', 'bravo');
			});
		
		});

		context('re-entry', function () {
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			before(function () { // #purge
				return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
			});

			it('keeps selection', function() {
				browser.assert.text('.OLSKResultsListItemSelected', 'bravo');
			});
		
		});

		after(function () {
			browser.OLSKFireKeyboardEvent(browser.window, 'a');
		})

	});

	context('ArrowUp', function () {

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
		});

		it('shows OLSKResultsList', function() {
			browser.assert.elements('.OLSKResultsList', 1);
		});

		it('selects first item', function() {
			browser.assert.text('.OLSKResultsListItemSelected', 'alfa');
		});

		context('visible', function () {
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
			});

			before(function () { // #purge
				return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
			});

			it('selects previous item', function() {
				browser.assert.text('.OLSKResultsListItemSelected', 'bravo');
			});
		
		});

		context('re-entry', function () {
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
			});

			it('keeps selection', function() {
				browser.assert.text('.OLSKResultsListItemSelected', 'bravo');
			});
		
		});

		after(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});
	
	});

});

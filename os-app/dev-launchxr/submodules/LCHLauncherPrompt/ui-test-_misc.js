const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHLauncherPrompt_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			LCHLauncherPromptItems: uStubStringify(uStubTwoItems()),
			LCHLauncherPromptFilterInputPlaceholderText: 'charlie',
			LCHLauncherPromptPlaceholderText: 'delta',
		});
	});

	describe('LCHLauncherFilterInput', function test_LCHLauncherFilterInput () {
		
		it('sets placeholder', function () {
			browser.assert.attribute(LCHLauncherFilterInput, 'placeholder', 'charlie');
		});
		
		it('sets autofocus', function () {
			browser.assert.attribute(LCHLauncherFilterInput, 'autofocus', '');
		});
		
	});

	describe('LCHLauncherPromptPlaceholder', function test_LCHLauncherPromptPlaceholder () {
		
		it('binds LCHLauncherPromptPlaceholderText', function () {
			browser.assert.text(LCHLauncherPromptPlaceholder, 'delta');
		});
		
	});

	describe('LCHLauncherPromptSelectedItem', function test_LCHLauncherPromptSelectedItem () {
		
		before(function () {
			return browser.fill(LCHLauncherFilterInput, 'alfa');
		});
		
		it('binds OLSKCollectionItemLocus', function () {
			browser.assert.text(`${ LCHLauncherPromptSelectedItem } .LCHLauncherResultItemTitle`, 'alfa');
		});
		
	});

	describe('LCHLauncherPromptResultItem', function test_LCHLauncherPromptResultItem () {
		
		context('click', function () {

			before(function () {
				browser.assert.text('#TestLCHLauncherPromptDispatchSelect', '1');	
				browser.assert.text('#TestLCHLauncherPromptDispatchSelectData', JSON.stringify(uStubTwoItems()[0]));
			});
			
			before(function () {
				return browser.click(LCHLauncherPromptResultItem);
			});

			it('sends LCHLauncherPromptDispatchSelect', function () {
				browser.assert.text('#TestLCHLauncherPromptDispatchSelect', '2');	
				browser.assert.text('#TestLCHLauncherPromptDispatchSelectData', JSON.stringify(uStubTwoItems()[0]));
			});
		
		});
		
	});

});

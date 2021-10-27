const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHLaunchxrPrompt_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			LCHLaunchxrPromptItems: uStubStringify(uStubTwoItems()),
			LCHLaunchxrPromptFilterInputPlaceholderText: 'charlie',
			LCHLaunchxrPromptPlaceholderText: 'delta',
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

	describe('LCHLaunchxrPromptPlaceholder', function test_LCHLaunchxrPromptPlaceholder () {
		
		it('binds LCHLaunchxrPromptPlaceholderText', function () {
			browser.assert.text(LCHLaunchxrPromptPlaceholder, 'delta');
		});
		
	});

	describe('LCHLaunchxrPromptSelectedItem', function test_LCHLaunchxrPromptSelectedItem () {
		
		before(function () {
			return browser.fill(LCHLauncherFilterInput, 'alfa');
		});
		
		it('binds OLSKCollectionItemLocus', function () {
			browser.assert.text(`${ LCHLaunchxrPromptSelectedItem } .LCHLauncherResultItemTitle`, 'alfa');
		});
		
	});

	describe('LCHLaunchxrPromptResultItem', function test_LCHLaunchxrPromptResultItem () {
		
		context('click', function () {

			before(function () {
				browser.assert.text('#TestLCHLaunchxrPromptDispatchSelect', '1');	
				browser.assert.text('#TestLCHLaunchxrPromptDispatchSelectData', JSON.stringify(uStubTwoItems()[0]));
			});
			
			before(function () {
				return browser.click(LCHLaunchxrPromptResultItem);
			});

			it('sends LCHLaunchxrPromptDispatchSelect', function () {
				browser.assert.text('#TestLCHLaunchxrPromptDispatchSelect', '2');	
				browser.assert.text('#TestLCHLaunchxrPromptDispatchSelectData', JSON.stringify(uStubTwoItems()[0]));
			});
		
		});
		
	});

});

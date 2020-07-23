const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHLauncherPipePrompt_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			LCHLauncherPipePromptItems: uStubStringify(uStubTwoItems()),
			LCHLauncherPipePromptFilterInputPlaceholderText: 'alfa',
		});
	});

	describe('LCHLauncherFilterInput', function test_LCHLauncherFilterInput () {
		
		it('sets placeholder', function () {
			browser.assert.attribute(LCHLauncherFilterInput, 'placeholder', 'alfa');
		});
		
		it('sets autofocus', function () {
			browser.assert.attribute(LCHLauncherFilterInput, 'autofocus', '');
		});
		
	});

	describe('LCHLauncherResultItem', function test_LCHLauncherResultItem () {
		
		before(function () {
			return browser.fill(LCHLauncherFilterInput, 'alfa');
		});
		
		context('click', function () {

			before(function () {
				browser.assert.text('#TestLCHLauncherPipePromptDispatchSelect', '1');	
				browser.assert.text('#TestLCHLauncherPipePromptDispatchSelectData', JSON.stringify(uStubTwoItems()[0]));
			});
			
			before(function () {
				return browser.click(LCHLauncherResultItem);
			});

			it('sends LCHLauncherPipePromptDispatchSelect', function () {
				browser.assert.text('#TestLCHLauncherPipePromptDispatchSelect', '2');	
				browser.assert.text('#TestLCHLauncherPipePromptDispatchSelectData', JSON.stringify(uStubTwoItems()[0]));
			});
		
		});
		
	});

});

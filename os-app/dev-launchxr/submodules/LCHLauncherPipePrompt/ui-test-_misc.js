const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHLauncherPipePrompt_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			LCHLauncherPipePromptItems: uStubStringify(uStubTwoItems()),
			LCHLauncherPipePromptFilterInputPlaceholderText: 'charlie',
			LCHLauncherPipePromptPlaceholderText: 'delta',
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

	describe('LCHLauncherPipePromptPlaceholder', function test_LCHLauncherPipePromptPlaceholder () {
		
		it('binds LCHLauncherPipePromptPlaceholderText', function () {
			browser.assert.text(LCHLauncherPipePromptPlaceholder, 'delta');
		});
		
	});

	describe('LCHLauncherPipePromptSelectedItem', function test_LCHLauncherPipePromptSelectedItem () {
		
		before(function () {
			return browser.fill(LCHLauncherFilterInput, 'alfa');
		});
		
		it('binds OLSKResultsListItemSelected', function () {
			browser.assert.text(`${ LCHLauncherPipePromptSelectedItem } .LCHLauncherResultItemTitle`, 'alfa');
		});
		
	});

	describe('LCHLauncherPipePromptResultItem', function test_LCHLauncherPipePromptResultItem () {
		
		context('click', function () {

			before(function () {
				browser.assert.text('#TestLCHLauncherPipePromptDispatchSelect', '1');	
				browser.assert.text('#TestLCHLauncherPipePromptDispatchSelectData', JSON.stringify(uStubTwoItems()[0]));
			});
			
			before(function () {
				return browser.click(LCHLauncherPipePromptResultItem);
			});

			it('sends LCHLauncherPipePromptDispatchSelect', function () {
				browser.assert.text('#TestLCHLauncherPipePromptDispatchSelect', '2');	
				browser.assert.text('#TestLCHLauncherPipePromptDispatchSelectData', JSON.stringify(uStubTwoItems()[0]));
			});
		
		});
		
	});

});

import { deepEqual } from 'assert';

const kDefaultRoutePath = '/launcher?loadRecipes=actions/LCHLargeText';

const uInvoke = async function () {
	browser.fill(LCHLauncherFilterInput, 'LCHLargeTextTest');
	await browser.wait({element: LCHLauncherListItem});

	browser.click(LCHLauncherListItem);
	await browser.wait({element: LCHLargeTextContainer});
}

describe('LCHLargeTextFeature', function () {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});

	context('Callback', function testCallback () {
		
		it('displays input', async function() {
			browser.wait({ element: LCHLauncherFilterInput })

			await uInvoke()

			browser.assert.text(LCHLargeTextContainer, 'LCHLargeTextAlfa');
		});
	
	});

	context('Click', function testClick() {
		
		it('does nothing if inside', async function() {
			browser.click(`${ LCHLargeTextContainer } span`);
			await browser.wait({element: LCHLauncherListItem});
			
			browser.assert.elements(LCHLargeTextContainer, 1);
		});
		
		it('hides LCHLargeTextContainer', async function() {
			browser.click('textarea');
			await browser.wait({element: LCHLauncherListItem});

			browser.assert.elements(LCHLargeTextContainer, 0);
		});
	
	});

	context('Keydown', function testKeydown() {

		it('hides LCHLargeTextContainer', async function() {
			browser.pressButton('button')
			await browser.wait({ element: LCHLauncherFilterInput })

			await uInvoke();

			browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			await browser.wait({ element: LCHLargeTextContainer });

			browser.assert.elements(LCHLargeTextContainer, 0);
		});
	
	});

});

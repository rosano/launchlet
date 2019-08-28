import { deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = '/launcher';

describe('LCHLauncherUIFeature', function () {

	context('LCHLauncherModeCommit', function () {

		before(function() {
			return browser.visit(`${ kDefaultRoutePath }?runMode=kRunModeCommit`);
		});
		
		it('shows no items if no filter', function() {
			browser.assert.elements(LCHLauncherListItem, 0);
		});
		
		it('shows no items if no match', async function() {
			browser.fill(LCHLauncherFilterInput, 'alfabravo');
			await browser.wait({element: LCHLauncherFilterInput});

			browser.assert.elements(LCHLauncherListItem, 0);
		});

		it('shows items if filter and match', async function() {
			browser.fill(LCHLauncherFilterInput, 'a');
			await browser.wait({element: LCHLauncherListItem});
			
			browser.assert.elements(LCHLauncherListItem, 5);
		});

		it('selects first item', async function() {
			browser.assert.hasClass(browser.queryAll(LCHLauncherListItem)[0], 'LCHLauncherResultListItemSelected');
		});

		it.skip('selects item on mouseover', async function() {
			browser.fire(browser.queryAll(LCHLauncherListItem)[1], 'mouseover');
			await browser.wait({element: LCHLauncherListItem});

			browser.assert.hasClass(browser.queryAll(LCHLauncherListItem)[1], 'LCHLauncherResultListItemSelected');
		});

		it('does not run item on select', async function() {
			browser.assert.input('textarea', '');
		});

		it('runs item and closes on click', async function() {
			browser.fire(browser.queryAll(LCHLauncherListItem)[0], 'click');
			await browser.wait({element: LCHLauncherListItem});

			browser.assert.input('textarea', 'Alfa');

			browser.assert.elements(LCHLauncherFilterInput, 0);
		});

		context('shortcuts', function () {

			before(function() {
				return browser.visit(`${ kDefaultRoutePath }?runMode=kRunModeCommit`);
			});

			it('selects next item on ArrowDown', async function() {
				browser.fill(LCHLauncherFilterInput, 'a');
				await browser.wait({element: LCHLauncherListItem});

				browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
				await browser.wait({element: LCHLauncherListItem});

				browser.assert.hasClass(browser.queryAll(LCHLauncherListItem)[1], 'LCHLauncherResultListItemSelected');
			});

			it('selects previous item on ArrowUp', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
				await browser.wait({element: LCHLauncherListItem});

				browser.assert.hasClass(browser.queryAll(LCHLauncherListItem)[0], 'LCHLauncherResultListItemSelected');
			});

			it('runs item and closes on Enter', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
				await browser.wait({element: LCHLauncherListItem});

				browser.assert.elements(LCHLauncherFilterInput, 0);
			});

		});

	});

	context('LCHLauncherModePreview', function () {

		before(function() {
			return browser.visit(`${ kDefaultRoutePath }?runMode=kRunModePreview`);
		});

		it('selects no items', async function() {
			browser.assert.elements('.LCHLauncherResultListItemSelected', 0);
		});

		it.skip('selects item on mouseover', async function() {
			browser.fire(browser.queryAll(LCHLauncherListItem)[1], 'mouseover');
			await browser.wait({element: LCHLauncherListItem});

			browser.assert.hasClass(browser.queryAll(LCHLauncherListItem)[1], 'LCHLauncherResultListItemSelected');
		});

		it('does not run item on mouseover', async function() {
			browser.assert.input('textarea', '');
		});

		it('runs first item if filter and match', async function() {
			browser.fill(LCHLauncherFilterInput, 'a');
			await browser.wait({element: LCHLauncherListItem});
			
			browser.assert.input('textarea', 'Alfa');
		});

		it('runs item and closes on click', async function() {
			browser.fire(browser.queryAll(LCHLauncherListItem)[1], 'click');
			await browser.wait({element: LCHLauncherListItem});

			browser.assert.input('textarea', 'Bravo');

			browser.assert.elements(LCHLauncherFilterInput, 0);
		});


		context('shortcuts', function () {

			before(function() {
				return browser.visit(`${ kDefaultRoutePath }?runMode=kRunModePreview`);
			});

			it('runs item on ArrowDown', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
				await browser.wait({element: LCHLauncherListItem});

				browser.assert.input('textarea', 'Alfa');
			});

			it('runs item on ArrowUp', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
				await browser.wait({element: LCHLauncherListItem});

				browser.assert.input('textarea', 'Hello');
			});

			it('closes on Enter', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
				await browser.wait({element: LCHLauncherListItem});

				browser.assert.elements(LCHLauncherFilterInput, 0);
			});

		});

	});

	context('LCHLauncherModePipe', function () {
		
		context('on startup', function() {

			before(function() {
				return browser.visit(`${ kDefaultRoutePath }?runMode=kRunModePipe`);
			});
			
			it('selects LCHLauncherSubjectPrompt', function() {
				browser.assert.hasClass(LCHLauncherSubjectPrompt, 'LCHLauncherPromptSelected');
			});

			it('does nothing on Enter if no input', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
				await browser.wait({element: LCHLauncherSubjectPrompt});

				browser.assert.elements(LCHLauncherSubjectPrompt, 1);
			});

			it('runs item and closes on Enter', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'a');
				await browser.wait({element: LCHLauncherPipeItem});

				browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
				await browser.wait({element: LCHLauncherSubjectPrompt});

				browser.assert.elements(LCHLauncherSubjectPrompt, 0);
				
				browser.assert.input('textarea', 'Alfa');
			});

		});
		
		context('active prompt', function() {

			before(async function() {
				await browser.visit(`${ kDefaultRoutePath }?runMode=kRunModePipe`);

				browser.OLSKFireKeyboardEvent(browser.window, 'w');
				await browser.wait({element: LCHLauncherResultList});
			});
			
			it.skip('stops keydown from bubbling', async function() {
				browser.assert.input('#LCHLauncherTestInputSingleLine', '');
			});
			
			it('updates on click', async function() {
				browser.click(LCHLauncherActionPrompt);
				await browser.wait({element: LCHLauncherActionPrompt});
				
				browser.assert.hasClass(LCHLauncherActionPrompt, 'LCHLauncherPromptSelected');
			});

			it('updates on Tab', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
				await browser.wait({element: LCHLauncherObjectPrompt});
				
				browser.assert.hasClass(LCHLauncherObjectPrompt, 'LCHLauncherPromptSelected');
			});

			it('updates on Shift Tab', async function() {
				browser.click(LCHLauncherActionPrompt);
				await browser.wait({element: LCHLauncherActionPrompt});

				browser.OLSKFireKeyboardEvent(browser.window, 'Tab', {
					shiftKey: true,
				});
				await browser.wait({element: LCHLauncherSubjectPrompt});
				
				browser.assert.hasClass(LCHLauncherSubjectPrompt, 'LCHLauncherPromptSelected');
			});

			it('does nothing on click if no subject', async function() {
				browser.click(LCHLauncherSubjectPrompt);
				browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
				browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
				await browser.wait({element: LCHLauncherPipeItem});

				browser.click(LCHLauncherActionPrompt);
				await browser.wait({element: LCHLauncherActionPrompt});
				
				browser.assert.hasClass(LCHLauncherSubjectPrompt, 'LCHLauncherPromptSelected');
			});

			it('does nothing on Tab if no subject', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
				await browser.wait({element: LCHLauncherPipeItem});

				browser.assert.hasClass(LCHLauncherSubjectPrompt, 'LCHLauncherPromptSelected');
			});

			it('does nothing on Shift Tab if no subject', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Tab', {
					shiftKey: true,
				});
				await browser.wait({element: LCHLauncherPipeItem});

				browser.assert.hasClass(LCHLauncherSubjectPrompt, 'LCHLauncherPromptSelected');
			});

		});

		context('MatchStop', function() {

			before(async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'a');
				await browser.wait({element: LCHLauncherSubjectPromptHeading});

				browser.assert.hasNoClass(LCHLauncherSubjectPromptHeading, 'LCHLauncherPromptHeadingMatchStop');
			});

			it('adds class', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'x');
				await browser.wait({element: LCHLauncherSubjectPromptHeading});

				browser.assert.hasClass(LCHLauncherSubjectPromptHeading, 'LCHLauncherPromptHeadingMatchStop');
			});
			
		});

		context('SubjectContainer', function testSubjectContainer () {

			before(async function() {
				return browser.visit(`${ kDefaultRoutePath }?runMode=kRunModePipe`);
			});

			it('shows subject', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'a');
				browser.OLSKFireKeyboardEvent(browser.window, 'd');
				await browser.wait({element: LCHLauncherSubjectPromptItemSelected});

				browser.assert.text(LCHLauncherSubjectPromptItemSelected, 'Active Document Link Elements SubjectContainer');
			});

			it('shows action', async function() {
				browser.assert.text(LCHLauncherActionPromptItemSelected, 'Show Contents');
			});

			it('reloads subjects', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
				await browser.wait({element: LCHLauncherSubjectPromptItemSelected });

				browser.assert.text(LCHLauncherSubjectPromptItemSelected, 'alfa DOMElement');
			});
			
		});

	});
		
	context('shared', function () {

		before(function() {
			return browser.visit(kDefaultRoutePath);
		});

		it('closes on Escape', async function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			await browser.wait({element: LCHLauncherFilterInput});

			browser.assert.elements(LCHLauncherFilterInput, 0);
		});

	});

});

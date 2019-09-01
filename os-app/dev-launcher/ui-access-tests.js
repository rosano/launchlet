import { deepEqual } from 'assert';
import { LCHLauncherThrottleDuration } from './ui-logic.js';

const browser = new OLSKBrowser();
const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().LCHLauncherRoute.OLSKRoutePath;

Object.entries({
	LCHLauncherFilterInput: '#LCHLauncherFilterInput',
	LCHLauncherSubjectPrompt: '.LCHLauncherSubjectPrompt',
	LCHLauncherSubjectPromptHeading: '.LCHLauncherSubjectPrompt .LCHLauncherPromptHeading',
	LCHLauncherSubjectPromptPlaceholder: '.LCHLauncherSubjectPromptPlaceholder',
	LCHLauncherSubjectPromptItemSelected: '.LCHLauncherSubjectPrompt .LCHLauncherZoneInput .LCHLauncherPipeItem',
	LCHLauncherActionPrompt: '.LCHLauncherActionPrompt',
	LCHLauncherActionPromptHeading: '.LCHLauncherActionPrompt .LCHLauncherPromptHeading',
	LCHLauncherActionPromptItemSelected: '.LCHLauncherActionPrompt .LCHLauncherZoneInput .LCHLauncherPipeItem',
	LCHLauncherObjectPrompt: '.LCHLauncherObjectPrompt',
	LCHLauncherObjectPromptHeading: '.LCHLauncherObjectPrompt .LCHLauncherPromptHeading',
	LCHLauncherObjectPromptItemSelected: '.LCHLauncherObjectPrompt .LCHLauncherZoneInput .LCHLauncherPipeItem',
	LCHLauncherPromptDotModeInput: '.LCHLauncherPromptDotModeInput',

	LCHLauncherListItem: '.LCHLauncherResultListItem',

	LCHLauncherPipeItem: '.LCHLauncherPipeItem',
	LCHLauncherResultList: '.LCHLauncherResultList',
	LCHLauncherResultListItem: '.LCHLauncherResultListItem',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHLauncherUIAccess', function() {

	context('LCHLauncherModeCommit', function () {

		before(function() {
			return browser.visit(`${ kDefaultRoutePath }?runMode=kRunModeCommit`);
		});
		
		it('on startup', function() {
			browser.assert.elements(LCHLauncherFilterInput, 1);
			browser.assert.elements(LCHLauncherPromptDotModeInput, 0);
			browser.assert.elements(LCHLauncherSubjectPromptPlaceholder, 0);

			browser.assert.elements(LCHLauncherListItem, 0);
		});

		it('on filter', async function() {
			browser.fill(LCHLauncherFilterInput, 'a');
			await browser.wait({element: LCHLauncherListItem});

			browser.assert.elements(LCHLauncherListItem, 5);
		});

	});

	context('LCHLauncherModePreview', function () {

		before(function() {
			return browser.visit(`${ kDefaultRoutePath }?runMode=kRunModePreview`);
		});
		
		it('on startup', function() {
			browser.assert.elements(LCHLauncherFilterInput, 1);
			browser.assert.elements(LCHLauncherPromptDotModeInput, 0);
			browser.assert.elements(LCHLauncherSubjectPromptPlaceholder, 0);

			browser.assert.elements(LCHLauncherListItem, 13);
		});

		it('on filter', async function() {
			browser.fill(LCHLauncherFilterInput, 'a');
			await browser.wait({element: LCHLauncherListItem});

			browser.assert.elements(LCHLauncherListItem, 5);
		});

	});

	context('LCHLauncherModePipe', function () {

		before(function() {
			return browser.visit(`${ kDefaultRoutePath }?runMode=kRunModePipe`);
		});
		
		it('on startup', function() {
			browser.assert.elements(LCHLauncherFilterInput, 0);
			browser.assert.elements(LCHLauncherPromptDotModeInput, 0);
			browser.assert.elements(LCHLauncherSubjectPromptPlaceholder, 1);

			browser.assert.elements(LCHLauncherListItem, 0);
			browser.assert.elements(LCHLauncherResultList, 0);
			browser.assert.elements(LCHLauncherResultListItem, 0);
			browser.assert.elements(LCHLauncherPipeItem, 0);
		});
		
		context('on keydown', function() {
			
			it('does nothing if no match', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, '[');
				await browser.wait({element: LCHLauncherSubjectPromptHeading});
				deepEqual(browser.query(LCHLauncherSubjectPromptHeading).textContent, '[');

				browser.assert.elements(LCHLauncherPipeItem, 0);
			});
			
			it('shows first item if match', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
				browser.OLSKFireKeyboardEvent(browser.window, 'a');
				await browser.wait({element: LCHLauncherSubjectPromptHeading});

				browser.assert.elements(LCHLauncherSubjectPromptPlaceholder, 0);

				browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
				browser.assert.elements(LCHLauncherActionPromptItemSelected, 1);
			});
			
			it('hides list', async function() {
				browser.assert.elements(LCHLauncherResultList, 0);
				browser.assert.elements(LCHLauncherResultListItem, 0);
			});

			it('shows list after throttle', async function() {
				await browser.wait({element: LCHLauncherResultList});

				browser.assert.elements(LCHLauncherResultList, 1);
				browser.assert.elements(LCHLauncherResultListItem, 8);
			});

			it('selects first list item', async function() {
				await browser.wait({element: '.LCHLauncherResultListItemSelected'});
				browser.assert.hasClass(`${ LCHLauncherResultListItem }:first-child`, 'LCHLauncherResultListItemSelected');
			});

			it('skips throttle on ArrowDown', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
				browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
				browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
				await browser.wait({element: LCHLauncherPipeItem});

				browser.assert.elements(LCHLauncherPipeItem, 0);

				browser.OLSKFireKeyboardEvent(browser.window, 'a');
				browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
				await browser.wait({element: LCHLauncherResultList});
				browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
				browser.assert.elements(LCHLauncherResultList, 1);
				browser.assert.elements(LCHLauncherResultListItem, 8);
			});

			it('skips throttle on ArrowUp', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
				browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
				await browser.wait({element: LCHLauncherPipeItem});

				browser.assert.elements(LCHLauncherPipeItem, 0);

				browser.OLSKFireKeyboardEvent(browser.window, 'a');
				browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
				await browser.wait({element: LCHLauncherResultList});
				browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
				browser.assert.elements(LCHLauncherResultList, 1);
				browser.assert.elements(LCHLauncherResultListItem, 8);
			});

			it('hides list on Escape', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
				await browser.wait({element: LCHLauncherPipeItem});

				browser.assert.elements(LCHLauncherResultList, 0);
			});

			it('shows list on ArrowDown', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
				await browser.wait({element: LCHLauncherPipeItem});

				browser.assert.elements(LCHLauncherResultList, 1);
			});

			it('hides list on Escape', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
				await browser.wait({element: LCHLauncherPipeItem});

				browser.assert.elements(LCHLauncherResultList, 0);
			});

			it('shows list on ArrowUp', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
				await browser.wait({element: LCHLauncherPipeItem});

				browser.assert.elements(LCHLauncherResultList, 1);
			});

			it('clears filter text on subsequent prompts', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
				await browser.wait({element: LCHLauncherActionPrompt});

				browser.OLSKFireKeyboardEvent(browser.window, 'a');
				await browser.wait({element: LCHLauncherActionPromptHeading});

				browser.assert.text(LCHLauncherActionPromptHeading, 'A');

				browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
				await browser.wait({element: LCHLauncherSubjectPrompt});

				browser.OLSKFireKeyboardEvent(browser.window, 'a');
				await browser.wait({element: LCHLauncherSubjectPromptHeading});

				browser.assert.text(LCHLauncherSubjectPromptHeading, 'A');
				browser.assert.text(LCHLauncherActionPromptHeading, 'Action');
			});

			context('MatchStop', function() {

				before(async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'x');
					await browser.wait({element: LCHLauncherSubjectPromptItemSelected});
				});

				it('shows result list', async function() {
					browser.assert.elements(LCHLauncherResultList, 1);
				});

				it('keeps matched results', async function() {
					browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
					browser.assert.elements(LCHLauncherResultListItem, 8);
				});

				it('passes MatchStop to LCHLauncherPromptHeading', async function() {
					browser.assert.elements('.LCHLauncherPromptHeadingMatchStop', 1);
				});

				it('continues to throttle keydown', async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'x');
					await browser.wait({element: LCHLauncherSubjectPromptItemSelected});

					deepEqual(browser.query(LCHLauncherSubjectPromptHeading).textContent, 'AXX');
					browser.assert.elements(LCHLauncherResultList, 1);
					browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
					browser.assert.elements(LCHLauncherResultListItem, 8);
				});

				it('removes MatchStop on keydown', async function() {
					await browser.wait({duration: LCHLauncherThrottleDuration * 2});
					browser.OLSKFireKeyboardEvent(browser.window, 'a');
					await browser.wait({element: LCHLauncherSubjectPromptItemSelected});

					deepEqual(browser.query(LCHLauncherSubjectPromptHeading).textContent, 'A');
					browser.assert.elements('.LCHLauncherPromptHeadingMatchStop', 0);
				});
				
			});

			context('on Backspace after throttle', function() {

				before(async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');

					browser.OLSKFireKeyboardEvent(browser.window, 'a');
					browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
					await browser.wait({element: LCHLauncherResultList});

					browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
					browser.assert.elements(LCHLauncherResultList, 1);
					browser.assert.elements(LCHLauncherResultListItem, 8);

					browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
					await browser.wait({element: LCHLauncherSubjectPromptItemSelected});
				});
				
				it('clears filter ', function() {
					deepEqual(browser.query(LCHLauncherSubjectPromptHeading).textContent, 'Subject');
				});
				
				it('keeps results', function() {
					browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
					browser.assert.elements(LCHLauncherResultList, 1);
					browser.assert.elements(LCHLauncherResultListItem, 8);
				});

			});

			context('on Backspace after clear filter', function() {

				before(async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
					await browser.wait({element: LCHLauncherPipeItem});
				});
				
				it('clears results', function() {
					browser.assert.elements(LCHLauncherPipeItem, 0);
				});
				
				it('shows placeholder', function() {
					browser.assert.elements(LCHLauncherSubjectPromptPlaceholder, 1);
				});

			});

			context('on type after inputThrottle', function() {

				before(async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'a');
					await browser.wait({duration: LCHLauncherThrottleDuration * 2});

					deepEqual(browser.query(LCHLauncherSubjectPromptHeading).textContent, 'A');
					browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
					browser.assert.elements(LCHLauncherResultList, 1);
					browser.assert.elements(LCHLauncherResultListItem, 8);

					browser.OLSKFireKeyboardEvent(browser.window, 'b');
					await browser.wait({element: LCHLauncherResultList});
				});
				
				it('replaces filter', function() {
					deepEqual(browser.query(LCHLauncherSubjectPromptHeading).textContent, 'B');
				});

			});

			context('on Tab', function () {
				
				it('hides open result list', async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
					await browser.wait({element: LCHLauncherSubjectPrompt});
					
					browser.assert.elements(LCHLauncherResultList, 0);
				});

			});

		});

		context('Tab', function () {

			it('cancels throttle', async function() {
				await browser.visit(`${ kDefaultRoutePath }?runMode=kRunModePipe`);

				browser.OLSKFireKeyboardEvent(browser.window, 'a');
				browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
				browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
				browser.OLSKFireKeyboardEvent(browser.window, 'a');
				await browser.wait({element: LCHLauncherSubjectPromptHeading});

				browser.assert.text(LCHLauncherSubjectPromptHeading, 'A');

				browser.OLSKFireKeyboardEvent(browser.window, 'a');
				browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
				await browser.wait({duration: LCHLauncherThrottleDuration});

				browser.assert.elements(LCHLauncherResultList, 0);

			});
		
		});

		context('DotModeInput', function () {

			before(function() {
				return browser.visit(`${ kDefaultRoutePath }?runMode=kRunModePipe`);
			});
				
			context('on Dot', function () {
				
				it('hides LCHLauncherSubjectPromptPlaceholder', async function() {
					browser.OLSKFireKeyboardEvent(browser.window, '.');
					await browser.wait({element: LCHLauncherPromptDotModeInput});
					
					browser.assert.elements(LCHLauncherSubjectPromptPlaceholder, 0);
				});
					
				it('shows LCHLauncherPromptDotModeInput', function() {
					browser.assert.elements(LCHLauncherPromptDotModeInput, 1);
					browser.assert.attribute(LCHLauncherPromptDotModeInput, 'autofocus', '');
				});

				it('focuses input', function() { // #move interaction
					deepEqual(browser.document.activeElement, browser.query(LCHLauncherPromptDotModeInput));
				});
			
			});
				
			context('on Escape', function () {
				
				it('hide LCHLauncherPromptDotModeInput', function() {
					browser.assert.elements(LCHLauncherPromptDotModeInput, 1);
				});
					
				it('shows LCHLauncherSubjectPromptPlaceholder', async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
					await browser.wait({element: LCHLauncherPromptDotModeInput});
					
					browser.assert.elements(LCHLauncherSubjectPromptPlaceholder, 1);
				});
			
			});
				
			context('on Dot when results visible', function () {

				before(async function () {
					browser.OLSKFireKeyboardEvent(browser.window, 'a');
					await browser.wait({element: LCHLauncherResultList});

					browser.OLSKFireKeyboardEvent(browser.window, '.');
					await browser.wait({element: LCHLauncherPromptDotModeInput});
				});
				
				it('hides results', async function() {
					browser.assert.elements(LCHLauncherResultList, 0);
				});

				it('clears filter text', function() {
					browser.assert.text(LCHLauncherSubjectPromptHeading, 'Subject'); // #move language
				});

				it('clears actions', function() {
					browser.assert.elements(LCHLauncherPipeItem, 0);
				});
			
			});
				
			context('on Dot when throttling', function () {

				before(async function () {
					browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
					await browser.wait({element: LCHLauncherSubjectPromptPlaceholder});

					browser.OLSKFireKeyboardEvent(browser.window, 'a');
					browser.OLSKFireKeyboardEvent(browser.window, '.');
					await browser.wait({duration: LCHLauncherThrottleDuration});
				});
				
				it('skips throttle', async function() {
					browser.assert.elements(LCHLauncherResultList, 0);
				});
			
			});
				
			context('in mode', function () {

				before(async function () {
					browser.OLSKFireKeyboardEvent(browser.window, '.');
					await browser.wait({element: LCHLauncherPromptDotModeInput});
				});
				
				it('shows no actions', async function() {
					browser.assert.elements(LCHLauncherPipeItem, 0);
				});

				it('shows actions if filled', async function() {
					browser.fill(LCHLauncherPromptDotModeInput, 'alfa');
					await browser.wait({element: LCHLauncherPipeItem});

					browser.assert.elements(LCHLauncherPipeItem, 1);
				});

				it('upates actions for type', async function() {
					browser.fill(LCHLauncherPromptDotModeInput, 'https://example.com');
					await browser.wait({element: LCHLauncherPipeItem});

					browser.assert.text(LCHLauncherPipeItem, 'Open URL');
				});

				it('shows no actions if empty', async function() {
					browser.fill(LCHLauncherPromptDotModeInput, '');
					await browser.wait({element: LCHLauncherPromptDotModeInput});

					browser.assert.elements(LCHLauncherPipeItem, 0);
				});

				context('on Escape', function () {

					before(function () {
						browser.fill(LCHLauncherPromptDotModeInput, 'bravo');
						browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
						return browser.wait({element: LCHLauncherPipeItem});
					});
					
					it('shows text item as pipe item', async function() {
						browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
					});
				
				});

				context('on Tab', function () {

					before(async function () {
						browser.OLSKFireKeyboardEvent(browser.window, '.');
						await browser.wait({element: LCHLauncherPromptDotModeInput});

						browser.fill(LCHLauncherPromptDotModeInput, '');
						browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
						await browser.wait({element: LCHLauncherPromptDotModeInput});
					});
					
					it('does nothing if empty', async function() {
						browser.assert.hasClass(LCHLauncherSubjectPrompt, 'LCHLauncherPromptSelected');
						browser.assert.elements(LCHLauncherSubjectPromptPlaceholder, 0);

						browser.OLSKFireKeyboardEvent(browser.window, '.');
						await browser.wait({element: LCHLauncherPromptDotModeInput});

						browser.fill(LCHLauncherPromptDotModeInput, 'charlie');
						browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
						await browser.wait({element: LCHLauncherPromptDotModeInput});
					});
					
					it('shows text item as pipe item', async function() {
						browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
					});
					
					it('selects next prompt', async function() {
						browser.assert.hasClass(LCHLauncherActionPrompt, 'LCHLauncherPromptSelected');
					});
					
					it('executes composition on Enter', async function() {
						browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
						await browser.wait({element: '#LCHCopyToClipboardButton'});

						browser.click('#LCHCopyToClipboardButton');
						await browser.wait({element: '#LCHLauncherTestDidFinish'});

						browser.assert.elements('#LCHLauncherTestDidFinish', 1);
					});
				
				});

				context('on Enter', function () {

					before(async function () {
						await browser.visit(`${ kDefaultRoutePath }?runMode=kRunModePipe`);

						browser.OLSKFireKeyboardEvent(browser.window, '.');
						await browser.wait({element: LCHLauncherPromptDotModeInput});

						browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
						await browser.wait({element: LCHLauncherSubjectPromptPlaceholder});
					});
					
					it('does nothing if empty', async function() {
						browser.assert.hasClass(LCHLauncherSubjectPrompt, 'LCHLauncherPromptSelected');
					});
					
					it('executes composition', async function() {
						browser.OLSKFireKeyboardEvent(browser.window, '.');
						await browser.wait({element: LCHLauncherPromptDotModeInput});

						browser.fill(LCHLauncherPromptDotModeInput, 'delta');
						await browser.wait({element: LCHLauncherPipeItem});

						browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
						await browser.wait({element: '#LCHCopyToClipboardButton'});

						browser.click('#LCHCopyToClipboardButton');
						await browser.wait({element: '#LCHLauncherTestDidFinish'});

						browser.assert.elements('#LCHLauncherTestDidFinish', 1);
					});
				
				});

			});
				
			context('on Dot when action prompt selected', function () {

				before(async function () {
					await browser.visit(`${ kDefaultRoutePath }?runMode=kRunModePipe`);

					browser.OLSKFireKeyboardEvent(browser.window, 'a');
					await browser.wait({element: LCHLauncherResultList});

					browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
					await browser.wait({element: LCHLauncherActionPrompt});

					browser.assert.elements(LCHLauncherPipeItem, 2);
				});

				it('does nothing if selected prompt is action', async function() {
					browser.OLSKFireKeyboardEvent(browser.window, '.');
					await browser.wait({element: LCHLauncherSubjectPrompt});

					browser.assert.elements(LCHLauncherPipeItem, 2);
				});
			
			});
				
			context('on Dot Escape', function () {

				before(async function () {
					await browser.visit(`${ kDefaultRoutePath }?runMode=kRunModePipe`);

					browser.OLSKFireKeyboardEvent(browser.window, '.');
					await browser.wait({element: LCHLauncherPromptDotModeInput});

					browser.fill(LCHLauncherPromptDotModeInput, 'alfa');
					await browser.wait({element: LCHLauncherPipeItem});

					browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
					await browser.wait({element: LCHLauncherPipeItem});
				});

				context('on re-entry', function () {

					before(async function () {
						browser.OLSKFireKeyboardEvent(browser.window, '.');
						await browser.wait({element: LCHLauncherPromptDotModeInput});
					});
					
					it('shows previous text input', async function() {
						browser.assert.input(LCHLauncherPromptDotModeInput, 'alfa');
					});
					
					it('shows actions', async function() {
						browser.assert.elements(LCHLauncherPipeItem, 1);
					});
				
				});

				context('on Backspace', function () {

					before(async function () {
						browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
						await browser.wait({element: LCHLauncherPipeItem});

						browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
						await browser.wait({element: LCHLauncherSubjectPromptPlaceholder});

						browser.OLSKFireKeyboardEvent(browser.window, '.');
						await browser.wait({element: LCHLauncherPromptDotModeInput});
					});
					
					it('shows empty text', async function() {
						browser.assert.input(LCHLauncherPromptDotModeInput, '');
					});
					
					it('shows no actions', async function() {
						browser.assert.elements(LCHLauncherPipeItem, 0);
					});
				
				});
			
			});

		});

		context('ObjectPrompt', function () {

			before(async function () {
				await browser.visit(`${ kDefaultRoutePath }?runMode=kRunModePipe`);
				
				browser.OLSKFireKeyboardEvent(browser.window, '.');
				await browser.wait({element: LCHLauncherPromptDotModeInput});
				
				browser.fill(LCHLauncherPromptDotModeInput, 'alfa');
				browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
				await browser.wait({element: LCHLauncherPromptDotModeInput});

				browser.assert.elements(LCHLauncherObjectPrompt, 0);

				browser.OLSKFireKeyboardEvent(browser.window, 'w');
				await browser.wait({element: LCHLauncherActionPromptItemSelected});
				browser.assert.elements(LCHLauncherActionPromptItemSelected, 1);
				browser.assert.text(LCHLauncherActionPromptItemSelected, 'Search With');
			});

			it('shows LCHLauncherObjectPrompt', async function() {
				browser.assert.elements(LCHLauncherObjectPrompt, 1);
			});

			it('localizes LCHLauncherObjectPromptHeading', async function() {
				browser.assert.text(LCHLauncherObjectPromptHeading, 'Object');
			});

			it('selects first object', async function() {
				browser.assert.text(`${ LCHLauncherObjectPromptItemSelected } .LCHLauncherPipeItemTitle`, 'Wikipedia');
			});

			it('selects LCHLauncherObjectPrompt on Tab', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
				await browser.wait({element: LCHLauncherPromptDotModeInput});

				browser.assert.hasClass(LCHLauncherObjectPrompt, 'LCHLauncherPromptSelected');
			});

			it('ignores Dot if not String', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, '.');
				await browser.wait({element: LCHLauncherPromptDotModeInput});
				
				browser.assert.elements(LCHLauncherPromptDotModeInput, 0);
			});

			it('selects LCHLauncherSubjectPrompt on Tab', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
				await browser.wait({element: LCHLauncherPromptDotModeInput});

				browser.assert.hasClass(LCHLauncherSubjectPrompt, 'LCHLauncherPromptSelected');
			});
				
			it('excludes string objects', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'w');
				await browser.wait({element: LCHLauncherPromptDotModeInput});

				browser.assert.elements(LCHLauncherObjectPromptItemSelected, 0);
			});

			it('focuses LCHLauncherObjectPrompt if one action', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
				await browser.wait({element: LCHLauncherPromptDotModeInput});

				browser.assert.hasClass(LCHLauncherObjectPrompt, 'LCHLauncherPromptSelected');
			});
				
			it('shows LCHLauncherPromptDotModeInput if String', function() {
				browser.assert.elements(LCHLauncherPromptDotModeInput, 1);
				browser.assert.attribute(LCHLauncherPromptDotModeInput, 'autofocus', '');
			});

		});

	});

	context('shared', function () {

		context('LCHLauncherTestURLFilter', function () {

			before(function() {
				return browser.visit(`${ kDefaultRoutePath }?LCHLauncherTestURLFilter`);
			});

			it('shows url specific item', async function() {
				browser.fill(LCHLauncherFilterInput, 'LCHLauncherTestURLFilter');
				await browser.wait({element: LCHLauncherListItem});

				browser.assert.elements(LCHLauncherListItem, 1);
			});

		});

		context('LCHLauncherTestStyle', function () {

			before(function() {
				return browser.visit(`${ kDefaultRoutePath }?LCHLauncherTestStyle`);
			});

			it('shows url specific item', async function() {
				browser.assert.elements('body style', 0);

				browser.fill(LCHLauncherFilterInput, 'LCHLauncherTestStyle');
				await browser.wait({element: LCHLauncherListItem});

				browser.click(LCHLauncherListItem);

				browser.assert.elements('body style', 1);
			});

		});

		context.skip('LCHLauncherTestConvertTypeServiceSearch', function () {

			before(function() {
				return browser.visit(`${ kDefaultRoutePath }?LCHLauncherTestConvertTypeServiceSearch`);
			});

			it('shows one item', async function() {
				browser.fill(LCHLauncherFilterInput, 'LCHLauncherTestConvertTypeServiceSearch');
				await browser.wait({element: LCHLauncherListItem});

				browser.assert.elements(LCHLauncherListItem, 1);
			});

		});

	});

});

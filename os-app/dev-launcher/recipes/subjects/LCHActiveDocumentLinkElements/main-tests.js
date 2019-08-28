import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHActiveDocumentLinkElementsCallback', function testLCHActiveDocumentLinkElementsCallback() {

});

describe('LCHActiveDocumentLinkElementsRecipe', function testLCHActiveDocumentLinkElementsRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHActiveDocumentLinkElementsRecipe(), {
			LCHRecipeName: 'Active Document Link Elements',
			LCHRecipeCallback: mainModule.LCHActiveDocumentLinkElementsCallback,
			LCHRecipeOutputType: 'Container',
			LCHRecipeSignature: 'LCHActiveDocumentLinkElements',
		});
	});

});

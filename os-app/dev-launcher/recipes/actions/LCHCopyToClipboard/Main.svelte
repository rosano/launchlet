<script>
import { OLSKLocalized } from '../../_shared.js';
import { _LCHIsTestingBehaviour } from '../../../_shared/common/global.js';
export let inputData = '';
export let completionHandler = null;

import { onMount } from 'svelte';
import Clipboard from 'clipboard';
let clipboardButton, clipboard;

let _didComplete = false;
function didComplete() {
	if (_didComplete) {
		return;
	}

	clipboard.destroy();

	completionHandler();

	_didComplete = true;
}

onMount(function () {
	clipboard = new Clipboard(clipboardButton);

	clipboard.on('success', function(e) {
		// console.log('success', e);
	  didComplete();
	});

	clipboard.on('error', function(e) {
		// console.log('error', e);
	  didComplete();
	});

	clipboardButton.addEventListener('click', function (e) {
		// console.log('click', e);
		didComplete();
	});

	clipboardButton.focus();
	
	if (_LCHIsTestingBehaviour()) {
		return;
	}

	clipboardButton.click();
});
</script>

<button data-clipboard-text={ inputData } bind:this={ clipboardButton } id="LCHCopyToClipboardButton">{ OLSKLocalized('LCHCopyToClipboardButtonText') }</button>

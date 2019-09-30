<script>
export let inputData;
export let LCHCopyToClipboardCompletionHandler;
export let OLSKLocalized;

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting'

import { onMount } from 'svelte';
import Clipboard from 'clipboard';
let clipboardButton, clipboard;

let _didComplete = false;
function didComplete() {
	if (_didComplete) {
		return;
	}

	clipboard.destroy();

	LCHCopyToClipboardCompletionHandler();

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
	
	if (OLSK_TESTING_BEHAVIOUR()) {
		return;
	}

	clipboardButton.click();
});
</script>

<button data-clipboard-text={ inputData } bind:this={ clipboardButton } id="LCHCopyToClipboardButton">{ OLSKLocalized('LCHCopyToClipboardButtonText') }</button>

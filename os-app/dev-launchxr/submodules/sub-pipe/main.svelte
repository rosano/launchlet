<script>
export let OLSKLocalized;
export let LCHLauncherPipeItems;

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting';

const mod = {

	// INTERFACE

	InterfaceWindowDidKeyDown () {
		const handlerFunctions = {

			Escape () {
			},

			Enter () {
			},

		};

		handlerFunctions[event.key] && handlerFunctions[event.key]();
	},

	// MESSAGE

	LCHLauncherPipePromptDispatchSelect (inputData) {
	},

	LCHLauncherPipePromptDispatchEscape () {
	},

};

import LCHLauncherPipePrompt from '../LCHLauncherPipePrompt/main.svelte';
</script>
<svelte:window on:keydown={ mod.InterfaceWindowDidKeyDown } />

<div class="LCHLauncherPipe LCHLauncher">

<div class="LCHLauncherPipeSubject">
	<LCHLauncherPipePrompt
		LCHLauncherPipePromptItems={ [] }
		LCHLauncherPipePromptPlaceholderText={ OLSKLocalized('LCHLauncherPipeSubjectPromptPlaceholderText') }
		LCHLauncherPipePromptFilterInputPlaceholderText={ OLSKLocalized('LCHLauncherPipeSubjectPromptFilterInputPlaceholderText') }
		LCHLauncherPipePromptDispatchSelect={ mod.LCHLauncherPipePromptDispatchSelect }
		LCHLauncherPipePromptDispatchEscape={ mod.LCHLauncherPipePromptDispatchEscape }
		/>
</div>

</div>

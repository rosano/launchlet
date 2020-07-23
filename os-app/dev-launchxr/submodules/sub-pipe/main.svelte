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

	LCHLauncherPromptDispatchSelect (inputData) {
	},

	LCHLauncherPromptDispatchEscape () {
	},

};

import LCHLauncherPrompt from '../LCHLauncherPrompt/main.svelte';
</script>
<svelte:window on:keydown={ mod.InterfaceWindowDidKeyDown } />

<div class="LCHLauncherPipe LCHLauncher">

<div class="LCHLauncherPipeSubject">
	<LCHLauncherPrompt
		LCHLauncherPromptItems={ [] }
		LCHLauncherPromptPlaceholderText={ OLSKLocalized('LCHLauncherPipeSubjectPromptPlaceholderText') }
		LCHLauncherPromptFilterInputPlaceholderText={ OLSKLocalized('LCHLauncherPipeSubjectPromptFilterInputPlaceholderText') }
		LCHLauncherPromptDispatchSelect={ mod.LCHLauncherPromptDispatchSelect }
		LCHLauncherPromptDispatchEscape={ mod.LCHLauncherPromptDispatchEscape }
		/>
</div>

<div class="LCHLauncherPipeAction">
	<LCHLauncherPrompt
		LCHLauncherPromptItems={ [] }
		LCHLauncherPromptFilterInputPlaceholderText={ OLSKLocalized('LCHLauncherPipeActionPromptFilterInputPlaceholderText') }
		LCHLauncherPromptDispatchSelect={ mod.LCHLauncherPromptDispatchSelect }
		LCHLauncherPromptDispatchEscape={ mod.LCHLauncherPromptDispatchEscape }
		/>
</div>

</div>

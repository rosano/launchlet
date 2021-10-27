<script>
export let OLSKLocalized;
export let LCHLauncherPipeItems;

import { OLSK_SPEC_UI } from 'OLSKSpec';

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

	LCHLaunchxrPromptDispatchSelect (inputData) {
	},

	LCHLaunchxrPromptDispatchEscape () {
	},

};

import LCHLaunchxrPrompt from '../LCHLaunchxrPrompt/main.svelte';
</script>
<svelte:window on:keydown={ mod.InterfaceWindowDidKeyDown } />

<div class="LCHLauncherPipe LCHLauncher">

<div class="LCHLauncherPipeSubject">
	<LCHLaunchxrPrompt
		LCHLaunchxrPromptItems={ [] }
		LCHLaunchxrPromptPlaceholderText={ OLSKLocalized('LCHLauncherPipeSubjectPromptPlaceholderText') }
		LCHLaunchxrPromptFilterInputPlaceholderText={ OLSKLocalized('LCHLauncherPipeSubjectPromptFilterInputPlaceholderText') }
		LCHLaunchxrPromptDispatchSelect={ mod.LCHLaunchxrPromptDispatchSelect }
		LCHLaunchxrPromptDispatchEscape={ mod.LCHLaunchxrPromptDispatchEscape }
		/>
</div>

<div class="LCHLauncherPipeAction">
	<LCHLaunchxrPrompt
		LCHLaunchxrPromptItems={ [] }
		LCHLaunchxrPromptFilterInputPlaceholderText={ OLSKLocalized('LCHLauncherPipeActionPromptFilterInputPlaceholderText') }
		LCHLaunchxrPromptDispatchSelect={ mod.LCHLaunchxrPromptDispatchSelect }
		LCHLaunchxrPromptDispatchEscape={ mod.LCHLaunchxrPromptDispatchEscape }
		/>
</div>

</div>

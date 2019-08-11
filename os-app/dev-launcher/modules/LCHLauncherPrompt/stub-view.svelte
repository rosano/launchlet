<script>
import Module from './main.svelte';
export let StubItems = [];
let StubItemSelected = null;

export let ResultsHidden = false;
</script>

<Module PromptItems={ StubItems } ItemSelected={ StubItemSelected } on:ItemSelectedDidChange={ (event) => StubItemSelected = event.detail } ResultsHidden={ ResultsHidden } />

<hr>

<p>
	<strong>StubItemSelected</strong>
	<button on:click={ () => StubItemSelected = StubItems[1] } id="LCHLauncherZoneInputTestSetStubItemSelected">Set</button>
	<span id="LCHLauncherPromptStubItemSelected">{ (StubItemSelected || {}).LCHRecipeTitle }</span>
</p>

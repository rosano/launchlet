<script>
import Module from './main.svelte';
export let StubItems = [];
let StubItemSelected = null;

export let HeaderText = undefined;
export let FilterText = undefined;
export let MatchStop = false;
export let ResultsHidden = false;
</script>

<Module PromptItems={ StubItems } ItemSelected={ StubItemSelected } on:ItemSelectedDidChange={ (event) => StubItemSelected = event.detail } HeaderText={ HeaderText } FilterText={ FilterText } MatchStop={ MatchStop } ResultsHidden={ ResultsHidden } />

<hr>

<p>
	<strong>StubItemSelected</strong>
	<button on:click={ () => StubItemSelected = StubItems[1] } id="LCHLauncherZoneInputTestSetStubItemSelected">Set</button>
	<span id="LCHLauncherPromptStubItemSelected">{ (StubItemSelected || {}).LCHRecipeTitle }</span>
</p>

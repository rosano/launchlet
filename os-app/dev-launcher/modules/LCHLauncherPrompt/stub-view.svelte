<script>
import Module from './main.svelte';
export let StubItems = [];
let StubItemSelected = null;

export let HeaderText = undefined;
export let FilterText = undefined;
export let MatchStop = false;
</script>

<Module PromptItems={ StubItems } on:ItemSelectedDidChange={ (event) => StubItemSelected = (event.detail || {}).LCHRecipeTitle } HeaderText={ HeaderText } FilterText={ FilterText } MatchStop={ MatchStop } />

<hr>

<p>
	<strong>StubItemSelected</strong>
	<span id="LCHLauncherPromptStubItemSelected">{ StubItemSelected }</span>
</p>

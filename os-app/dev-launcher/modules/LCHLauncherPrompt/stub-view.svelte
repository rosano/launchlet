<script>
import Module from './main.svelte';
export let StubItems = [];
let StubItemSelected = null;
let StubItemSelectedHidden = false;

export let ResultsHidden = false;
</script>

<Module PromptItems={ StubItems } ItemSelected={ StubItemSelected } ItemSelectedHidden={ StubItemSelectedHidden } on:ItemSelectedDidChange={ (event) => StubItemSelected = event.detail } ResultsHidden={ ResultsHidden } />

<hr>

<p>
	<strong>StubItemSelected</strong>
	<button on:click={ () => StubItemSelected = StubItems[1] } id="LCHLauncherPromptTestSetStubItemSelected">Set</button>
	<span id="LCHLauncherPromptStubItemSelected">{ (StubItemSelected || {}).LCHRecipeTitle }</span>
</p>

<p>
	<strong>ItemSelectedHidden</strong>
	<input type="checkbox" on:input={ () => StubItemSelectedHidden = this.checked } id="LCHLauncherPromptTestSetItemSelectedHidden" />
</p>

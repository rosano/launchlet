<script>
import Module from './main.svelte';
export let StubItems = [];
let StubItemSelected = null;
let StubItemSelectedHidden = false;

export let ResultsHidden = false;

let TestResultListDispatchArrow;
function ResultListDispatchArrow(inputData) {
	StubItemSelected = inputData;

	TestResultListDispatchArrow.innerHTML = parseInt(TestResultListDispatchArrow.innerHTML) + 1;
}

let TestResultListDispatchClick;
function ResultListDispatchClick(inputData) {
	StubItemSelected = inputData;

	TestResultListDispatchClick.innerHTML = parseInt(TestResultListDispatchClick.innerHTML) + 1;
}

const mod = {

	// INTERFACE

	InterfaceItemSelectedHiddenCheckboxDidInput (event) {
		StubItemSelectedHidden = this.checked
	},

}
</script>

<Module PromptItems={ StubItems } ItemSelected={ StubItemSelected } ItemSelectedHidden={ StubItemSelectedHidden } on:ResultListDispatchArrow={ (event) => ResultListDispatchArrow(event.detail) } on:ResultListDispatchClick={ (event) => ResultListDispatchClick(event.detail) } ResultsHidden={ ResultsHidden } />

<hr role="presentation" />

<p>
	<strong>StubItemSelected</strong>
	<button on:click={ () => StubItemSelected = StubItems[1] } id="LCHLauncherPromptTestSetStubItemSelected">Set</button>
	<span id="LCHLauncherPromptStubItemSelected">{ (StubItemSelected || {}).LCHRecipeName }</span>
</p>

<p>
	<strong>ItemSelectedHidden</strong>
	<input type="checkbox" on:input={ mod.InterfaceItemSelectedHiddenCheckboxDidInput } id="LCHLauncherPromptTestSetItemSelectedHidden" />
</p>
<p>
	<strong>ResultListDispatchArrow</strong>
	<span id="OLSKResultsListTestResultListDispatchArrow" bind:this={ TestResultListDispatchArrow }>0</span>
</p>

<p>
	<strong>ResultListDispatchClick</strong>
	<span id="OLSKResultsListTestResultListDispatchClick" bind:this={ TestResultListDispatchClick }>0</span>
</p>

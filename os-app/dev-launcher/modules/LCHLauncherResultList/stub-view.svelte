<script>
import Module from './main.svelte';
export let TestItems = [];
export let TestItemSelected = null;

let TestResultListDispatchClick;
function handleResultListDispatchClick(inputData) {
	TestItemSelected = inputData;

	TestResultListDispatchClick.innerHTML = parseInt(TestResultListDispatchClick.innerHTML) + 1;
}
</script>

<Module ListItems={ TestItems } ItemSelected={ TestItemSelected } let:LCHLauncherResultListItem={ item } on:ItemSelectedDidChange={ (event) => TestItemSelected = event.detail } on:ResultListDispatchClick={ (event) => handleResultListDispatchClick(event.detail) }>
	<div>{ item }</div>
	<em slot="LCHLauncherResultListEmpty" class="LCHLauncherResultListEmpty">TestItemsZero</em>
</Module>

<hr>

<p>
	<strong>TestItemSelected</strong>
	<button on:click={ () => TestItemSelected = 'bravo' } id="LCHLauncherResultListTestSetTestItemSelected">Set</button>
	<span id="LCHLauncherResultListTestItemSelected">{ TestItemSelected }</span>
</p>

<p>
	<strong>TestResultListDispatchClick</strong>
	<span id="LCHLauncherResultListTestResultListDispatchClick" bind:this={ TestResultListDispatchClick }>0</span>
</p>

<style>
:global(.LCHLauncherResultListItemSelected) {
	background: #eee;
}
</style>

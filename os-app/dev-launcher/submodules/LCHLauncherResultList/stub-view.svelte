<script>
import Module from './main.svelte';
let TestItems = [];
let TestItemSelected = null;

let TestResultListDispatchArrow;
function ResultListDispatchArrow(inputData) {
	TestItemSelected = inputData;

	TestResultListDispatchArrow.innerHTML = parseInt(TestResultListDispatchArrow.innerHTML) + 1;
}

let TestResultListDispatchClick;
function ResultListDispatchClick(inputData) {
	TestItemSelected = inputData;

	TestResultListDispatchClick.innerHTML = parseInt(TestResultListDispatchClick.innerHTML) + 1;
}
</script>

<Module ListItems={ TestItems } ItemSelected={ TestItemSelected } let:LCHLauncherResultListItem={ item } on:ResultListDispatchArrow={ (event) => ResultListDispatchArrow(event.detail) } on:ResultListDispatchClick={ (event) => ResultListDispatchClick(event.detail) }>
	<div>{ item }</div>
	<em slot="LCHLauncherResultListEmpty" class="TestLCHLauncherResultListEmptySlot">TestItemsZero</em>
</Module>

<hr>

<p>
	<strong>TestItemSelected</strong>
	<button on:click={ () => TestItemSelected = 'bravo' } id="LCHLauncherResultListTestSetTestItemSelected">Set</button>
	<span id="LCHLauncherResultListTestItemSelected">{ TestItemSelected }</span>
</p>

<p>
	<strong>TestResultListDispatchArrow</strong>
	<span id="LCHLauncherResultListTestResultListDispatchArrow" bind:this={ TestResultListDispatchArrow }>0</span>
</p>

<p>
	<strong>TestResultListDispatchClick</strong>
	<span id="LCHLauncherResultListTestResultListDispatchClick" bind:this={ TestResultListDispatchClick }>0</span>
</p>

<p>
	<strong>TestItems</strong>
	<button id="LCHLauncherResultListTestSetTestItemsZero" on:click={ () => TestItems = [] }>Zero</button>
	<button id="LCHLauncherResultListTestSetTestItemsSingle" on:click={ () => TestItems = ['alfa'] }>Single</button>
	<button id="LCHLauncherResultListTestSetTestItemsMultiple" on:click={ () => TestItems = ['alfa','bravo','charlie'] }>Multiple</button>
</p>

<style>
:global(.LCHLauncherResultListItemSelected) {
	background: #eee;
}
</style>

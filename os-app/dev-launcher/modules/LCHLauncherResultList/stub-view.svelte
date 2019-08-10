<script>
import Module from './main.svelte';
export let TestItems = [];
export let TestItemSelected = null;
</script>

<Module ListItems={ TestItems } ItemSelected={ TestItemSelected } let:LCHLauncherResultListItem={ item } on:ItemSelectedDidChange={ (event) => TestItemSelected = event.detail }>
	<div>{ item }</div>
	<em slot="LCHLauncherResultListEmpty" class="LCHLauncherResultListEmpty">TestItemsZero</em>
</Module>

<hr>

<p>
	<strong>TestItemSelected</strong>
	<button on:click={ () => TestItemSelected = 'bravo' } id="LCHLauncherZoneInputTestSetTestItemSelected">Set</button>
	<span id="LCHLauncherZoneInputTestItemSelected">{ TestItemSelected }</span>
</p>

<style>
:global(.LCHLauncherResultListItemSelected) {
	background: #eee;
}
</style>

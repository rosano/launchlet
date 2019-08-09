<script>
import Module from './main.svelte';
export let TestItems = [];

let ItemSelected = null;
</script>

<Module ListItems={ TestItems } let:LCHLauncherResultListItem={ item } on:ItemSelectedDidChange={ (event) => ItemSelected = event.detail }>
	<div>{ item }</div>
	<em slot="LCHLauncherResultListEmpty" class="LCHLauncherResultListEmpty">TestItemsZero</em>
</Module>

<hr>

<p>
	<strong>ItemSelected</strong>
	<span id="LCHLauncherZoneInputTestItemSelected">{ ItemSelected }</span>
</p>

<style>
:global(.LCHLauncherResultListItemSelected) {
	background: #eee;
}
</style>

<script>
import Module from './main.svelte';
export let TestItems = [];
export let TestIndex = 0;
</script>

<Module ListItems={ TestItems } bind:SelectedIndex={ TestIndex } let:LCHLauncherResultListItem={ item }>
	<div>{ item }</div>
	<em slot="LCHLauncherResultListEmpty" class="LCHLauncherResultListEmpty">TestItemsZero</em>
</Module>

<style>
:global(.LCHLauncherResultListItemSelected) {
	background: #eee;
}
</style>

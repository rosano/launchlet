<script>
import Module from './main.svelte';
export let TestItems = []
</script>

<Module ListItems={ TestItems } let:LCHLauncherResultListItem={ item }>
	<div>{ item }</div>
	<em slot="LCHLauncherResultListEmpty" class="LCHLauncherResultListEmpty">TestItemsZero</em>
</Module>

<style>
</style>

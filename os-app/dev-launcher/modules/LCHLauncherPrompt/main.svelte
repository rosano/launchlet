<script>
import LCHLauncherZoneInput from '../LCHLauncherZoneInput/main.svelte';
import LCHLauncherResultList from '../LCHLauncherResultList/main.svelte';
import LCHLauncherPipeItem from '../LCHLauncherPipeItem/main.svelte';

export let PromptItems = [];

let ItemSelected = null;
</script>

<div class="LCHLauncherPrompt">

<LCHLauncherZoneInput>
	{#if ItemSelected}
		<LCHLauncherPipeItem itemTitle={ ItemSelected.LCHRecipeTitle } />
	{/if}
</LCHLauncherZoneInput>
<LCHLauncherResultList ListItems={ PromptItems } let:LCHLauncherResultListItem={ item } on:ItemSelectedDidChange={ (event) => ItemSelected = event.detail }>
	<div>{ item.LCHRecipeTitle }</div>
</LCHLauncherResultList>

</div>

<style>
.LCHLauncherPrompt :global(.LCHLauncherResultListItemSelected) {
	background: #bcdaff;
}
</style>

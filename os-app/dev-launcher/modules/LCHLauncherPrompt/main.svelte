<script>
import LCHLauncherZoneInput from '../LCHLauncherZoneInput/main.svelte';
import LCHLauncherResultList from '../LCHLauncherResultList/main.svelte';
import LCHLauncherPipeItem from '../LCHLauncherPipeItem/main.svelte';

export let PromptItems = [];
export let ResultsHidden = false;
export let ItemSelected = null;

import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
function ItemSelectedDidChange(event) {
	dispatch('ItemSelectedDidChange', ItemSelected = event.detail);
}
</script>

<div class="LCHLauncherPrompt">

<LCHLauncherZoneInput>
{#if ItemSelected}
	<LCHLauncherPipeItem itemTitle={ ItemSelected.LCHRecipeTitle } />
{:else}
	<slot></slot>
{/if}
</LCHLauncherZoneInput>

{#if !ResultsHidden}
	<LCHLauncherResultList ListItems={ PromptItems } let:LCHLauncherResultListItem={ item } ItemSelected={ ItemSelected } on:ItemSelectedDidChange={ ItemSelectedDidChange }>
		<div>{ item.LCHRecipeTitle }</div>
	</LCHLauncherResultList>
{/if}

</div>

<style>
.LCHLauncherPrompt :global(.LCHLauncherResultListItemSelected) {
	background: #bcdaff;
}
</style>

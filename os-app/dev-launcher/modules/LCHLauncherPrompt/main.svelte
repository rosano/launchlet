<script>
import LCHLauncherZoneInput from '../LCHLauncherZoneInput/main.svelte';
import LCHLauncherResultList from '../LCHLauncherResultList/main.svelte';
import LCHLauncherPipeItem from '../LCHLauncherPipeItem/main.svelte';

export let PromptItems = [];
export let HeaderText = undefined;
export let FilterText = undefined;
export let MatchStop = false;
export let ResultsHidden = false;
export let ItemSelected = null;

import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
function ItemSelectedDidChange(event) {
	dispatch('ItemSelectedDidChange', ItemSelected = event.detail);
}
</script>

<div class="LCHLauncherPrompt">

{#if ItemSelected}
	<LCHLauncherZoneInput HeadingText={ HeaderText } FilterText={ FilterText } MatchStop={ MatchStop }>
		<LCHLauncherPipeItem itemTitle={ ItemSelected.LCHRecipeTitle } />
	</LCHLauncherZoneInput>
{:else}
	<LCHLauncherZoneInput HeadingText={ HeaderText } FilterText={ FilterText } MatchStop={ MatchStop } />
{/if}

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

<script>
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

<div class="LCHLauncherZoneInput">
	<div class="LCHLauncherZoneInputBezel">
		{#if ItemSelected}
			<LCHLauncherPipeItem itemTitle={ ItemSelected.LCHRecipeTitle } />
		{:else}
			<slot></slot>
		{/if}
	</div>
</div>

{#if !ResultsHidden}
	<LCHLauncherResultList ListItems={ PromptItems } let:LCHLauncherResultListItem={ item } ItemSelected={ ItemSelected } on:ItemSelectedDidChange={ ItemSelectedDidChange }>
		<LCHLauncherPipeItem itemTitle={ item.LCHRecipeTitle } />
	</LCHLauncherResultList>
{/if}

</div>

<style>
.LCHLauncherZoneInput {
	padding: 3px;
	border: solid 1px hsl(0, 0%, 90%);
	border-radius: 6px;
	
	background: hsl(0, 0%, 95%);

	/* @LCHLauncherZoneInputFlexbox:Parent */
	display: flex;
	justify-content: center;
}

.LCHLauncherZoneInputBezel {
	height: 20px;
	
	padding: 4px;
	border-radius: 4px;

	/* @LCHLauncherZoneInputFlexbox:Child */
	flex-grow: 1;

	/* @LCHLauncherZoneInputBezelFlexbox:Parent */
	display: flex;
	flex-direction: column;
	justify-content: center;
}
</style>

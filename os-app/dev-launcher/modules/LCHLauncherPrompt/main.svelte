<script>
import LCHLauncherResultList from '../LCHLauncherResultList/main.svelte';
import LCHLauncherPipeItem from '../LCHLauncherPipeItem/main.svelte';

export let PromptItems = [];
export let ResultsHidden = false;
export let ItemSelected = null;
export let ItemSelectedHidden = false;

import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
function ResultListDispatchArrow(event) {
	dispatch('ResultListDispatchArrow', ItemSelected = event.detail);
}
function ResultListDispatchClick(event) {
	dispatch('ResultListDispatchClick', ItemSelected = event.detail);
}
</script>

<div class="LCHLauncherPrompt">

<div class="LCHLauncherZoneInput">
	<div class="LCHLauncherZoneInputBezel">
		{#if !ItemSelected || ItemSelectedHidden}
			<slot></slot>
		{:else}
			<LCHLauncherPipeItem itemTitle={ ItemSelected.LCHRecipeTitle } />
		{/if}
	</div>
</div>

{#if !ResultsHidden}
	<LCHLauncherResultList ListItems={ PromptItems } let:LCHLauncherResultListItem={ item } ItemSelected={ ItemSelected } on:ResultListDispatchArrow={ ResultListDispatchArrow } on:ResultListDispatchClick={ ResultListDispatchClick }>
		<LCHLauncherPipeItem itemTitle={ item.LCHRecipeTitle } />
	</LCHLauncherResultList>
{/if}

</div>

<style>

@media screen and (min-width: 760px) {

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

}
</style>

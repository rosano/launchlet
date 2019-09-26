<script>
export let PromptItems = [];
export let ResultsHidden = false;
export let ItemSelected = null;
export let ItemSelectedHidden = false;

import LCHLauncherResultList from '../LCHLauncherResultList/main.svelte';
import LCHLauncherPipeItem from '../LCHLauncherPipeItem/main.svelte';

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
			<LCHLauncherPipeItem PipeItemTitle={ ItemSelected.LCHRecipeName } PipeItemSubtitle={ ItemSelected.LCHRecipeOutputType } PipeItemSource={ ItemSelected._LCHRecipeSource } />
		{/if}
	</div>
</div>

{#if !ResultsHidden}
	<LCHLauncherResultList ListItems={ PromptItems } let:LCHLauncherResultListItem={ item } ItemSelected={ ItemSelected } on:ResultListDispatchArrow={ ResultListDispatchArrow } on:ResultListDispatchClick={ ResultListDispatchClick }>
		<LCHLauncherPipeItem PipeItemTitle={ item.LCHRecipeName } PipeItemSubtitle={ item.LCHRecipeOutputType } PipeItemSource={ item._LCHRecipeSource } />
	</LCHLauncherResultList>
{/if}

</div>

<style src="./ui-style.css"></style>

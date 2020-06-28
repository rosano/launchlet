<script>
export let PromptItems = [];
export let ResultsHidden = false;
export let ItemSelected = null;
export let ItemSelectedHidden = false;

import OLSKResults from 'OLSKResults';
import LCHLauncherPipeItem from '../LCHLauncherPipeItem/main.svelte';

import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

function ResultListDispatchArrow(inputData) {
	dispatch('ResultListDispatchArrow', ItemSelected = inputData);
}

function ResultListDispatchClick(inputData) {
	dispatch('ResultListDispatchClick', ItemSelected = inputData);
}
</script>

<div class="LCHLauncherPrompt">

<div class="LCHLauncherZoneInput">
	<div class="LCHLauncherZoneInputBezel">
		{#if !ItemSelected || ItemSelectedHidden}
			<slot></slot>
		{:else}
			<LCHLauncherPipeItem PipeItemTitle={ ItemSelected.LCHRecipeName } PipeItemSubtitle={ ItemSelected._LCHRecipeOutputTypeName } PipeItemSource={ ItemSelected._LCHRecipeSource } />
		{/if}
	</div>
</div>

{#if !ResultsHidden}
	<OLSKResults
		OLSKResultsListItems={ PromptItems }
		OLSKResultsListItemSelected={ ItemSelected }
		OLSKResultsDispatchClick={ ResultListDispatchClick }
		OLSKResultsDispatchArrow={ ResultListDispatchArrow }
		let:OLSKResultsListItem={ item }
		OLSKResultsEnableLooping={ true }
		>
		<LCHLauncherPipeItem
			PipeItemTitle={ item.LCHRecipeName }
			PipeItemSubtitle={ item._LCHRecipeOutputTypeName }
			PipeItemSource={ item._LCHRecipeSource }
			PipeItemSignature={ item.LCHRecipeSignature }
			/>
	</OLSKResults>
{/if}

</div>

<style src="./ui-style.css"></style>

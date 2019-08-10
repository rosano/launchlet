<script>
import { LCHLauncherResultListConstrainIndex } from './ui-logic.js';

export let ListItems = [];

export let ItemSelected = null;
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
function setItemSelected(inputData) {
	dispatch('ItemSelectedDidChange', inputData);
}

function keydownDidFire(event) {
	const handlerFunctions = {
		ArrowUp () {
			setItemSelected(ListItems[LCHLauncherResultListConstrainIndex(ListItems, ListItems.indexOf(ItemSelected) - 1)]);

			return event.preventDefault();
		},
		ArrowDown () {
			setItemSelected(ListItems[LCHLauncherResultListConstrainIndex(ListItems, ListItems.indexOf(ItemSelected) + 1)]);
			
			return event.preventDefault();
		},
	};

	if (Object.keys(handlerFunctions).indexOf(event.code) !== -1) {
		return handlerFunctions[event.code]();
	}
}
</script>
<svelte:window on:keydown={ keydownDidFire } />

<div class="LCHLauncherResultList">
	{#each ListItems as e,index}
		<div class="LCHLauncherResultListItem" class:LCHLauncherResultListItemSelected={ e === ItemSelected } on:click={ () => setItemSelected(e) }>
			<slot LCHLauncherResultListItem={ e }></slot>
		</div>
	{/each}

	{#if !ListItems.length}
		<slot name="LCHLauncherResultListEmpty"></slot>
	{/if}
</div>

<style>
.LCHLauncherResultListItem {
	cursor: pointer;
}
</style>

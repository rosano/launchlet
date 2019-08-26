<script>
import { LCHLauncherConstrainIndex } from '../../ui-logic.js';

export let ListItems = [];

export let ItemSelected = null;
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

const mod = {

	ResultListDispatchArrow(inputData) {
		dispatch('ResultListDispatchArrow', inputData);
	},
	ResultListDispatchClick(inputData) {
		dispatch('ResultListDispatchClick', inputData);
	},

	// INTERFACE

	interfaceDidKeydown(event) {
		const handlerFunctions = {
			ArrowUp () {
				mod.ResultListDispatchArrow(ListItems[LCHLauncherConstrainIndex(ListItems, ListItems.indexOf(ItemSelected) - 1)]);

				return event.preventDefault();
			},
			ArrowDown () {
				mod.ResultListDispatchArrow(ListItems[LCHLauncherConstrainIndex(ListItems, ListItems.indexOf(ItemSelected) + 1)]);
				
				return event.preventDefault();
			},
		};

		handlerFunctions[event.code] && handlerFunctions[event.code]();
	},

};
</script>
<svelte:window on:keydown={ mod.interfaceDidKeydown } />

{#if ListItems.length}
	<div class="LCHLauncherResultList">
		{#each ListItems as e,index}
			<div class="LCHLauncherResultListItem" class:LCHLauncherResultListItemSelected={ e === ItemSelected } on:click={ () => mod.ResultListDispatchClick(e) }>
				<slot LCHLauncherResultListItem={ e }></slot>
			</div>
		{/each}
	</div>
{:else}
	<slot name="LCHLauncherResultListEmpty"></slot>
{/if}

<style>
.LCHLauncherResultListItem {
	cursor: pointer;
}
</style>

<script>
import { LCHLauncherResultListConstrainIndex } from './ui-logic.js';

export let ListItems = [];

export let SelectedIndex = 0;
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
function setSelectedIndex(inputData) {
	dispatch('ItemSelectedDidChange', ListItems[SelectedIndex = LCHLauncherResultListConstrainIndex(ListItems, inputData)]);
}

function LCHLauncherResultListInit(node, ListItems) {
	return {
		update(ListItems) {
			setTimeout(function () {
				setSelectedIndex(0);
			})
		},
	};
};

function keydownDidFire(event) {
	const handlerFunctions = {
		ArrowUp () {
			setSelectedIndex(SelectedIndex - 1);

			return event.preventDefault();
		},
		ArrowDown () {
			setSelectedIndex(SelectedIndex + 1);
			
			return event.preventDefault();
		},
	};

	if (Object.keys(handlerFunctions).indexOf(event.code) !== -1) {
		return handlerFunctions[event.code]();
	}
}
</script>
<svelte:window on:keydown={ keydownDidFire } />

<div class="LCHLauncherResultList" use:LCHLauncherResultListInit={ ListItems }>
	{#each ListItems as e,index}
		<div class="LCHLauncherResultListItem" class:LCHLauncherResultListItemSelected={ index === SelectedIndex } on:click={ () => setSelectedIndex(index) }>
			<slot LCHLauncherResultListItem={ e }></slot>
		</div>
	{/each}

	{#if !ListItems.length}
		<slot name="LCHLauncherResultListEmpty"></slot>
	{/if}
</div>

<style>
</style>

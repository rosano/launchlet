<script>
import { LCHLauncherResultListConstrainIndex } from './ui-logic.js';
export let SelectedIndex = 0;
export let ListItems = [];

function LCHLauncherResultListInit(node, ListItems) {
	return {
		update(ListItems) {
			setTimeout(function () {
				SelectedIndex = 0;
			})
		},
	};
};

function keydownDidFire(event) {
	const handlerFunctions = {
		ArrowUp () {
			SelectedIndex = LCHLauncherResultListConstrainIndex(ListItems, SelectedIndex - 1);

			return event.preventDefault();
		},
		ArrowDown () {
			SelectedIndex = LCHLauncherResultListConstrainIndex(ListItems, SelectedIndex + 1);
			
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
		<div class="LCHLauncherResultListItem" class:LCHLauncherResultListItemSelected={ index === SelectedIndex }>
			<slot LCHLauncherResultListItem={ e }></slot>
		</div>
	{/each}

	{#if !ListItems.length}
		<slot name="LCHLauncherResultListEmpty"></slot>
	{/if}
</div>

<style>
</style>

<script>
export let SelectedIndex = 0;
export let ListItems = [];
</script>

<div class="LCHLauncherResultList">
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

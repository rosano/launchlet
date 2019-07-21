<script>
export let itemSelected = null;
export let items = [];
</script>

{#if items.length }
<div class="Container">
	{#each items as e}
		<div class="Item" class:ItemSelected={ e === itemSelected }>{ e.name }</div>
	{/each}
</div>
{/if}

<style>
.Container {
	margin-top: 10px;

	font-size: 13.5pt;
}

.Item {
	padding: 5px;
	font-weight: bold;
}

.ItemSelected {
	background: #cccccc;
}
</style>

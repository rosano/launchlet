<script>
export let PipeItemTitle = '';
export let PipeItemSubtitle = '';
export let PipeItemSource = '';
export let PipeItemSignature = '';
</script>

<div class="LCHLauncherPipeItem { PipeItemSignature }">
	<span class="LCHLauncherPipeItemTitle">{ PipeItemTitle }</span>
	
	{#if PipeItemSubtitle}
		<br>
		<span class="LCHLauncherPipeItemSubtitle">{ PipeItemSubtitle }</span>
	{/if}
	
	{#if PipeItemSource}
		<br>
		<span class="LCHLauncherPipeItemSource">{ PipeItemSource }</span>
	{/if}
</div>

<style src="./ui-style.css"></style>

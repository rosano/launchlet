<script>
export let PipeItemTitle = '';
export let PipeItemSubtitle = '';
export let PipeItemSource = '';
</script>

<div class="LCHLauncherPipeItem">
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

<style>
.LCHLauncherPipeItem {
	padding: 4px;
	
	font-size: 8pt;
	color: hsl(0, 0%, 0%);
}

.LCHLauncherPipeItemSubtitle, .LCHLauncherPipeItemSource {	
	font-size: 7.5pt;
	opacity: 0.4;
}

.LCHLauncherPipeItemSource {	
	font-style: italic;
}

@media screen and (max-width: 760px) {

.LCHLauncherPipeItem {
	padding: 10px;

	font-family: 'Helvetica Neue', 'Helvetica', sans-serif;
	font-weight: bold;
	font-size: 13.5pt;
	color: hsl(0, 0%, 0%);
}

}
</style>

<script>
export let PipeItemTitle = '';
export let PipeItemSubtitle = '';
</script>

<div class="LCHLauncherPipeItem">
	<span class="LCHLauncherPipeItemTitle">{ PipeItemTitle }</span>
	
	{#if PipeItemSubtitle}
		<br>
		<span class="LCHLauncherPipeItemSubtitle">{ PipeItemSubtitle }</span>
	{/if}
</div>

<style>
.LCHLauncherPipeItem {
	padding: 4px;
	
	font-size: 8pt;
	color: hsl(0, 0%, 0%);
}

.LCHLauncherPipeItemSubtitle {	
	font-size: 7.5pt;
	opacity: 0.4;
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

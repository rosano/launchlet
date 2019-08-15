<script>
export let itemTitle = '';
</script>

<div class="LCHLauncherPipeItem">{ itemTitle }</div>

<style>
.LCHLauncherPipeItem {
	padding: 4px;
	
	font-size: 8pt;
	color: hsl(0, 0%, 0%);
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

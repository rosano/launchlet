<script>
export let didClick = null;
</script>
	
<div class="LCHLauncherZoneInput" on:click={ () => didClick && didClick() }>
	<div class="LCHLauncherZoneInputBezel">
		<slot></slot>
	</div>
</div>

<style>
.LCHLauncherZoneInput {
	padding: 3px;
	border: solid 1px hsl(0, 0%, 90%);
	border-radius: 6px;

	background: hsl(0, 0%, 95%);
	font-family: 'Lucida Grande', 'Helvetica', sans-serif;
	font-size: 8pt;
	color: hsl(0, 0%, 30%);

	/* @LCHLauncherZoneInputFlexbox:Parent */
	display: flex;
	justify-content: center;
}

.LCHLauncherZoneInputBezel {
	height: 20px;
	
	padding: 4px;
	border-radius: 4px;

	/* @LCHLauncherZoneInputFlexbox:Child */
	flex-grow: 1;

	/* @LCHLauncherZoneInputBezelFlexbox:Parent */
	display: flex;
	flex-direction: column;
	justify-content: center;
}
</style>

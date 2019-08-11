<script>
export let HeadingText = '';
export let FilterText = '';
export let MatchStop = false;
export let didClick = null;
</script>
	
<strong class="LCHLauncherZoneInputHeading" class:LCHLauncherZoneInputHeadingMatchStop={ MatchStop }>{ FilterText && FilterText.toUpperCase() || HeadingText || 'Undefined' }</strong>

<div class="LCHLauncherZoneInput" on:click={ () => didClick && didClick() }>
	<div class="LCHLauncherZoneInputBezel">
		<slot></slot>
	</div>
</div>

<style>
.LCHLauncherZoneInputHeading {
	padding: 3px;

	font-size: 8pt;
	color: hsl(0, 0%, 60%);

	/* ContainerDivSpacingHotfix */
	display: block;
}

.LCHLauncherZoneInputHeadingMatchStop {
	color: #fd6666;
}

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

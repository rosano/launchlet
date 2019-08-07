<script>
export let NameText = '';
export let FilterText = '';
export let isSelected = false;
export let MatchStop = false;
export let didClick = null;
</script>

<strong class="LCHLauncherZoneInputHeading" class:LCHLauncherZoneInputHeadingMatchStop={ MatchStop }>{ FilterText && FilterText.toUpperCase() || NameText || 'Undefined' }</strong>

<div class="LCHLauncherZoneInput" class:LCHLauncherZoneInputSelected={ isSelected } on:click={ () => didClick && didClick() }>


<div class="LCHLauncherZoneInputBezel">

<slot>
<span class="LCHLauncherZoneInputPlaceholder">Type to search</span>
</slot>

</div>

</div>

<style>
.LCHLauncherZoneInputHeading {
	padding: 3px;

	font-size: 8pt;
	color: hsl(0, 0%, 60%);
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
	height: 30px;
	
	padding: 4px;
	border-radius: 4px;

	/* @LCHLauncherZoneInputFlexbox:Child */
	flex-grow: 1;

	/* @LCHLauncherZoneInputBezelFlexbox:Parent */
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.LCHLauncherZoneInputBezel > :global(*) {
	/* @LCHLauncherZoneInputBezelFlexbox:Child */
	flex-grow: 1;
}

.LCHLauncherZoneInputSelected .LCHLauncherZoneInputBezel {
	background: #bcdaff;
}

.LCHLauncherZoneInputPlaceholder {
	display: inline-block;

	/* DisableTextSelection */
	pointer-events: none;
	-moz-user-select: none;
	-khtml-user-select: none;
	-webkit-user-select: none;
	-ms-user-select: none;
	user-select: none;

	/* @LCHLauncherZoneInputBezelFlexbox:Child */
	align-self: center;
	flex-grow: 0;
}
</style>

<script>
import { OLSKLocalized } from '../_shared/common/global.js'
export let memberObjects;
</script>

<div id="__Launchlet">
	<div id="__LaunchletBezel">
		<input id="__LaunchletInput" placeholder="{ OLSKLocalized('LCHBookmarkletInputPlaceholder')}" autofocus>
	</div>
</div>

<style>
#__Launchlet {
	--__LaunchletWidth: 400px;
	--__LaunchletSharedPadding: 10px;

	width: var(--__LaunchletWidth);

	position: fixed;
	top: 0;
	left: 50%;
	margin: 0 0 0 calc(var(--__LaunchletWidth) / -2);
	z-index: 999;

	font-family: 'Helvetica Neue', 'Helvetica', sans-serif;
	font-size: 22px;
}

@keyframes __LaunchletExit {
	from {
		opacity: 1;
	}
	to {
		opacity: 0;
	}
}

.__LaunchletExit {
	animation-name: __LaunchletExit;
	animation-duration: 0.235s;
	opacity: 0;
}

#__LaunchletBezel {
	padding: var(--__LaunchletSharedPadding);
	border: 1px solid #cccccc;
	border-radius: 5px;
	box-shadow: 0 0 10px 0px #e6e6e6;

	background: #e6e6e6;
	font-family: 'Helvetica Neue', 'Helvetica', sans-serif;
	font-weight: bold;

	/* __LaunchletBezelFlexboxParent */
	display: flex;
	flex-direction: column;
}

#__LaunchletInput {
	padding: 6px;
	border: 1px solid #cccccc;
	border-radius: 5px;

	background: #f3f3f3;
	color: #3f3f3f;

	/* browser defaults */
	outline: none;

	/* __LaunchletBezelFlexboxChild */
	/*flex-grow: 1;*/
}

#__LaunchletList {
	margin-top: 10px;

	font-size: 18px;
}

.__LaunchletListItem {
	padding: 5px;
}

.__LaunchletListItemSelected {
	background: #cccccc;
}

.__LaunchletHidden {
	display: none;
}
</style>

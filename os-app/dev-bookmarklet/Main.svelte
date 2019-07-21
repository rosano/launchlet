<script>
import OLSKInternational from 'OLSKInternational';

export let localizationLanguageCode = 'en';

let localizationDictionary = JSON.parse(`{"PLUGIN_ALFA_SEARCH_REPLACE":"PLUGIN_ALFA_SEARCH_REPLACE"}`);

export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedStringWithTranslationKeyAndTranslationDictionary(translationConstant, localizationDictionary[localizationLanguageCode]);
};

import LCHComposeLogic from '../open-pendext/ui-logic.js'
export let memberObjects = [];
export let workflowDidTerminate = function () {};

const api = {
	functionObjects () {
		return memberObjects;
	},
	actionObjects () {
		return api.functionObjects().filter(function (e) {
			return !!e.name;
		});
	},
	fn (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('LCHBookmarkletErrorIdentifierNotString');
		}

		if (inputData === '') {
			throw new Error('LCHBookmarkletErrorIdentifierBlank');
		}

		if (inputData.trim() !== inputData) {
			throw new Error('LCHBookmarkletErrorIdentifierContainsUntrimmedWhitespace');
		}

		let functionObject = api.functionObjects().filter(function (e) {
			return e.id === inputData;
		}).shift();

		if (!functionObject) {
			throw new Error('LCHBookmarkletErrorIdentifierNotDefined');
		}

		return functionObject.fn.bind({
			api: api,
		});
	},
};

let filterText = '';

let memberObjectSelected;
let visibleMemberObjects = [];
let filterTextDidChange = function (val) {
	visibleMemberObjects = !val ? [] : memberObjects.filter(LCHComposeLogic.LCHComposeLogicFilter(val)).sort(LCHComposeLogic.LCHComposeLogicSort)
	memberObjectSelected = visibleMemberObjects[0];
};
$: filterTextDidChange(filterText.trim());

let rootElement;
import { onMount } from 'svelte';
onMount(function () {
	function setElementAtIndex(inputData) {
		memberObjectSelected = visibleMemberObjects[Math.max(0, Math.min(visibleMemberObjects.length, inputData))];
	}

	function launchElement(inputData) {
		if (!inputData || !inputData.fn) {
			return;
		}

		filterText = inputData.name;
		
		api.fn(inputData.id)();
		
		workflowDidTerminate();
	}

	rootElement.addEventListener('keydown', function (event) {
		if (event.code === 'Escape') {
			if (!filterText) {
				workflowDidTerminate();
			}

			if (filterText) {
				filterText = '';
			}

			return event.preventDefault();
		}

		if (event.code === 'ArrowUp') {
			setElementAtIndex(visibleMemberObjects.indexOf(memberObjectSelected) - 1)
			return event.preventDefault();
		};

		if (event.code === 'ArrowDown') {
			setElementAtIndex(visibleMemberObjects.indexOf(memberObjectSelected) + 1)
			return event.preventDefault();
		};

		if (event.code === 'Enter') {
			return launchElement(memberObjectSelected);
		};
	});
});
</script>

<div id="__Launchlet" bind:this={ rootElement }>
	<div id="__LaunchletBezel">
		<input id="__LaunchletInput" placeholder="{ OLSKLocalized('LCHBookmarkletInputPlaceholder')}" autofocus bind:value={ filterText }>
		{#if visibleMemberObjects.length }
			<div id="__LaunchletList">
				{#each visibleMemberObjects as e}
					<div class="__LaunchletListItem" class:__LaunchletListItemSelected={ e === memberObjectSelected }>{ e.name }</div>
				{/each}
			</div>
		{/if}
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

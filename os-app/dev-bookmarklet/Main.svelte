<script>
import ModuleList from './ModuleList.svelte'
import { OLSKLocalized, languageCode } from './_shared.js'
import { LCHBookmarkletLogicFilter } from './ui-logic.js'

export let memberObjects = [];
export let optionsObject = {};

(function StartSetup() {
	languageCode(optionsObject.localizationLanguageCode)

	if (!optionsObject.workflowDidTerminate) {
		optionsObject.workflowDidTerminate = function () {};
	}
})();

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
	visibleMemberObjects = !val ? [] : memberObjects.filter(LCHBookmarkletLogicFilter(val))
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
		
		optionsObject.workflowDidTerminate();
	}

	rootElement.addEventListener('keydown', function (event) {
		if (event.code === 'Escape') {
			if (!filterText) {
				optionsObject.workflowDidTerminate();
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

<div class="Container" bind:this={ rootElement }>
	<div class="Bezel">
		<input placeholder="{ OLSKLocalized('LCHBookmarkletInputPlaceholder') }" autofocus bind:value={ filterText } />
		<ModuleList items={ visibleMemberObjects } itemSelected={ memberObjectSelected } />
	</div>
</div>

<style>
.Container {
	--__LaunchletWidth: 400px;
	--__LaunchletSharedPadding: 10px;

	width: var(--__LaunchletWidth);

	position: fixed;
	top: 0;
	left: 50%;
	margin: 0 0 0 calc(var(--__LaunchletWidth) / -2);
	z-index: 999;

	font-family: 'Helvetica Neue', 'Helvetica', sans-serif;
	font-size: 16pt;
}

.Bezel {
	padding: var(--__LaunchletSharedPadding);
	border: 1px solid #cccccc;
	border-radius: 5px;
	box-shadow: 0 0 10px 0px #e6e6e6;

	background: #e6e6e6;

	/* __LaunchletBezelFlexboxParent */
	display: flex;
	flex-direction: column;
}

input {
	padding: 6px;
	border: 1px solid #cccccc;
	border-radius: 5px;

	background: #f3f3f3;
	color: #3f3f3f;

	/* BrowserDefaultOutline */
	outline: none;
}
</style>

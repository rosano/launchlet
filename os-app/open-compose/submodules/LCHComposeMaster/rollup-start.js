import RollupStart from './main.svelte';

import * as OLSKRemoteStoragePackage from 'OLSKRemoteStorage';
const OLSKRemoteStorage = OLSKRemoteStoragePackage.default || OLSKRemoteStoragePackage;

const LCHComposeMaster = new RollupStart({
	target: document.body,
	props: Object.assign({
		LCHComposeMasterListItems: [],
		LCHComposeMasterFilterText: '',
		LCHComposeMasterDispatchCreate: (function  (inputData) {
			window.TestLCHComposeMasterDispatchCreate.innerHTML = parseInt(window.TestLCHComposeMasterDispatchCreate.innerHTML) + 1;
			window.TestLCHComposeMasterDispatchCreateData.innerHTML = inputData;
		}),
		LCHComposeMasterDispatchClick: (function  (inputData) {
			window.TestLCHComposeMasterDispatchClick.innerHTML = parseInt(window.TestLCHComposeMasterDispatchClick.innerHTML) + 1;
			window.TestLCHComposeMasterDispatchClickData.innerHTML = JSON.stringify(inputData);
		}),
		LCHComposeMasterDispatchArrow: (function  (inputData) {
			window.TestLCHComposeMasterDispatchArrow.innerHTML = parseInt(window.TestLCHComposeMasterDispatchArrow.innerHTML) + 1;
			window.TestLCHComposeMasterDispatchArrowData.innerHTML = JSON.stringify(inputData);
		}),
		LCHComposeMasterDispatchFilter: (function  (inputData) {
			window.TestLCHComposeMasterDispatchFilter.innerHTML = parseInt(window.TestLCHComposeMasterDispatchFilter.innerHTML) + 1;
			window.TestLCHComposeMasterDispatchFilterData.innerHTML = inputData;
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e, index, coll) {
		if (['LCHComposeMasterListItems', 'LCHComposeMasterListItemSelected'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		if (e[0] === 'LCHComposeMasterListItemSelected') {
			e[1] = coll[1][1].filter(function (item) {
				return item.LCHDocumentID === e[1].LCHDocumentID;
			}).shift();
		}

		if (e[0] === 'LCHComposeMasterListItemSelected') {
			e[1] = OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(e[1]);
		}

		if (e[0] === 'LCHComposeMasterListItems') {
			e[1] = e[1].map(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse);
		}

		return e;
	}))),
});

export default LCHComposeMaster;

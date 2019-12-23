import RollupStart from './main.svelte';

const params = Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
	if (['LCHComposeDetailItem'].includes(e[0])) {
		e[1] = JSON.parse(e[1]);
	}

	return e;
}));

const mod = {

	// REACT

	ReactDetailItem (inputData) {
		window.TestLCHComposeDetailItem.innerHTML = JSON.stringify(inputData);
	},

	// SETUP

	SetupEverything() {
		mod.ReactDetailItem(params.LCHComposeDetailItem);
	},

	// LIFECYCLE

	LifecycleModuleDidLoad() {
		mod.SetupEverything();
	},
	
};
	
mod.LifecycleModuleDidLoad();

const LCHComposeDetail = new RollupStart({
	target: document.body,
	props: Object.assign({
		LCHComposeDetailDispatchBack: (function _LCHComposeDetailDispatchBack () {
			window.TestLCHComposeDetailDispatchBack.innerHTML = parseInt(window.TestLCHComposeDetailDispatchBack.innerHTML) + 1;
		}),
		LCHComposeDetailDispatchClone: (function _LCHComposeDetailDispatchClone () {
			window.TestLCHComposeDetailDispatchClone.innerHTML = parseInt(window.TestLCHComposeDetailDispatchClone.innerHTML) + 1;
		}),
		LCHComposeDetailDispatchDiscard: (function _LCHComposeDetailDispatchDiscard (inputData) {
			window.TestLCHComposeDetailDispatchDiscard.innerHTML = parseInt(window.TestLCHComposeDetailDispatchDiscard.innerHTML) + 1;
		}),
		LCHComposeDetailDispatchUpdate: (function _LCHComposeDetailDispatchUpdate () {
			window.TestLCHComposeDetailDispatchUpdate.innerHTML = parseInt(window.TestLCHComposeDetailDispatchUpdate.innerHTML) + 1;

			mod.ReactDetailItem(params.LCHComposeDetailItem);
		}),
	}, params),
});

export default LCHComposeDetail;

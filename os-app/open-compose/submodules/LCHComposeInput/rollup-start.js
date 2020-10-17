import RollupStart from './main.svelte';

const params = Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
	if (['LCHComposeInputItem'].includes(e[0])) {
		e[1] = JSON.parse(e[1]);
	}

	return e;
}));

const mod = {

	// INTERFACE

	InterfaceTestLCHComposeInputFocusButtonDidClick() {
		LCHComposeInput.modPublic.LCHComposeInputFocus();
	},

	InterfaceTestLCHComposeInputPropDataSendButtonDidClick() {
		LCHComposeInput.LCHComposeInputItem = JSON.parse(window.TestLCHComposeInputPropData.value);
	},

};

const LCHComposeInput = new RollupStart({
	target: document.body,
	props: Object.assign({
		LCHComposeInputItem: {},
		LCHComposeInputOptions: {},
		LCHComposeInputDispatchUpdate: (function  (inputData) {
			window.TestLCHComposeInputDispatchUpdate.innerHTML = parseInt(window.TestLCHComposeInputDispatchUpdate.innerHTML) + 1;
		}),
	}, params),
});

window.LCHComposeInputBehaviour = mod;

export default LCHComposeInput;

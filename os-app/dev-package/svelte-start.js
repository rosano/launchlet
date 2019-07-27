import MainApp from '../dev-bookmarklet/svelte-start.js'

const mod = {
	instanceCreate: function (inputData) {
		if (mod.AppInstance) {
			mod.instanceDestroy();
		}

		let sandboxContainer = document.createElement('div');
		sandboxContainer.className = 'ProofSvelteBookmarketSandbox'
		document.body.appendChild(sandboxContainer);
		
		mod.AppInstance = new MainApp({
			target: sandboxContainer,
			props: {
				name: inputData,
			},
		});
	},
	instanceDestroy: function () {
		mod.AppInstance.$destroy();
		
		delete mod.AppInstance;

		[].slice.call(document.querySelectorAll('.ProofSvelteBookmarketSandbox')).forEach((e) => e.remove());
	},
};

export default mod;

import MainApp from '../dev-bookmarklet/_compiled/ui-behaviour.js'

const mod = {
	instanceCreate: function (inputData = []) {
		if (mod.AppInstance) {
			mod.instanceDestroy();
		}

		let sandboxContainer = document.createElement('div');
		sandboxContainer.className = 'ProofSvelteBookmarketSandbox'
		document.body.appendChild(sandboxContainer);
		
		mod.AppInstance = new MainApp({
			target: sandboxContainer,
			props: {
				memberObjects: [].concat(inputData),
				optionsObject: {
					_didFinish () {
						return mod.instanceDestroy();
					},
				}
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

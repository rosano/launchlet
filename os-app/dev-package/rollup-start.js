import MainApp from '../dev-bookmarklet/rollup-start.js'

const mod = {
	instanceCreate: function (inputData = []) {
		if (mod.instanceExists()) {
			mod.instanceDestroy();
		}

		let sandboxContainer = document.createElement('div');
		sandboxContainer.className = 'ProofSvelteBookmarketSandbox'
		document.body.appendChild(sandboxContainer);
		
		mod.AppInstance = new MainApp({
			target: sandboxContainer,
			props: {
				formulaObjects: [].concat(inputData),
				optionsObject: {
					_didFinish () {
						return mod.instanceDestroy();
					},
				}
			},
		});
	},
	instanceExists: function () {
		return !!mod.AppInstance;
	},
	instanceDestroy: function () {
		mod.AppInstance.$destroy();
		
		delete mod.AppInstance;

		[].slice.call(document.querySelectorAll('.ProofSvelteBookmarketSandbox')).forEach((e) => e.remove());
	},
};

export default mod;

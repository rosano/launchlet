import MainApp from '../dev-bookmarklet/rollup-start.js'

const mod = {
	instanceCreate: function (inputData = []) {
		if (mod.instanceExists()) {
			mod.instanceDestroy();
		}

		mod.SandboxContainer = document.createElement('div');
		document.body.appendChild(mod.SandboxContainer);
		
		mod.AppInstance = new MainApp({
			target: mod.SandboxContainer,
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

		mod.SandboxContainer.remove();
		delete mod.SandboxContainer;
	},
};

export default mod;

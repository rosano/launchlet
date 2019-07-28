import MainApp from '../dev-launcher/rollup-start.js'

const mod = {
	instanceCreate: function (param1 = [], param2 = {}) {
		if (mod.instanceExists()) {
			mod.instanceDestroy();
		}

		mod.SandboxContainer = document.createElement('div');
		document.body.appendChild(mod.SandboxContainer);
		
		mod.AppInstance = new MainApp({
			target: mod.SandboxContainer,
			props: {
				formulaObjects: Array.isArray(param1) ? param1 : [],
				optionsObject: Object.assign(param2, {
					_didFinish () {
						return mod.instanceDestroy();
					},
				}),
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

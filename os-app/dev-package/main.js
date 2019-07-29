const mod = {
	_SetMainApp (inputData) {
		mod.MainApp = inputData;
	},
	instanceCreate (param1 = [], param2 = {}) {
		if (mod.instanceExists()) {
			mod.instanceDestroy();
		}

		mod.SandboxContainer = document.createElement('div');
		document.body.appendChild(mod.SandboxContainer);
		
		mod.AppInstance = new mod.MainApp({
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
	instanceExists () {
		return !!mod.AppInstance;
	},
	instanceDestroy () {
		mod.AppInstance.$destroy();
		delete mod.AppInstance;

		mod.SandboxContainer.remove();
		delete mod.SandboxContainer;
	},
};

export default mod;

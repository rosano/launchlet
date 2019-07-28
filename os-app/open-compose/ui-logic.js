export const LCHComposeLogicSort = function (a, b) {
	if (a.LCHMemberModificationDate && b.LCHMemberModificationDate) {
		return b.LCHMemberModificationDate - a.LCHMemberModificationDate;
	}

	return b.LCHMemberCreationDate - a.LCHMemberCreationDate;
};

export const LCHComposeLogicValidCompileTokens = function (inputData) {
	return [
		'LCHCompileToken_AppBehaviour',
		'LCHCompileToken_AppStyle',
		'LCHCompileToken_ClosureObjects',
		'LCHCompileToken_AppLanguageCode',
		];
};

export const LCHComposeLogicBoomarkletTemplate = function () {
	let _protectFromCompiler = console.log;

	window.LCHBookmarklet = {
		uiStyle: function () {
			return `LCHCompileToken_AppStyle`;
		},
		uiBehaviour: function () {
			_protectFromCompiler(`LCHCompileToken_AppBehaviour`);

			return Main;
		},
		instanceCreate: function () {
			if (window.LCHBookmarklet.AppInstance) {
				window.LCHBookmarklet.instanceDestroy();
			}

			let sandboxContainer = document.createElement('div');
			sandboxContainer.className = 'ProofSvelteBookmarketSandbox'
			document.body.appendChild(sandboxContainer);
			
			sandboxContainer.appendChild(document.createElement('style')).innerHTML = window.LCHBookmarklet.uiStyle();
			
			window.LCHBookmarklet.AppInstance = new (window.LCHBookmarklet.uiBehaviour())({
				target: sandboxContainer,
				props: {
					formulaObjects: _protectFromCompiler(`LCHCompileToken_ClosureObjects`),
					optionsObject: {
						languageCode: 'LCHCompileToken_AppLanguageCode',
						_didFinish () {
							return window.LCHBookmarklet.instanceDestroy();
						},
					},
				}
			});
		},
		instanceDestroy: function () {
			window.LCHBookmarklet.AppInstance.$destroy();
			
			delete window.LCHBookmarklet.AppInstance;

			[].slice.call(document.querySelectorAll('.ProofSvelteBookmarketSandbox')).forEach((e) => e.remove());
		},
	};

	window.LCHBookmarklet.instanceCreate();
};

export const LCHComposeLogicBoomarkletStringFor = function (inputData, OLSK_TESTING) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputInvalid');
	}

	if (!OLSK_TESTING && LCHComposeLogicValidCompileTokens().filter(function (e) {
		return typeof inputData[e] === 'undefined';
	}).length) {
		throw new Error('LCHErrorInputInvalid');
	}

	return Object.keys(inputData).reduce(function (coll, item) {
		return coll.replace(item, item === 'LCHCompileToken_ClosureObjects' ? _LCHComposeLogicFormulaObjectsReplacementFor(inputData[item]) : inputData[item]);
	}, LCHComposeLogicBoomarkletTemplate.toString().replace(/_protectFromCompiler\(\u0060(.*)\u0060\)(,)?;?/g, '$1$2'))
			.replace(`(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':5000/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');`, '')
			.replace(`//# sourceMappingURL=ui-behaviour.js.map`, '');
};

export const _LCHClosureObjectFor = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputInvalid');
	}

	if (typeof inputData.LCHMemberBody !== 'string') {
		throw new Error('LCHErrorInputInvalid');
	}

	if (!inputData.LCHMemberBody.length) {
		throw new Error('LCHErrorInputInvalid');
	}

	return Object.assign({
		LCHClosureString: `function (${ inputData.LCHMemberArgs || '' }) { ${ inputData.LCHMemberBody } }`,
	}, inputData.LCHMemberSignature ? {
		LCHClosureSignature: inputData.LCHMemberSignature,
	} : undefined, inputData.LCHMemberName ? {
		LCHClosureName: inputData.LCHMemberName,
	} : undefined);
};

export const LCHClosuresModelErrorsFor = function(inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputInvalid');
	}

	const errors = {};

	if (typeof inputData.LCHClosureString !== 'string') {
		errors.LCHClosureString = [
			'LCHErrorNotString',
		];
	}

	if (inputData.LCHClosureName !== undefined) {
		if (typeof inputData.LCHClosureName !== 'string') {
			errors.LCHClosureName = [
				'LCHErrorNotString',
			];
		}

		if (typeof inputData.LCHClosureName === 'string' && inputData.LCHClosureName.trim() !== inputData.LCHClosureName) {
			errors.LCHClosureName = [
				'LCHErrorNotTrimmed',
			];
		}
	}

	if (inputData.LCHClosureSignature !== undefined) {
		if (typeof inputData.LCHClosureSignature !== 'string') {
			errors.LCHClosureSignature = [
				'LCHErrorNotString',
			];
		}
	}

	return Object.entries(errors).length ? errors : null;
};

export const _LCHComposeLogicRecipeStubFor = function (inputData) {
	if (LCHClosuresModelErrorsFor(inputData)) {
		throw new Error('LCHErrorInputInvalid');
	}

	const outputData = {
		LCHRecipeCallback: '__LCHRecipeCallback__',
	};

	if (inputData.LCHClosureName) {
		outputData.LCHRecipeName = inputData.LCHClosureName;
	}

	if (inputData.LCHClosureSignature) {
		outputData.LCHRecipeSignature = inputData.LCHClosureSignature;
	}

	return JSON.stringify(outputData).replace('"__LCHRecipeCallback__"', inputData.LCHClosureString);
};

export const _LCHComposeLogicFormulaObjectsReplacementFor = function (inputData) {
	if (!Array.isArray(inputData)) {
		throw new Error('LCHErrorInputInvalid');
	}

	return `[${ inputData.map(_LCHComposeLogicRecipeStubFor) }]`;
};

export const LCHComposeLogicBookmarkletBinaryFor = function (inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('LCHErrorInputInvalid');
	}

	return `javascript:(${ encodeURIComponent(inputData) })();`;
};

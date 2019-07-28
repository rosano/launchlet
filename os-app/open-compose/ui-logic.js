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
		'LCHCompileToken_FormulaObjects',
		'LCHCompileToken_AppLanguageCode',
		];
};

export const LCHComposeLogicBoomarkletTemplate = function () {
	let _protectFromCompiler = console.log;

	window.bookmarklet = {
		uiStyle: function () {
			return `LCHCompileToken_AppStyle`;
		},
		uiBehaviour: function () {
			_protectFromCompiler(`LCHCompileToken_AppBehaviour`);

			return Main;
		},
		instanceCreate: function () {
			if (window.bookmarklet.AppInstance) {
				window.bookmarklet.instanceDestroy();
			}

			let sandboxContainer = document.createElement('div');
			sandboxContainer.className = 'ProofSvelteBookmarketSandbox'
			document.body.appendChild(sandboxContainer);
			
			sandboxContainer.appendChild(document.createElement('style')).innerHTML = window.bookmarklet.uiStyle();
			
			window.bookmarklet.AppInstance = new (window.bookmarklet.uiBehaviour())({
				target: sandboxContainer,
				props: {
					formulaObjects: _protectFromCompiler(`LCHCompileToken_FormulaObjects`),
					optionsObject: {
						languageCode: 'LCHCompileToken_AppLanguageCode',
						_didFinish () {
							return window.bookmarklet.instanceDestroy();
						},
					},
				}
			});
		},
		instanceDestroy: function () {
			window.bookmarklet.AppInstance.$destroy();
			
			delete window.bookmarklet.AppInstance;

			[].slice.call(document.querySelectorAll('.ProofSvelteBookmarketSandbox')).forEach((e) => e.remove());
		},
	};

	window.bookmarklet.instanceCreate();
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
		return coll.replace(item, item === 'LCHCompileToken_FormulaObjects' ? _LCHComposeLogicFormulaObjectsReplacementFor(inputData[item]) : inputData[item]);
	}, LCHComposeLogicBoomarkletTemplate.toString().replace(/_protectFromCompiler\(\u0060(.*)\u0060\)(,)?;?/g, '$1$2'))
			.replace(`(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':5000/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');`, '')
			.replace(`//# sourceMappingURL=ui-behaviour.js.map`, '');
};

export const _LCHComposeLogicFormulaObjectsReplacementFor = function (inputData) {
	if (!Array.isArray(inputData)) {
		throw new Error('LCHErrorInputInvalid');
	}

	let tokenHash = {};

	let outputData = JSON.stringify(inputData.map(function (e) {
		return Object.keys(e).reduce(function (coll, key) {
			if (key === 'fnclosure') {
				key = `__LCHMemberObjectClosure_${ e.id }__`;

				tokenHash[key] = e.fnclosure;

				return Object.assign(coll, {
					fn: `__LCHClosureOpen__${ key }__LCHClosureClose__`,
				});
			}

			coll[key] = e[key];

			return coll;
		}, {});
	}));
	
	return Object.keys(tokenHash).reduce(function (coll, e) {
		return coll.replace(e, tokenHash[e]);
	}, outputData).replace(/("__LCHClosureOpen__)|(__LCHClosureClose__")/g, '');
};

export const LCHComposeLogicBookmarkletBinaryFor = function (inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('LCHErrorInputInvalid');
	}

	return `javascript:(${ encodeURIComponent(inputData) })();`;
};

import {
	LCHBuildRecipeArrayString,
	LCHBuildStripLivereload,
	LCHBuildStripSourceMap,
} from '../LCHBuild/main.js'

export const LCHComposeBuildValidBuildTokens = function () {
	return [
		'LCHComposeBuildToken_AppBehaviour',
		'LCHComposeBuildToken_AppStyle',
		'LCHComposeBuildToken_DocumentObjects',
		'LCHComposeBuildToken_AppLanguageCode',
		'LCHComposeBuildToken_LCHLauncherMode',
		'LCHComposeBuildToken_LCHComposeRecipeName',
		'LCHComposeBuildToken_LCHComposeRecipeCallbackOutput',
	];
};

export const _LCHComposeBuildBoomarkletTemplate = function () {
	let _protectFromCompiler = console.log;

	window.LCHBookmarklet = {
		uiStyle: function () {
			return _protectFromCompiler(`LCHComposeBuildToken_AppStyle`);
		},
		uiBehaviour: function () {
			_protectFromCompiler(`LCHComposeBuildToken_AppBehaviour`);

			return this.Main;
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
					LRTOptions: {
						LRTOptionRecipes: _protectFromCompiler(`LCHComposeBuildToken_DocumentObjects`).concat({
							LCHRecipeName: 'LCHComposeBuildToken_LCHComposeRecipeName',
							LCHRecipeCallback () {
								return 'LCHComposeBuildToken_LCHComposeRecipeCallbackOutput';
							},
							LCHRecipeOutputType: 'URL',
						}),
						LRTOptionCompletionHandler () {
							return window.LCHBookmarklet.instanceDestroy();
						},
						LRTOptionLanguage: 'LCHComposeBuildToken_AppLanguageCode',
						LRTOptionMode: 'LCHComposeBuildToken_LCHLauncherMode',
						LRTOptionIncludePageRecipes: true,
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

export const LCHComposeBuildBoomarkletTemplate = function () {
	return `(${ _LCHComposeBuildBoomarkletTemplate.toString() })()`;
};

export const LCHComposeBuildBoomarkletStringFor = function (inputData, OLSK_TESTING) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('LCHErrorInputNotValid');
	}

	if (!OLSK_TESTING && LCHComposeBuildValidBuildTokens().filter(function (e) {
		return typeof inputData[e] === 'undefined';
	}).length) {
		throw new Error('LCHErrorInputNotValid');
	}

	return [Object.keys(inputData).reduce(function (coll, item) {
		let itemReplacement = inputData[item];

		if (item === 'LCHComposeBuildToken_DocumentObjects') {
			itemReplacement = LCHBuildRecipeArrayString(inputData[item]);
		}

		if (item === 'LCHComposeBuildToken_AppStyle') {
			itemReplacement = `\`${ inputData[item] }\``;
		}

		return coll.replace(item,  itemReplacement);
	}, LCHComposeBuildBoomarkletTemplate().replace(/_protectFromCompiler\(\u0060(.*)\u0060\)(,)?;?/g, '$1$2'))].map(LCHBuildStripLivereload).map(LCHBuildStripSourceMap).pop();
};

export const LCHComposeBuildBookmarkletBinaryFor = function (inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('LCHErrorInputNotValid');
	}

	return `javascript:${ encodeURIComponent(inputData) }`;
};

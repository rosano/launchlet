<script>
import { OLSKLocalized } from 'OLSKInternational';
import OLSKThrottle from 'OLSKThrottle';
import LCH_Data from '../_shared/LCH_Data/main.js';
import LCHDocumentStorage from '../_shared/LCHDocument/storage.js';
import LCHSettingStorage from '../_shared/LCHSetting/storage.js';
import { OLSK_SPEC_UI } from 'OLSKSpec';
import OLSKRemoteStorage from 'OLSKRemoteStorage'
import OLSKServiceWorker from 'OLSKServiceWorker'
import LCHDocumentAction from '../_shared/LCHDocument/action.js';
import LCHSettingAction from '../_shared/LCHSetting/action.js';
import LCHComposeLogic from './ui-logic.js';
import LCHFlagsLogic from '../_shared/LCHFlags/main.js'
import LCHFormula from '../_shared/LCHFormula/main.js'
import LCHLauncherLogic from '../dev-launcher/ui-logic.js';
import LCHBuild from '../_shared/LCHBuild/main.js';
import OLSKString from 'OLSKString';
import RemoteStorage from 'remotestoragejs';
import OLSKLanguageSwitcher from 'OLSKLanguageSwitcher';
import OLSKFund from 'OLSKFund';
import OLSKPact from 'OLSKPact';
import OLSKChain from 'OLSKChain';
import OLSKBeacon from 'OLSKBeacon';

const mod = {

	// VALUE

	_ValueIsLoading: true,

	_ValueDocumentsAll: [],

	ValueDocumentsAll (inputData, shouldSort = true) {
		mod.ValueDocumentsVisible(mod._ValueDocumentsAll = inputData, shouldSort);

		mod.ReactDocumentRemainder();
	},

	_ValueDocumentsVisible: [],

	ValueDocumentsVisible (inputData, shouldSort = true) {
		const items = !mod._ValueFilterText ? inputData : inputData.filter(LCHComposeLogic.LCHComposeFilterFunction(mod._ValueFilterText));
		mod._ValueDocumentsVisible = shouldSort ? items.sort(LCHComposeLogic.LCHComposeSort) : items;
	},
	
	_ValueDocumentSelected: undefined,

	ValueDocumentSelected (inputData) {
		mod._ValueDocumentSelected = inputData;

		if (!inputData) {
			mod.OLSKMobileViewInactive = false;	
		}
	},
	
	_ValueFilterText: '',

	_JavascriptComposition: '', 
	_JavascriptCompositionBinary: '',
	_ValueRecipesArrayString: '',
	
	_ValueStorageToolbarHidden: true,

	_ValueFooterStorageStatus: '',

	_ValuePersistThrottleMap: {},

	_ValuePipeModeEnabled: false,

	_ValueToolsPairIsVisible: undefined,

	LCHComposeDetailInstance: undefined,

	OLSKMobileViewInactive: false,

	_ValuePublicKey: null,
	ValuePublicKeySet (inputData) {
		mod._ValuePublicKey = inputData;

		mod._ValueToolsPairIsVisible = !!inputData;
	},

	_ValuePairStatus: 'kStatusWaiting',
	_ValueToolsPairStatusFailedError: '',

	_IsRunningDemo: false,

	_ValueOLSKFundProgress: false,

		_ValueDocumentRemainder: '',

	// DATA

	DataIsMobile () {
		return window.innerWidth <= 760;
	},

	DataPackageStyle () {
		return [window.LCHComposeBuildPackageStyle.textContent].map(LCHBuild.LCHBuildStripSourceMap).pop();
	},

	DataPackageScript () {
		return [window.LCHComposeBuildPackageScript.textContent].map(LCHBuild.LCHBuildStripLivereload).map(LCHBuild.LCHBuildStripSourceMap).pop();
	},

	DataPackageOptions () {
		return {
			LCHOptionLanguage: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
			LCHOptionMode: mod._ValuePipeModeEnabled ? LCHLauncherLogic.LCHLauncherModePipe() : LCHLauncherLogic.LCHLauncherModeCommit(),
			LCHOptionIncludePageRecipes: mod._ValuePageRecipesEnabled,
		};
	},

	_LCH_DISABLE_ENCRYPTION () {
		return false;
	},

	DataDocumentObjectTemplate (inputData = '') {
		return {
			LCHDocumentName: inputData,
			LCHDocumentInputTypes: '',
			LCHDocumentCallbackArgs: '',
			LCHDocumentCallbackBody: '',
			LCHDocumentOutputType: '',
			LCHDocumentCanonicalExampleCallbackBody: '',
			LCHDocumentSignature: '',
			LCHDocumentURLFilter: '',
			LCHDocumentStyle: '',
		}
	},

	DataNavigator () {
		return navigator.serviceWorker ? navigator : {
			serviceWorker: {},
		};
	},

	DataIsEligible (inputData = {}) {
		return OLSKFund.OLSKFundIsEligible(Object.assign({
			ParamMinimumTier: 1,
			ParamCurrentProject: 'RP_001',
			ParamBundleProjects: ['FakeBundleProject'],
			ParamGrantTier: OLSKFund.OLSKFundTier('OLSK_FUND_PRICING_STRING_SWAP_TOKEN', mod._ValueOLSKFundGrant),
			ParamGrantProject: mod._ValueOLSKFundGrant ? mod._ValueOLSKFundGrant.OLSKPactGrantProject : '',
		}, inputData));
	},

	// INTERFACE

	InterfaceWindowDidKeydown (event) {
		if (document.querySelector('.LCHLauncher')) {
			return;
		}

		const handlerFunctions = {
			Escape () {
				mod.ControlFilter('');

				if (!OLSK_SPEC_UI()) {
					document.querySelector('.OLSKMasterListBody').scrollTo(0, 0);
				}
			},
			Tab () {
				if (document.activeElement === document.querySelector('.OLSKMasterListFilterField') && mod._ValueDocumentSelected) {
					mod.ControlFocusDetail();

					return event.preventDefault();
				}

				if (document.activeElement === document.querySelector('.LCHComposeDetailFormNameField') && event.shiftKey) {
					document.querySelector('.OLSKMasterListFilterField').focus();

					return event.preventDefault();
				}
			},
		};

		handlerFunctions[event.key] && handlerFunctions[event.key]();
	},

	InterfaceToolsPairButtonDidClick() {
		mod._ValueToolsPairIsVisible = !mod._ValueToolsPairIsVisible;
	},

	// CONTROL

	ControlFocusDetail () {
		setTimeout(function () {
			document.querySelector('.LCHComposeDetailFormNameField').focus();
		});
	},

	ControlDocumentPersist(inputData) {
		OLSKThrottle.OLSKThrottleMappedTimeout(mod._ValuePersistThrottleMap, inputData.LCHDocumentID, {
			OLSKThrottleDuration: 500,
			async OLSKThrottleCallback () {
				mod._ControlDocumentFlag(inputData);

				if (inputData.LCHDocumentCallbackBody === 'LCH_TEST_FLAG_ON_BUILD') {
					Object.assign(inputData, {
						LCHDocumentCallbackBody: 'eval("console.log(\'hello\')")',
					});
				}
				
				await mod._ControlDocumentSave(inputData);

				mod.ReactDocuments(mod._ValueDocumentsAll);
			},
		});

		if (OLSK_SPEC_UI()) {
			OLSKThrottle.OLSKThrottleSkip(mod._ValuePersistThrottleMap[inputData.LCHDocumentID]);
		}
	},

	async _ControlDocumentSave(inputData) {
		await LCHDocumentAction.LCHDocumentActionUpdate(mod._ValueOLSKRemoteStorage, inputData);
	},

	_ControlDocumentFlag(inputData) {
		Object.assign(inputData, {
			LCHDocumentSyntaxErrorMessage: '',
		});

		try	{
			inputData.LCHDocumentIsFlagged = !!LCHFlagsLogic.LCHFlags(LCHFormula.LCHFormulaToEvaluate(LCHFormula.LCHFormulaFrom(inputData)));
		} catch (e) {
			if (!e.name.match('SyntaxError')) {
				throw e
			}

			inputData.LCHDocumentIsFlagged = true;
			inputData.LCHDocumentSyntaxErrorMessage = e.message;

			// Object.assign(inputData, {
			// 	LCHDocumentIsFlagged: true,
			// 	LCHDocumentSyntaxErrorMessage: e.message,
			// });
		}

		// if (inputData === mod._ValueDocumentSelected) {
		// 	// causes reload of codemirror
		// 	// inputData.LCHDocumentIsFlagged = inputData.LCHDocumentIsFlagged;
		// };

		if (inputData === mod._ValueDocumentSelected) {
			mod._ValueDocumentSelected = mod._ValueDocumentSelected; // #purge-svelte-force-update
		}

		return inputData;
	},

	ControlFundGate () {
		if (!window.confirm(OLSKLocalized('OLSKFundGateText'))) {
			return;
		}

		mod.OLSKAppToolbarDispatchFund();
	},
	
	async ControlDocumentCreate(inputData) {
		if (mod._ValueDocumentRemainder < 1 && !mod.DataIsEligible()) {
			return mod.ControlFundGate();
		}

		const item = await LCHDocumentAction.LCHDocumentActionCreate(mod._ValueOLSKRemoteStorage, inputData || mod.DataDocumentObjectTemplate());

		mod.ValueDocumentsAll(mod._ValueDocumentsAll.concat(item));

		mod.ControlDocumentSelect(item);

		if (mod.DataIsMobile()) {
			mod.ControlFocusDetail();
		}
	},
	
	ControlDocumentSelect(inputData) {
		mod.ValueDocumentSelected(inputData);

		if (!inputData) {
			return !mod.DataIsMobile() && document.querySelector('.OLSKMasterListFilterField').focus();
		}

		mod.OLSKMobileViewInactive = true;

		if (mod.DataIsMobile()) {
			return;
		}
		
		setTimeout(mod.ControlFocusDetail)
	},
	
	async ControlDocumentClone (inputData) {
		mod.ControlDocumentCreate(Object.assign(Object.assign({}, inputData), {
			LCHDocumentID: undefined,
		}));
	},
	
	async ControlDocumentDiscard (inputData) {
		mod.ValueDocumentsAll(mod._ValueDocumentsAll.filter(function (e) {
			return e !== inputData;
		}), false);

		await LCHDocumentAction.LCHDocumentActionDelete(mod._ValueOLSKRemoteStorage, inputData.LCHDocumentID);

		mod.ControlDocumentSelect(null);
	},
	
	ControlFilter(inputData) {
		mod._ValueFilterText = inputData;

		mod.ValueDocumentsVisible(mod._ValueDocumentsAll);

		if (!inputData) {
			return mod.ControlDocumentSelect(null);
		}

		if (!mod._ValueDocumentsVisible.length) {
			return mod.ControlDocumentSelect(null);
		}

		mod.ValueDocumentSelected(mod._ValueDocumentsVisible.filter(function (e) {
			return e.LCHDocumentName.toLowerCase() === inputData.toLowerCase();
		}).concat(mod._ValueDocumentsVisible.filter(function (e) {
			return e.LCHDocumentName.toLowerCase().includes(inputData.toLowerCase());
		})).shift());
	},

	ControlRun() {
		setTimeout(new Function(mod._JavascriptComposition));
		setTimeout(function () {
			document.querySelector('.LCHLauncher').parentElement.classList.add('LCHComposeLauncher');
		});
	},

	async ControlExportData () {
		let zip = new JSZip();

		const fileName = [
			'com.launchlet.export',
			(new Date()).toJSON(),
		].join(' ');

		zip.file(`${ fileName }.json`, JSON.stringify({
			LCHDocumentObjects: mod._ValueDocumentsAll,
			LCHSettingObjects: await LCHSettingAction.LCHSettingsActionQuery(mod._ValueOLSKRemoteStorage, {}),
		}));
		
		zip.generateAsync({type: 'blob'}).then(function (content) {
			saveAs(content, `${ fileName }.zip`);
		});	
	},

	async ControlImportData (inputData) {
		let outputData;
		try {
			outputData = JSON.parse(inputData);
		} catch (e)  {
			console.log(e);
		}

		if (typeof outputData !== 'object' || outputData === null) {
			return;
		}

		if (!Array.isArray(outputData.LCHDocumentObjects)) {
			return;
		}

		if (!Array.isArray(outputData.LCHSettingObjects)) {
			return;
		}

		await Promise.all(outputData.LCHSettingObjects.map(function (e) {
LCHSettingStorage.LCHSettingStorageWrite(mod._ValueOLSKRemoteStorage, e);
		}));

		await Promise.all(outputData.LCHDocumentObjects.map(function (e) {
			return LCHDocumentStorage.LCHDocumentStorageWrite(mod._ValueOLSKRemoteStorage, OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(e));
		}));

		mod.ValueDocumentsAll(await LCHDocumentAction.LCHDocumentActionList(mod._ValueOLSKRemoteStorage));
	},

	ControlPipeModeEnabledPersist (inputData) {
		mod.ReactDocuments(mod._ValueDocumentsAll);

		LCHSettingAction.LCHSettingsActionProperty(mod._ValueOLSKRemoteStorage, 'kLCHComposePreferenceModePipeEnabled', inputData.toString())
	},

	ControlPageRecipesEnabledPersist (inputData) {
		mod.ReactDocuments(mod._ValueDocumentsAll);

		LCHSettingAction.LCHSettingsActionProperty(mod._ValueOLSKRemoteStorage, 'kLCHComposePreferenceIncludePageRecipes', inputData.toString())
	},

	ControlPublicKeyValidate (inputData) {
		if (!LCHComposeLogic.LCHComposePublicKeyIsValid(inputData)) {
			return window.alert(OLSKLocalized('LCHComposePublicKeyNotValidAlertText'));
		}

		mod.ControlPublicKeyUpdate(inputData);
	},

	ControlPublicKeyUpdate (inputData) {
		window.localStorage.setItem('kLCHComposePreferencePublicKey', inputData);
		
		mod.ValuePublicKeySet(JSON.parse(inputData || 'null'));

		if (!inputData) {
			return;
		}

		mod.ControlPairPayloadSend();
	},

	async ControlPairPayloadSend() {
		const item = {
			LBXPayloadPackageScript: mod.DataPackageScript(),
			LBXPayloadPackageStyle: mod.DataPackageStyle(),
			LBXPayloadPackageOptions: mod.DataPackageOptions(),
			LBXPayloadRecipes: mod._ValueRecipesArrayString,
			LBXPayloadConfirmation: Math.random().toString(),
		};

		mod._ControlPairPayloadPost(OLSK_SPEC_UI() ? 'LBX_TESTING_REQUEST_DATA' : await mod._ControlPairPayloadEncrypt(JSON.stringify(item), mod._ValuePublicKey));

		mod._ValuePairPayloadHash = item.LBXPayloadConfirmation;
	},

	async _ControlPairPayloadEncrypt (param1, param2) {
		if (mod._LCH_DISABLE_ENCRYPTION()) {
			return Promise.resolve(param1);
		};

		return new Promise(function (resolve, reject) {;
			return simpleCrypto.asym.importEncryptPublicKey(param2, reject, function (inputData) {
				return simpleCrypto.asym.encrypt(inputData, (new TextEncoder()).encode(param1), reject, function (inputData) {
					return resolve((function SerializeCipher(inputData) {
						// javascript - Converting array buffer to string - Maximum call stack size exceeded - Stack Overflow https://stackoverflow.com/a/20604561
						function ab2str(buffer) {
							var bufView = new Uint16Array(buffer);
							var length = bufView.length;
							var result = '';
							var addition = Math.pow(2,16)-1;

							for (var i = 0; i<length; i+=addition) {

							    if(i + addition > length){
							        addition = length - i;
							    }
							    result += String.fromCharCode.apply(null, bufView.subarray(i,i+addition));
							}

							return result;
						};

						return JSON.stringify(Object.keys(inputData).reduce(function (coll, item) {
							coll[item] = ab2str(inputData[item]);

							return coll;
						}, {}));
					})(inputData));
				});
			})
		})
	},

	_ControlPairPayloadPost (inputData) {
		window.postMessage({
			LBXRequestName: 'DispatchRequestStorePayload',
			LBXRequestEncryptedData: inputData,
		}, window.location.href);
	},

	ControlPairResponseReceive (inputData) {
		if (!LCHComposeLogic.LBXResponseIsValid(inputData)) {
			return;
		}

		mod._ValuePairStatus = inputData.LBXResponseHash === (OLSK_SPEC_UI() ? 'LBX_TESTING_RESPONSE_HASH' : mod._ValuePairPayloadHash) ? 'kStatusSuccess' : 'kStatusFailed';

		if (mod._ValuePairStatus === 'kStatusFailed') {
			mod._ValueToolsPairStatusFailedError = inputData.LBXResponseError
		}
	},

	async ControlDemo () {
		mod._IsRunningDemo = true;
		window.OLSK_DEMO = true;

		await Promise.all([
			'Open tweet in Thread Reader',
			'Toggle mobile app capable',
			'Go to parent directory',
			'Clear service workers',
			'Cite URL',
			'BugMeNot',
			'Wayback Machine',
			'Domain on twitter',
			'YouTube',
			'GitHub',
			'Pocket URL',
			].reverse().map(function (e) {
			return mod.ControlDocumentCreate(mod.DataDocumentObjectTemplate(e));
		}));

		await mod.LCHComposeDetailDispatchBack();

		return OLSKChain.OLSKChainGather(Object.assign({
			Wait: OLSKBeacon.OLSKBeaconWait,
			Point: (function (inputData) {
				return OLSKBeacon._OLSKBeaconAnimate(OLSKBeacon.OLSKBeaconPointFunction('.OLSKPointer', inputData));
			}),
			Click: (function (inputData) {
				return OLSKBeacon._OLSKBeaconAnimate(OLSKBeacon.OLSKBeaconClickFunction(inputData, '.OLSKPointer', 'OLSKPointerActive'));
			}),
			Defer: (function (inputData) {
				return OLSKBeacon.OLSKBeaconDeferFunction(inputData);
			}),
			Focus: (function (inputData) {
				return new Promise(function (resolve) {
					resolve(document.querySelector(inputData).focus());
				});
			}),
			Fill: (function (param1, param2, param3) {
				return OLSKBeacon._OLSKBeaconAnimate(OLSKBeacon.OLSKBeaconFillFunction(param1, param2), param3);
			}),
			FillCode: (function (param1, param2, param3) {
				return OLSKBeacon._OLSKBeaconAnimate(function (pct) {
					window.OLSKDemoEditor.setValue(param2.slice(0, param2.length * pct));
				}, param3);
			}),
			Set: (function (param1, param2) {
				return OLSKBeacon._OLSKBeaconAnimate(OLSKBeacon.OLSKBeaconSetFunction(param1, param2));
			}),
			Nudge: (function () {
				return OLSKBeacon._OLSKBeaconAnimate(OLSKBeacon.OLSKBeaconNudgeFunction('.OLSKPointer', ...arguments));
			}),
		}, mod))
			.Point('.LCHComposeMasterCreateButton')
			.Nudge(0, 50)
			.Wait()
			.Point('.LCHComposeMasterCreateButton')
			.Click('.LCHComposeMasterCreateButton')
			.Point('.LCHComposeDetailFormNameField')
			.Focus('.LCHComposeDetailFormNameField')
			.Fill('.LCHComposeDetailFormNameField', 'Say Hello')
			.Point('.LCHComposeDetailFormCallbackBody .CodeMirror')
			.Focus('.LCHComposeDetailFormCallbackBody .CodeMirror')
			.FillCode('.LCHComposeDetailFormCallbackBody .CodeMirror', `alert('Hello')`)
			.Point('.LCHComposeBuildRunLink')
			.Click('.LCHComposeBuildRunLink')
			.Point('.LCHLauncherFilterInput')
			// .Click('.LCHLauncherFilterInput')
			.Wait(2200)
			// .Wait()
			// .Fill('.LCHLauncherFilterInput', 'sh')
			.Wait(2000)
			.Point('.LCHLauncherPipeItem')
			.Wait()
			.Click('.LCHLauncherPipeItem')
			.Wait()
			.Nudge(0, -200)
			.OLSKChainExecute();
	},

	// MESSAGE

	LCHComposeBuildDispatchRun () {
		mod.ControlRun();
	},

	LCHComposeBuildDispatchPipeModeEnabled (inputData) {
		mod.ControlPipeModeEnabledPersist(mod._ValuePipeModeEnabled = inputData); // #purge-svelte-update
	},

	LCHComposeBuildDispatchPageRecipesEnabled (inputData) {
		mod.ControlPageRecipesEnabledPersist(mod._ValuePageRecipesEnabled = inputData); // #purge-svelte-update
	},

	LCHComposePairDispatchSubmit (inputData) {
		mod.ControlPublicKeyValidate(inputData);
	},

	LCHComposePairDispatchClear () {
		mod.ControlPublicKeyUpdate('');
	},

	OLSKAppToolbarDispatchApropos () {
		mod._OLSKModalView.modPublic.OLSKModalViewShow();
	},

	OLSKAppToolbarDispatchTongue () {
		if (window.Launchlet.LCHSingletonExists()) {
			return window.Launchlet.LCHSingletonDestroy();
		}

		// #hotfix launchlet show all items
		let selected;

		window.Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: OLSKLanguageSwitcher.OLSKLanguageSwitcherRecipes({
				ParamLanguageCodes: window.OLSKPublicConstants('OLSKSharedPageLanguagesAvailable'),
				ParamCurrentLanguage: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
				ParamSpecUI: OLSK_SPEC_UI(),
				ParamWindow: window,
				OLSKLocalized,
				ParamRouteConstant: window.OLSKPublicConstants('OLSKSharedActiveRouteConstant'),
				OLSKFormatted: OLSKString.OLSKStringFormatted,
				OLSKCanonical: window.OLSKCanonical,
			}).map(function (e) {
				const item = e.LCHRecipeCallback;

				return Object.assign(e, {
					LCHRecipeCallback () {
						selected = item;
					},
				})
			}),
			LCHOptionCompletionHandler () {
			  selected && selected();
			},
			LCHOptionMode: Launchlet.LCHModePreview,
		});
	},

	OLSKAppToolbarDispatchFund () {
		if (!mod._ValueOLSKRemoteStorage.connected) {
			return mod._OLSKAppToolbarDispatchFundNotConnected();
		}

		mod._ValueFundURL = OLSKFund.OLSKFundURL({
			ParamFormURL: 'OLSK_FUND_FORM_URL_SWAP_TOKEN',
			ParamProject: 'RP_001',
			ParamIdentity: mod._ValueOLSKRemoteStorage.remote.userAddress,
			ParamHomeURL: window.location.origin + window.location.pathname,
		});

		mod._OLSKWebView.modPublic.OLSKModalViewShow();

		OLSKFund.OLSKFundListen({
			ParamWindow: window,
			OLSKFundDispatchReceive: mod.OLSKFundDispatchReceive,
		});
	},

	_OLSKAppToolbarDispatchFundNotConnected () {
		if (!window.confirm(OLSKLocalized('OLSKRemoteStorageConnectConfirmText'))) {
			return;
		}

		mod._ValueStorageToolbarHidden = false;
	},

	OLSKAppToolbarDispatchStorage () {
		mod._ValueStorageToolbarHidden = !mod._ValueStorageToolbarHidden;
	},

	OLSKAppToolbarDispatchLauncher () {
		if (window.Launchlet.LCHSingletonExists()) {
			return window.Launchlet.LCHSingletonDestroy();
		}

		const items = [];

		if (mod._ValueDocumentSelected) {
			items.push({
				LCHRecipeSignature: 'LCHComposeLauncherItemClone',
				LCHRecipeName: OLSKLocalized('LCHComposeLauncherItemCloneText'),
				LCHRecipeCallback () {
					mod.ControlDocumentClone(mod._ValueDocumentSelected);
				},
			});
		}

		if (OLSK_SPEC_UI()) {
			items.push(...[
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateCreateDocument',
					LCHRecipeCallback: async function FakeOLSKChangeDelegateCreateDocument () {
						return mod.OLSKChangeDelegateCreateDocument(await LCHDocumentAction.LCHDocumentActionCreate(mod._ValueOLSKRemoteStorage, mod.DataDocumentObjectTemplate('FakeOLSKChangeDelegateCreateDocument')));
					},
				},
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateUpdateDocument',
					LCHRecipeCallback: async function FakeOLSKChangeDelegateUpdateDocument () {
						return mod.OLSKChangeDelegateUpdateDocument(await LCHDocumentAction.LCHDocumentActionUpdate(mod._ValueOLSKRemoteStorage, Object.assign(mod._ValueDocumentsAll.filter(function (e) {
							return e.LCHDocumentName.match('FakeOLSKChangeDelegate');
						}).pop(), {
							LCHDocumentName: 'FakeOLSKChangeDelegateUpdateDocument',
						})));
					},
				},
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateDeleteDocument',
					LCHRecipeCallback: async function FakeOLSKChangeDelegateDeleteDocument () {
						const item = mod._ValueDocumentsAll.filter(function (e) {
							return e.LCHDocumentName.match('FakeOLSKChangeDelegate');
						}).pop();
						
						await LCHDocumentAction.LCHDocumentActionDelete(mod._ValueOLSKRemoteStorage, item.LCHDocumentID);
						
						return mod.OLSKChangeDelegateDeleteDocument(item);
					},
				},
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateConflictDocument',
					LCHRecipeCallback: async function FakeOLSKChangeDelegateConflictDocument () {
						const item = mod._ValueDocumentsAll.filter(function (e) {
							return e.LCHDocumentName.match('FakeOLSKChangeDelegateConflictDocument');
						}).pop();
						
						return mod.OLSKChangeDelegateConflictDocument({
							origin: 'conflict',
							oldValue: await LCHDocumentAction.LCHDocumentActionUpdate(mod._ValueOLSKRemoteStorage, Object.assign({}, item, {
								LCHDocumentName: item.LCHDocumentName + '-local',
							})),
							newValue: Object.assign({}, item, {
								LCHDocumentName: item.LCHDocumentName + '-remote',
							}),
						});
					},
				},
				{
					LCHRecipeName: 'FakeEscapeWithoutSort',
					LCHRecipeCallback: function FakeEscapeWithoutSort () {
						mod.ControlDocumentSelect(null);
					},
				},
				{
					LCHRecipeName: 'FakeFundDocumentLimit',
					LCHRecipeCallback: async function FakeFundDocumentLimit () {
						await Promise.all(Array.from(Array(mod._ValueDocumentRemainder)).map(function (e) {
							return LCHDocumentAction.LCHDocumentActionCreate(mod._ValueOLSKRemoteStorage, mod.DataDocumentObjectTemplate());
						}));

						return mod.SetupValueDocumentsAll();
					},
				},
			]);
		}

		items.push(...OLSKRemoteStorage.OLSKRemoteStorageRecipes({
			ParamWindow: window,
			ParamStorage: mod._ValueOLSKRemoteStorage,
			OLSKLocalized: OLSKLocalized,
			ParamMod: mod,
			ParamSpecUI: OLSK_SPEC_UI(),
		}));
		items.push(...OLSKServiceWorker.OLSKServiceWorkerRecipes(window, mod.DataNavigator(), OLSKLocalized, OLSK_SPEC_UI()));

		items.push(...OLSKFund.OLSKFundRecipes({
			ParamWindow: window,
			OLSKLocalized: OLSKLocalized, 
			ParamConnected: mod._ValueOLSKRemoteStorage.connected,
			ParamAuthorized: !!mod._ValueFundClue,
			OLSKFundDispatchGrant: mod.OLSKFundDispatchGrant,
			OLSKFundDispatchPersist: mod.OLSKFundDispatchPersist,
			ParamMod: mod,
			ParamSpecUI: OLSK_SPEC_UI(),
		}));

		window.Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: items,
		});
	},

	OLSKFundDispatchReceive (inputData) {
		mod._OLSKWebView.modPublic.OLSKModalViewClose();

		return mod.OLSKFundDispatchPersist(inputData);
	},

	OLSKFundDispatchPersist (inputData) {
		mod._ValueFundClue = inputData;

		if (!inputData) {
			return LCHSettingAction.LCHSettingsActionDelete(mod._ValueOLSKRemoteStorage, 'LCHSettingFundClue');
		}

		return LCHSettingAction.LCHSettingsActionProperty(mod._ValueOLSKRemoteStorage, 'LCHSettingFundClue', inputData).then(function () {
			if (OLSK_SPEC_UI()) {
				return;
			}

			window.location.reload();
		});
	},

	OLSKFundDispatchProgress (inputData) {
		mod._ValueOLSKFundProgress = inputData;
	},

	OLSKFundDispatchFail () {
		mod.OLSKFundDispatchPersist(null);
	},

	OLSKFundDispatchGrant (inputData) {
		mod._ValueOLSKFundGrant = OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(inputData);
	},

	LCHComposeMasterDispatchCreate () {
		mod.ControlDocumentCreate();
	},

	LCHComposeMasterDispatchClick (inputData) {
		mod.ControlDocumentSelect(inputData);
	},

	LCHComposeMasterDispatchArrow (inputData) {
		mod.ValueDocumentSelected(inputData);
	},

	LCHComposeMasterDispatchFilter (inputData) {
		mod.ControlFilter(inputData);
	},

	LCHComposeDetailDispatchBack () {
		// mod.ControlDocumentSelect(null);

		mod.OLSKMobileViewInactive = false;
	},

	LCHComposeDetailDispatchClone () {
		mod.ControlDocumentClone(mod._ValueDocumentSelected);
	},

	LCHComposeDetailDispatchDiscard () {
		mod.ControlDocumentDiscard(mod._ValueDocumentSelected);
	},

	LCHComposeDetailDispatchUpdate () {
		mod._ValueDocumentSelected = mod._ValueDocumentSelected; // #purge-svelte-force-update

		mod.ControlDocumentPersist(mod._ValueDocumentSelected);
	},

	MessageReceived(event) {
		// We only accept messages from ourselves
	  if (event.source !== window && !OLSK_SPEC_UI()) {
	    return;
	  }

  	if (event.data === 'LCHPageRecipes') {
	    return;
	  }

  	// We only accept messages from ourselves
    // if (not launchlet.dev) {
    //   return;
    // }

	  mod.ControlPairResponseReceive(event.data);
	},

	OLSKChangeDelegateCreateDocument (inputData) {
		// console.log('OLSKChangeDelegateCreate', inputData);

		mod.ValueDocumentsAll([inputData].concat(mod._ValueDocumentsAll.filter(function (e) {
			return e.LCHDocumentID !== inputData.LCHDocumentID; // @Hotfix Dropbox sending DelegateAdd
		})), !mod._ValueDocumentSelected);
	},

	OLSKChangeDelegateUpdateDocument (inputData) {
		// console.log('OLSKChangeDelegateUpdate', inputData);

		if (mod._ValueDocumentSelected && mod._ValueDocumentSelected.LCHDocumentID === inputData.LCHDocumentID) {
			mod.ControlDocumentSelect(inputData);
		}

		mod.ValueDocumentsAll(mod._ValueDocumentsAll.map(function (e) {
			return e.LCHDocumentID === inputData.LCHDocumentID ? inputData : e;
		}), !mod._ValueDocumentSelected);
	},

	OLSKChangeDelegateDeleteDocument (inputData) {
		// console.log('OLSKChangeDelegateDelete', inputData);

		if (mod._ValueDocumentSelected && (mod._ValueDocumentSelected.LCHDocumentID === inputData.LCHDocumentID)) {
			mod.ControlDocumentSelect(null);
		}

		mod.ValueDocumentsAll(mod._ValueDocumentsAll.filter(function (e) {
			return e.LCHDocumentID !== inputData.LCHDocumentID;
		}), false);
	},

	async OLSKChangeDelegateConflictDocument (inputData) {
		return mod.OLSKChangeDelegateUpdateDocument(await LCHDocumentAction.LCHDocumentActionUpdate(mod._ValueOLSKRemoteStorage, OLSKRemoteStorage.OLSKRemoteStorageChangeDelegateConflictSelectRecent(inputData)));
	},

	OLSKRemoteStorageLauncherItemFakeFlipConnectedDidFinish () {
		mod._ValueOLSKRemoteStorage = mod._ValueOLSKRemoteStorage; // #purge-svelte-force-update
	},

	// REACT

	ReactIsLoading (inputData) {
		if (inputData) {
			return;
		}

		if (mod.DataIsMobile()) {
			return;
		}

		setTimeout(function () {
			document.querySelector('.OLSKMasterListFilterField').focus();
		})
	},

	ReactDocuments(inputData) {
		const _validDocuments = inputData.map(function (e) {
			return Object.entries(mod._ControlDocumentFlag(e)).map(function (e) {
				if (e[0] === 'LCHDocumentCallbackBody' && !e[1]) { // #purge
					e[1] = 'return'
				};

				return e;
			}).filter(function (e) {
				if (typeof e[1] === 'string' && !e[1]) {
					return false;
				}

				return true;
			}).reduce(function (coll, item) {
				coll[item[0]] = item[1];

				return coll;
			}, {});
		}).filter(function (e) {
			return !e.LCHDocumentIsFlagged;
		});

		mod._ValueRecipesArrayString = LCHBuild.LCHBuildRecipeArrayString(_validDocuments);

		mod._JavascriptComposition = OLSKString.OLSKStringReplaceTokens(LCHBuild.LCHBuildBoomarkletTemplate(), {
			LCHBuildBoomarkletTemplate_Style: mod.DataPackageStyle(),
			LCHBuildBoomarkletTemplate_Script: mod.DataPackageScript(),
			LCHBuildBoomarkletTemplate_Options: JSON.stringify(mod.DataPackageOptions()),
			LCHBuildBoomarkletTemplate_Recipes: mod._ValueRecipesArrayString,
		})

		mod._JavascriptCompositionBinary = LCHBuild.LCHBuildEscape(mod._JavascriptComposition);

		if (!mod._ValuePublicKey) {
			return;
		}

		mod.ControlPairPayloadSend();
	},

	async ReactDocumentRemainder () {
		mod._ValueDocumentRemainder = OLSKFund.OLSKFundRemainder(mod._ValueDocumentsAll.length, parseInt('LCH_FUND_DOCUMENT_LIMIT_SWAP_TOKEN'));
	},

	// SETUP

	async SetupEverything () {
		mod.SetupStorageClient();

		mod.SetupStorageStatus();

		await mod.SetupStorageNotifications();

		await mod.SetupValuePipeModeEnabled();

		await mod.SetupValuePageRecipesEnabled();

		mod.SetupValuePublicKey();

		mod.SetupValueToolsPairIsVisible();
		
		await mod.SetupValueDocumentsAll();

		mod.SetupPageRecipes();

		mod.ReactDocuments(mod._ValueDocumentsAll);

		mod.SetupFund();

		mod.ReactIsLoading(mod._ValueIsLoading = false);

		// mod.ControlDemo();
	},

	SetupStorageClient() {
		const storageModule = LCH_Data.LCH_DataModule([
			Object.assign(LCHDocumentStorage.LCHDocumentStorageBuild, {
				OLSKChangeDelegate: {
					OLSKChangeDelegateCreate: mod.OLSKChangeDelegateCreateDocument,
					OLSKChangeDelegateUpdate: mod.OLSKChangeDelegateUpdateDocument,
					OLSKChangeDelegateDelete: mod.OLSKChangeDelegateDeleteDocument,
					OLSKChangeDelegateConflict: mod.OLSKChangeDelegateConflictDocument,
				},
			}),
			LCHSettingStorage.LCHSettingStorageBuild,
			]);
		
		mod._ValueOLSKRemoteStorage = new RemoteStorage({
			modules: [ storageModule ],
			OLSKPatchRemoteStorageAuthRedirectURI: OLSK_SPEC_UI() ? undefined : window.location.origin + window.OLSKCanonical('LCHComposeRoute'),
		});

		mod._ValueOLSKRemoteStorage.access.claim(storageModule.name, 'rw');

		mod._ValueOLSKRemoteStorage.caching.enable(`/${ storageModule.name }/`);
	},

	SetupStorageStatus () {
		OLSKRemoteStorage.OLSKRemoteStorageStatus(mod._ValueOLSKRemoteStorage, function (inputData) {
			mod._ValueFooterStorageStatus = inputData;
		}, OLSKLocalized)
	},

	async SetupStorageNotifications () {
		mod._ValueOLSKRemoteStorage.on('sync-done', () => {
			if (!OLSK_SPEC_UI()) {
				console.debug('sync-done', arguments);
			}
		});

		let isOffline;

		mod._ValueOLSKRemoteStorage.on('network-offline', () => {
			if (!OLSK_SPEC_UI()) {
				console.debug('network-offline', arguments);
			}

			isOffline = true;
		});

		mod._ValueOLSKRemoteStorage.on('network-online', () => {
			if (!OLSK_SPEC_UI()) {
				console.debug('network-online', arguments);
			}
			
			isOffline = false;
		});

		mod._ValueOLSKRemoteStorage.on('error', (error) => {
			if (isOffline && inputData.message === 'Sync failed: Network request failed.') {
				return;
			};

			if (!OLSK_SPEC_UI()) {
				console.debug('error', error);
			}
		});

		return new Promise(function (res, rej) {
			return mod._ValueOLSKRemoteStorage.on('ready', res);
		});
	},

	async SetupValuePipeModeEnabled() {
		mod._ValuePipeModeEnabled = (await LCHSettingAction.LCHSettingsActionProperty(mod._ValueOLSKRemoteStorage, 'kLCHComposePreferenceModePipeEnabled')) === 'true';
	},

	async SetupValuePageRecipesEnabled() {
		mod._ValuePageRecipesEnabled = (await LCHSettingAction.LCHSettingsActionProperty(mod._ValueOLSKRemoteStorage, 'kLCHComposePreferenceIncludePageRecipes')) === 'true';
	},

	SetupValuePublicKey() {
		mod.ValuePublicKeySet(JSON.parse(localStorage.getItem('kLCHComposePreferencePublicKey') || 'null'));
	},

	SetupValueToolsPairIsVisible() {
		if (OLSK_SPEC_UI()) {
			mod._ValueToolsPairIsVisible = window.location.search.match('TestLCHComposeToolsPairIsVisible=true');
		}
	},

	async SetupValueDocumentsAll() {
		mod.ValueDocumentsAll((await LCHDocumentAction.LCHDocumentActionList(mod._ValueOLSKRemoteStorage)).filter(function (e) {
			return typeof e === 'object'; // #patch-remotestorage-true
		}));
	},

	SetupPageRecipes() {
		if (!OLSK_SPEC_UI()) {
			return;
		}

		window.LCHPageRecipes = [{
			LCHRecipeName: 'LCH_TEST_PAGE_RECIPES',
			LCHRecipeCallback () {},
		}];
	},

	async SetupFund () {
		if (OLSK_SPEC_UI() && window.location.search.match('FakeOLSKFundResponseIsPresent=true')) {
			OLSKFund._OLSKFundFakeGrantResponseRandom();
		}

		mod._ValueFundClue = (await LCHSettingAction.LCHSettingsActionProperty(mod._ValueOLSKRemoteStorage, 'LCHSettingFundClue') || {}).LCHSettingValue;

		await OLSKFund.OLSKFundSetupPostPay({
			ParamWindow: window,
			ParamExistingClue: mod._ValueFundClue || null,
			OLSKFundDispatchPersist: mod.OLSKFundDispatchPersist,
		});

		if (!mod._ValueOLSKRemoteStorage.connected) {
			return;
		}

		if (!mod._ValueFundClue) {
			return;
		}
		
		const item = {
			OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE: `OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE_SWAP_TOKEN${ '' }`, // #purge
			OLSK_CRYPTO_PAIR_SENDER_PUBLIC: 'OLSK_CRYPTO_PAIR_SENDER_PUBLIC_SWAP_TOKEN',
			ParamWindow: window,
			OLSK_FUND_API_URL: 'OLSK_FUND_API_URL_SWAP_TOKEN',
			ParamBody: {
				OLSKPactAuthType: OLSKPact.OLSKPactAuthTypeRemoteStorage(),
				OLSKPactAuthIdentity: mod._ValueOLSKRemoteStorage.remote.userAddress,
				OLSKPactAuthProof: mod._ValueOLSKRemoteStorage.remote.token,
				OLSKPactAuthMetadata: {
					OLSKPactAuthMetadataModuleName: LCH_Data.LCH_DataModuleName(),
					OLSKPactAuthMetadataFolderPath: LCHDocumentStorage.LCHDocumentStorageCollectionPath(),
				},
				OLSKPactPayIdentity: mod._ValueOLSKRemoteStorage.remote.userAddress,
				OLSKPactPayClue: mod._ValueFundClue,
			},
			OLSKLocalized,
			OLSKFundDispatchProgress: mod.OLSKFundDispatchProgress,
			OLSKFundDispatchFail: mod.OLSKFundDispatchFail,
			OLSKFundDispatchGrant: mod.OLSKFundDispatchGrant,
		};

		return OLSKFund.OLSKFundSetupGrant(item);
	},

	// LIFECYCLE

	LifecycleModuleWillMount() {
		mod.SetupEverything();
	},

};

import { onMount } from 'svelte';
onMount(mod.LifecycleModuleWillMount);

window.addEventListener('message', mod.MessageReceived, false);

import LCHComposeMaster from './submodules/LCHComposeMaster/main.svelte';
import LCHComposeDetail from './submodules/LCHComposeDetail/main.svelte';
import LCHComposeBuild from './submodules/LCHComposeBuild/main.svelte';
import LCHComposePair from './submodules/LCHComposePair/main.svelte';
import OLSKAppToolbar from 'OLSKAppToolbar';
import OLSKServiceWorkerView from '../_shared/__external/OLSKServiceWorker/main.svelte';
import OLSKStorageWidget from 'OLSKStorageWidget';
import OLSKPointer from 'OLSKPointer';
import OLSKWebView from 'OLSKWebView';
import OLSKModalView from 'OLSKModalView';
import OLSKApropos from 'OLSKApropos';
</script>
<svelte:window on:keydown={ mod.InterfaceWindowDidKeydown } />

<div class="LCHCompose OLSKViewport" class:OLSKIsLoading={ mod._ValueIsLoading }>

<div class="OLSKViewportContent">
	<LCHComposeMaster
		LCHComposeMasterListItems={ mod._ValueDocumentsVisible }
		LCHComposeMasterListItemSelected={ mod._ValueDocumentSelected }
		LCHComposeMasterFilterText={ mod._ValueFilterText }
		LCHComposeMasterDispatchCreate={ mod.LCHComposeMasterDispatchCreate }
		LCHComposeMasterDispatchClick={ mod.LCHComposeMasterDispatchClick }
		LCHComposeMasterDispatchArrow={ mod.LCHComposeMasterDispatchArrow }
		LCHComposeMasterDispatchFilter={ mod.LCHComposeMasterDispatchFilter }
		OLSKMobileViewInactive={ mod.OLSKMobileViewInactive }
		/>
	
	<LCHComposeDetail
		LCHComposeDetailItem={ mod._ValueDocumentSelected }
		LCHComposeDetailDispatchBack={ mod.LCHComposeDetailDispatchBack }
		LCHComposeDetailDispatchClone={ mod.LCHComposeDetailDispatchClone }
		LCHComposeDetailDispatchDiscard={ mod.LCHComposeDetailDispatchDiscard }
		LCHComposeDetailDispatchUpdate={ mod.LCHComposeDetailDispatchUpdate }
		OLSKMobileViewInactive={ !mod.OLSKMobileViewInactive }
		bind:this={ mod.LCHComposeDetailInstance }
		/>
</div>

<footer class="LCHComposeViewportFooter OLSKMobileViewFooter">

	<footer class="LCHComposeTools OLSKToolbar OLSKToolbarJustify OLSKCommonEdgeTop">
		<div class="OLSKToolbarElementGroup">
			<LCHComposeBuild
				LCHComposeBuildRunLink={ mod._JavascriptCompositionBinary }
				LCHComposeBuildPipeModeEnabled={ mod._ValuePipeModeEnabled }
				LCHComposeBuildPageRecipesEnabled={ mod._ValuePageRecipesEnabled }
				LCHComposeBuildDispatchRun={ mod.LCHComposeBuildDispatchRun }
				LCHComposeBuildDispatchPipeModeEnabled={ mod.LCHComposeBuildDispatchPipeModeEnabled }
				LCHComposeBuildDispatchPageRecipesEnabled={ mod.LCHComposeBuildDispatchPageRecipesEnabled }
				/>
		</div>

		<div>
			{#if !mod._ValueToolsPairIsVisible}
				<button class="LCHComposeToolsPairButton" on:click={ mod.InterfaceToolsPairButtonDidClick }>{ OLSKLocalized('LCHComposeToolsPairButtonText') }</button>
			{/if}

			{#if mod._ValueToolsPairIsVisible}
				{#if mod._ValuePairStatus === 'kStatusWaiting' }
					<span class="LCHComposeToolsPairStatusWaiting">{ OLSKLocalized('LCHComposeToolsPairStatusWaitingText') }</span>
				{/if}

				{#if mod._ValuePairStatus === 'kStatusFailed' }
					<span class="LCHComposeToolsPairStatusFailed">{ OLSKLocalized('LCHComposeToolsPairStatusFailedText') }</span>
					<span class="LCHComposeToolsPairStatusFailedError">{ mod._ValueToolsPairStatusFailedError }</span>
				{/if}
				
				<LCHComposePair
					LCHComposePairClearIsVisible={ !!mod._ValuePublicKey }
					LCHComposePairDispatchSubmit={ mod.LCHComposePairDispatchSubmit }
					LCHComposePairDispatchClear={ mod.LCHComposePairDispatchClear }
					/>
			{/if}
		</div>
	</footer>

	{#if !mod._ValueStorageToolbarHidden }
		<div class="LCHComposeStorageToolbar OLSKToolbar OLSKToolbarJustify OLSKCommonEdgeTop OLSKStorageToolbar">
			<div class="OLSKToolbarElementGroup">
				<div></div>
			</div>

			<div class="OLSKToolbarElementGroup">
				<OLSKStorageWidget StorageClient={ mod._ValueOLSKRemoteStorage } />
			</div>
		</div>
	{/if}

	<OLSKAppToolbar
		OLSKAppToolbarDispatchApropos={ mod.OLSKAppToolbarDispatchApropos }
		OLSKAppToolbarDispatchTongue={ mod.OLSKAppToolbarDispatchTongue }
		OLSKAppToolbarFundShowProgress={ mod._ValueOLSKFundProgress }
		OLSKAppToolbarFundLimitText={ mod._ValueDocumentRemainder }
		OLSKAppToolbarDispatchFund={ mod._ValueOLSKFundGrant || OLSKFund.OLSKFundResponseIsPresent() ? null : mod.OLSKAppToolbarDispatchFund }
		OLSKAppToolbarGuideURL={ window.OLSKCanonical('LCHGuideRoute') }
		OLSKAppToolbarStorageStatus={ mod._ValueFooterStorageStatus }
		OLSKAppToolbarDispatchStorage={ mod.OLSKAppToolbarDispatchStorage }
		OLSKAppToolbarDispatchLauncher={ mod.OLSKAppToolbarDispatchLauncher }
		/>

</footer>

{#if mod._ValueOLSKRemoteStorage && mod._ValueOLSKRemoteStorage.connected }
	<OLSKWebView OLSKModalViewTitleText={ OLSKLocalized('OLSKFundWebViewTitleText') } OLSKWebViewURL={ mod._ValueFundURL } bind:this={ mod._OLSKWebView } DEBUG_OLSKWebViewDataSource={ OLSK_SPEC_UI() } />
{/if}

<OLSKModalView OLSKModalViewTitleText={ OLSKLocalized('OLSKAproposHeadingText') } bind:this={ mod._OLSKModalView } OLSKModalViewIsCapped={ true }>
	<OLSKApropos
		OLSKAproposFeedbackValue={ `javascript:window.location.href = window.atob('${ window.btoa(OLSKString.OLSKStringFormatted(window.atob('OLSK_APROPOS_FEEDBACK_EMAIL_SWAP_TOKEN'), 'RP_001' + (mod._ValueFundClue ? '+' + mod._ValueFundClue : ''))) }')` }
		/>
</OLSKModalView>

</div>

{#if !OLSK_SPEC_UI()}
	<OLSKServiceWorkerView OLSKServiceWorkerRegistrationRoute={ window.OLSKCanonical('LCHServiceWorkerRoute') } />
{/if}

{#if mod._IsRunningDemo }
	<OLSKPointer />
{/if}

<style src="./ui-style.css"></style>

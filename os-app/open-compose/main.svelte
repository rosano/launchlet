<script>
import { OLSKLocalized } from 'OLSKInternational';
import OLSKThrottle from 'OLSKThrottle';
import LCHDocument from '../_shared/LCHDocument/main.js';
import LCHSetting from '../_shared/LCHSetting/main.js';
import LCHTransport from '../_shared/LCHTransport/main.js';
import { OLSK_SPEC_UI } from 'OLSKSpec';
import OLSKRemoteStorage from 'OLSKRemoteStorage';
import OLSKObject from 'OLSKObject';
import OLSKServiceWorker from 'OLSKServiceWorker';
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
import zerodatawrap from 'zerodatawrap';

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
		mod._ValueDocumentsVisible = shouldSort ? items.sort(LCHComposeLogic.LCHComposeSortFunction) : items;
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
	
	_ValueCloudToolbarHidden: true,

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
		if (mod._ValueZDRWrap.ZDRStorageProtocol === zerodatawrap.ZDRProtocolFission()) {
			return true;
		}

		return OLSKFund.OLSKFundIsEligible(Object.assign({
			ParamMinimumTier: 1,
			ParamCurrentProject: 'RP_001',
			ParamBundleProjects: ['FakeBundleProject'],
			ParamGrantTier: OLSKFund.OLSKFundTier('OLSK_FUND_PRICING_STRING_SWAP_TOKEN', mod._ValueOLSKFundGrant),
			ParamGrantProject: mod._ValueOLSKFundGrant ? mod._ValueOLSKFundGrant.OLSKPactGrantProject : '',
		}, inputData));
	},

	async DataExportJSON () {
		return JSON.stringify(await mod._ValueZDRWrap.App.LCHTransport.LCHTransportExport({
			LCHDocument: mod._ValueDocumentsAll,
			LCHSetting: await mod._ValueZDRWrap.App.LCHSetting.LCHSettingList(),
		}));
	},

	DataExportBasename () {
		return `${ window.location.hostname }-${ Date.now() }`;
	},

	DataExportJSONFilename () {
		return `${ mod.DataExportBasename() }.json`;
	},	

	DataComposeRecipes () {
		const items = [
			{
				LCHRecipeSignature: 'LCHComposeLauncherItemImportJSON',
				LCHRecipeName: OLSKLocalized('LCHComposeLauncherItemImportJSONText'),
				LCHRecipeCallback: async function LCHComposeLauncherItemImportJSON () {
					return mod.ControlImportData(await this.api.LCHReadTextFile({
						accept: '.json',
					}));
				},
			}, {
				LCHRecipeSignature: 'LCHComposeLauncherItemExportJSON',
				LCHRecipeName: OLSKLocalized('LCHComposeLauncherItemExportJSONText'),
				LCHRecipeCallback: async function LCHComposeLauncherItemExportJSON () {
					return this.api.LCHSaveFile(await mod.DataExportJSON(), mod.DataExportJSONFilename());
				},
			}
		];

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
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncCreateDocument',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncCreateDocument () {
						return mod.ZDRSchemaDispatchSyncCreateDocument(await mod._ValueZDRWrap.App.LCHDocument.LCHDocumentCreate(mod.DataDocumentObjectTemplate('FakeZDRSchemaDispatchSyncCreateDocument')));
					},
				},
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncUpdateDocument',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncUpdateDocument () {
						return mod.ZDRSchemaDispatchSyncUpdateDocument(await mod._ValueZDRWrap.App.LCHDocument.LCHDocumentUpdate(Object.assign(mod._ValueDocumentsAll.filter(function (e) {
							return e.LCHDocumentName.match('FakeZDRSchemaDispatchSync');
						}).pop(), {
							LCHDocumentName: 'FakeZDRSchemaDispatchSyncUpdateDocument',
						})));
					},
				},
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncDeleteDocument',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncDeleteDocument () {
						const item = mod._ValueDocumentsAll.filter(function (e) {
							return e.LCHDocumentName.match('FakeZDRSchemaDispatchSync');
						}).pop();
						
						await mod._ValueZDRWrap.App.LCHDocument.ZDRModelDeleteObject(item);
						
						return mod.ZDRSchemaDispatchSyncDeleteDocument(item);
					},
				},
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncConflictDocument',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncConflictDocument () {
						const item = mod._ValueDocumentsAll.filter(function (e) {
							return e.LCHDocumentName.match('FakeZDRSchemaDispatchSyncConflictDocument');
						}).pop();
						
						return mod.ZDRSchemaDispatchSyncConflict({
							origin: 'conflict',
							oldValue: JSON.parse(JSON.stringify(await mod._ValueZDRWrap.App.LCHDocument.LCHDocumentUpdate(Object.assign({}, item, {
								LCHDocumentName: item.LCHDocumentName + '-local',
							})))),
							newValue: JSON.parse(JSON.stringify(Object.assign(Object.assign({}, item), {
								LCHDocumentName: item.LCHDocumentName + '-remote',
							}))),
						});
					},
				},
				{
					LCHRecipeName: 'LCHComposeLauncherItemDebug_PromptFakeImportSerialized',
					LCHRecipeCallback: function LCHComposeLauncherItemDebug_PromptFakeImportSerialized () {
						return mod.ControlImportData(window.prompt());
					},
				},
				{
					LCHRecipeName: 'LCHComposeLauncherItemDebug_AlertFakeExportSerialized',
					LCHRecipeCallback: async function LCHComposeLauncherItemDebug_AlertFakeExportSerialized () {
						return window.alert(JSON.stringify({
							OLSKDownloadName: mod.DataExportJSONFilename(),
							OLSKDownloadData: await mod.DataExportJSON(),
						}));
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
							return mod._ValueZDRWrap.App.LCHDocument.LCHDocumentCreate(mod.DataDocumentObjectTemplate());
						}));

						return mod.SetupValueDocumentsAll();
					},
				},
			]);
		}

		items.push(...zerodatawrap.ZDRRecipes({
			ParamMod: mod,
			ParamSpecUI: OLSK_SPEC_UI(),
		}));

		if (mod._ValueZDRWrap.ZDRStorageProtocol === zerodatawrap.ZDRProtocolRemoteStorage()) {
			items.push(...OLSKRemoteStorage.OLSKRemoteStorageRecipes({
				ParamWindow: window,
				ParamStorage: mod._ValueZDRWrap.ZDRStorageClient(),
				OLSKLocalized: OLSKLocalized,
				ParamMod: mod,
				ParamSpecUI: OLSK_SPEC_UI(),
			}));
		}

		items.push(...OLSKServiceWorker.OLSKServiceWorkerRecipes(window, mod.DataNavigator(), OLSKLocalized, OLSK_SPEC_UI()));

		items.push(...OLSKFund.OLSKFundRecipes({
			ParamWindow: window,
			OLSKLocalized: OLSKLocalized, 
			ParamConnected: !!mod._ValueCloudIdentity,
			ParamAuthorized: !!mod._ValueFundClue,
			OLSKFundDispatchGrant: mod.OLSKFundDispatchGrant,
			OLSKFundDispatchPersist: mod.OLSKFundDispatchPersist,
			ParamMod: mod,
			ParamSpecUI: OLSK_SPEC_UI(),
		}));

		return items;
	},

	// INTERFACE

	InterfaceCreateButtonDidClick () {
		mod.ControlDocumentCreate();
	},

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
		await mod._ValueZDRWrap.App.LCHDocument.LCHDocumentUpdate(inputData);
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

		mod.ControlDocumentSelect(mod._OLSKCatalog.modPublic.OLSKCatalogInsert(await mod._ValueZDRWrap.App.LCHDocument.LCHDocumentCreate(inputData || mod.DataDocumentObjectTemplate())));

		if (mod.DataIsMobile()) {
			mod.ControlFocusDetail();
		}
	},
	
	ControlDocumentSelect(inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogSelect(inputData);

		if (!inputData) {
			return !mod.DataIsMobile() && document.querySelector('.OLSKMasterListFilterField').focus();
		}

		mod._OLSKCatalog.modPublic.OLSKCatalogFocusDetail();

		if (mod.DataIsMobile()) {
			return;
		}
		
		setTimeout(mod.ControlFocusDetail)
	},
	
	async ControlDocumentClone (inputData) {
		const item = Object.assign({}, inputData);

		delete item.LCHDocumentID;

		mod.ControlDocumentCreate(item);
	},
	
	ControlDocumentDiscard (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogRemove(inputData);

		mod._ValueZDRWrap.App.LCHDocument.ZDRModelDeleteObject(inputData);
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

	ControlPipeModeEnabledPersist (inputData) {
		mod.ReactDocuments(mod._ValueDocumentsAll);

		mod._ValueZDRWrap.App.LCHSetting.ZDRModelWriteObject({
			LCHSettingKey: 'kLCHComposePreferenceModePipeEnabled',
			LCHSettingValue: inputData.toString(),
		});
	},

	ControlPageRecipesEnabledPersist (inputData) {
		mod.ReactDocuments(mod._ValueDocumentsAll);

		mod._ValueZDRWrap.App.LCHSetting.ZDRModelWriteObject({
			LCHSettingKey: 'kLCHComposePreferenceIncludePageRecipes',
			LCHSettingValue: inputData.toString(),
		});
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

	async ControlImportData (inputData) {
		if (!inputData.trim()) {
			return window.alert(OLSKLocalized('LCHComposeLauncherItemImportJSONErrorNotFilledAlertText'))
		}

		try {
			await mod._ValueZDRWrap.App.LCHTransport.LCHTransportImport(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(JSON.parse(inputData)));
			
			await mod.SetupSettingsAll();
			await mod.SetupValueDocumentsAll();
		} catch (e) {
			window.alert(OLSKLocalized('LCHComposeLauncherItemImportJSONErrorNotValidAlertText'));
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

	OLSKMasterListItemAccessibilitySummaryFunction (inputData) {
		return LCHComposeLogic.LCHComposeAccessibilitySummary(inputData, OLSKLocalized);
	},

	_OLSKCatalogDispatchKey (inputData) {
		return inputData.LCHDocumentID;
	},

	OLSKCatalogDispatchClick (inputData) {
		mod.ControlDocumentSelect(inputData);
	},

	OLSKCatalogDispatchArrow (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogSelect(inputData);
	},

	OLSKCatalogDispatchQuantity (inputData) {
		mod._ValueDocumentRemainder = OLSKFund.OLSKFundRemainder(inputData, parseInt('KVC_FUND_DOCUMENT_LIMIT_SWAP_TOKEN'));
	},

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

	async OLSKCloudFormDispatchSubmit (inputData) {
		const protocol = zerodatawrap.ZDRPreferenceProtocolConnect(inputData);
		(zerodatawrap.ZDRPreferenceProtocolMigrate() ? await mod.DataStorageClient(protocol) : mod._ValueZDRWrap).ZDRCloudConnect(inputData);
	},

	OLSKCloudDispatchRenew () {
		mod._ValueZDRWrap.ZDRCloudReconnect(mod._ValueCloudIdentity);
	},

	OLSKCloudStatusDispatchDisconnect () {
		mod._ValueZDRWrap.ZDRCloudDisconnect();

		mod._ValueCloudIdentity = null;

		zerodatawrap.ZDRPreferenceProtocolClear();
	},

	ZDRParamDispatchError (error) {
		mod._ValueCloudErrorText = error.toString();
	},

	ZDRParamDispatchConnected (identity, token) {
		mod._ValueCloudIdentity = identity;
		mod._ValueCloudToken = token;
	},

	ZDRParamDispatchOnline () {
		mod._ValueCloudIsOffline = false;
	},

	ZDRParamDispatchOffline () {
		mod._ValueCloudIsOffline = true;
	},

	ZDRParamDispatchSyncDidStart () {
		mod._ValueIsSyncing = true;
	},

	ZDRParamDispatchSyncDidStop () {
		mod._ValueIsSyncing = false;
	},

	OLSKCloudStatusDispatchSyncStart () {
		if (mod._ValueZDRWrap.ZDRStorageProtocol !== zerodatawrap.ZDRProtocolRemoteStorage()) {
			return;
		}

		mod._ValueZDRWrap.ZDRStorageClient().startSync();

		mod.ZDRParamDispatchSyncDidStart();
	},

	OLSKCloudStatusDispatchSyncStop () {
		if (mod._ValueZDRWrap.ZDRStorageProtocol !== zerodatawrap.ZDRProtocolRemoteStorage()) {
			return;
		}

		mod._ValueZDRWrap.ZDRStorageClient().stopSync();
	},

	ZDRSchemaDispatchSyncConflict (event) {
		setTimeout(async function () {
			return mod.ZDRSchemaDispatchSyncUpdateDocument(await mod._ValueZDRWrap.App.LCHDocument.LCHDocumentUpdate(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(OLSKRemoteStorage.OLSKRemoteStorageChangeDelegateConflictSelectRecent(event))));
		}, OLSK_SPEC_UI() ? 0 : 500);
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
				ParamRouteConstant: window.OLSKPublicConstants('OLSKSharedActiveRouteConstant'),
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
		if (!mod._ValueCloudIdentity) {
			return mod._OLSKAppToolbarDispatchFundNotConnected();
		}

		mod._ValueFundURL = OLSKFund.OLSKFundURL({
			ParamFormURL: 'OLSK_FUND_FORM_URL_SWAP_TOKEN',
			ParamProject: 'RP_001',
			ParamIdentity: mod._ValueCloudIdentity,
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

		mod._ValueCloudToolbarHidden = false;
	},

	OLSKAppToolbarDispatchStorage () {
		mod._ValueCloudToolbarHidden = !mod._ValueCloudToolbarHidden;
	},

	OLSKAppToolbarDispatchLauncher () {
		if (window.Launchlet.LCHSingletonExists()) {
			return window.Launchlet.LCHSingletonDestroy();
		}

		window.Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: mod.DataComposeRecipes(),
		});
	},

	OLSKFundDispatchReceive (inputData) {
		mod._OLSKWebView.modPublic.OLSKModalViewClose();

		return mod.OLSKFundDispatchPersist(inputData);
	},

	OLSKFundDispatchPersist (inputData) {
		mod._ValueFundClue = inputData;

		if (!inputData) {
			return mod._ValueZDRWrap.App.LCHSetting.ZDRModelDeleteObject({
				LCHSettingKey: 'LCHSettingFundClue',
			});
		}

		return mod._ValueZDRWrap.App.LCHSetting.ZDRModelWriteObject({
			LCHSettingKey: 'LCHSettingFundClue',
			LCHSettingValue: inputData,
		}).then(function () {
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
		mod.ControlDocumentClone(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected());
	},

	LCHComposeDetailDispatchDiscard () {
		mod.ControlDocumentDiscard(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected());
	},

	LCHComposeDetailDispatchUpdate () {
		mod.ControlDocumentPersist(mod._OLSKCatalog.modPublic.OLSKCatalogUpdate(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected()));
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

	ZDRSchemaDispatchSyncCreateDocument (inputData) {
		// console.log('ZDRSchemaDispatchSyncCreate', inputData);

		mod.ValueDocumentsAll([inputData].concat(mod._ValueDocumentsAll.filter(function (e) {
			return e.LCHDocumentID !== inputData.LCHDocumentID; // @Hotfix Dropbox sending DelegateAdd
		})), !mod._ValueDocumentSelected);
	},

	ZDRSchemaDispatchSyncUpdateDocument (inputData) {
		// console.log('ZDRSchemaDispatchSyncUpdate', inputData);

		if (mod._ValueDocumentSelected && mod._ValueDocumentSelected.LCHDocumentID === inputData.LCHDocumentID) {
			mod.ControlDocumentSelect(inputData);
		}

		mod.ValueDocumentsAll(mod._ValueDocumentsAll.map(function (e) {
			return e.LCHDocumentID === inputData.LCHDocumentID ? inputData : e;
		}), !mod._ValueDocumentSelected);
	},

	ZDRSchemaDispatchSyncDeleteDocument (inputData) {
		// console.log('ZDRSchemaDispatchSyncDelete', inputData);

		if (mod._ValueDocumentSelected && (mod._ValueDocumentSelected.LCHDocumentID === inputData.LCHDocumentID)) {
			mod.ControlDocumentSelect(null);
		}

		mod.ValueDocumentsAll(mod._ValueDocumentsAll.filter(function (e) {
			return e.LCHDocumentID !== inputData.LCHDocumentID;
		}), false);
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
		if (mod._ValueZDRWrap.ZDRStorageProtocol === zerodatawrap.ZDRProtocolFission()) {
			return
		}
		mod._ValueDocumentRemainder = OLSKFund.OLSKFundRemainder(mod._ValueDocumentsAll.length, parseInt('LCH_FUND_DOCUMENT_LIMIT_SWAP_TOKEN'));
	},

	// SETUP

	async SetupEverything () {
		await mod.SetupStorageClient();

		await mod.SetupSettingsAll();
		
		mod.SetupValuePublicKey();

		mod.SetupValueToolsPairIsVisible();
		
		await mod.SetupValueDocumentsAll();

		mod.SetupPageRecipes();

		mod.ReactDocuments(mod._ValueDocumentsAll);

		mod.SetupFund();

		mod.ReactIsLoading(mod._ValueIsLoading = false);

		// mod.ControlDemo();
	},

	DataStorageClient (inputData) {
		return zerodatawrap.ZDRWrap({
			ZDRParamLibrary: (function() {
				if (inputData === zerodatawrap.ZDRProtocolFission()) {
					return webnative;
				}

				return RemoteStorage;
			})(),
			ZDRParamScopes: [{
				ZDRScopeKey: 'App',
				ZDRScopeDirectory: 'launchlet',
				ZDRScopeCreatorDirectory: 'rCreativ',
				ZDRScopeSchemas: [
					Object.assign(LCHDocument, {
						ZDRSchemaDispatchSyncCreate: mod.ZDRSchemaDispatchSyncCreateDocument,
						ZDRSchemaDispatchSyncUpdate: mod.ZDRSchemaDispatchSyncUpdateDocument,
						ZDRSchemaDispatchSyncDelete: mod.ZDRSchemaDispatchSyncDeleteDocument,
						ZDRSchemaDispatchSyncConflict: mod.ZDRSchemaDispatchSyncConflict,
					}),
					LCHSetting,
					LCHTransport,
					],
			}],
			ZDRParamDispatchError: mod.ZDRParamDispatchError,
			ZDRParamDispatchConnected: mod.ZDRParamDispatchConnected,
			ZDRParamDispatchOnline: mod.ZDRParamDispatchOnline,
			ZDRParamDispatchOffline: mod.ZDRParamDispatchOffline,
			_ZDRParamDispatchJSONPreStringify: OLSKObject.OLSKObjectSafeCopy,
			_ZDRParamDispatchJSONPostParse: OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse,
		})
	},

	async SetupStorageClient() {
		mod._ValueZDRWrap = await mod.DataStorageClient(zerodatawrap.ZDRPreferenceProtocol(zerodatawrap.ZDRProtocolRemoteStorage()));
	},

	async DataSettingValue (inputData) {
		return ((await mod._ValueZDRWrap.App.LCHSetting.LCHSettingList()).filter(function (e) {
			return e.LCHSettingKey === inputData;
		}).pop() || {}).LCHSettingValue;
	},

	async SetupSettingsAll() {
		mod._ValuePipeModeEnabled = (await mod.DataSettingValue('kLCHComposePreferenceModePipeEnabled')) === 'true';
		mod._ValuePageRecipesEnabled = (await mod.DataSettingValue('kLCHComposePreferenceIncludePageRecipes')) === 'true';
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
		if (zerodatawrap.ZDRPreferenceProtocolMigrate()) {
			const client = await mod.DataStorageClient(zerodatawrap.ZDRPreferenceProtocolMigrate());

			await Promise.all((await client.App.ZDRStoragePathsRecursive('/')).map(async function (e) {
				await mod._ValueZDRWrap.App.ZDRStorageWriteObject(e, await client.App.ZDRStorageReadObject(e));
				await client.App.ZDRStorageDeleteFile(e);
			}));

			zerodatawrap.ZDRPreferenceProtocolMigrateClear();

			client.ZDRCloudDisconnect();
		};

		mod.ValueDocumentsAll(await mod._ValueZDRWrap.App.LCHDocument.LCHDocumentList());
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
		if (mod._ValueZDRWrap.ZDRStorageProtocol === zerodatawrap.ZDRProtocolFission()) {
			mod._ValueOLSKFundGrant = {};
		}

		if (OLSK_SPEC_UI() && window.location.search.match('FakeOLSKFundResponseIsPresent=true')) {
			OLSKFund._OLSKFundFakeGrantResponseRandom();
		}

		mod._ValueFundClue = await mod.DataSettingValue('LCHSettingFundClue');

		await OLSKFund.OLSKFundSetupPostPay({
			ParamWindow: window,
			ParamExistingClue: mod._ValueFundClue || null,
			OLSKFundDispatchPersist: mod.OLSKFundDispatchPersist,
		});

		if (!mod._ValueCloudIdentity) {
			return;
		}

		if (!mod._ValueFundClue) {
			return;
		}

		if (mod._ValueZDRWrap.ZDRStorageProtocol !== zerodatawrap.ZDRProtocolRemoteStorage()) {
			return;
		}

		const item = {
			OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE: `OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE_SWAP_TOKEN${ '' }`, // #purge
			OLSK_CRYPTO_PAIR_SENDER_PUBLIC: 'OLSK_CRYPTO_PAIR_SENDER_PUBLIC_SWAP_TOKEN',
			ParamWindow: window,
			OLSK_FUND_API_URL: 'OLSK_FUND_API_URL_SWAP_TOKEN',
			ParamBody: {
				OLSKPactAuthType: OLSKPact.OLSKPactAuthTypeRemoteStorage(),
				OLSKPactAuthIdentity: mod._ValueCloudIdentity,
				OLSKPactAuthProof: mod._ValueCloudToken,
				OLSKPactAuthMetadata: {
					OLSKPactAuthMetadataModuleName: 'launchlet',
					OLSKPactAuthMetadataFolderPath: LCHDocument.LCHDocumentDirectory() + '/',
				},
				OLSKPactPayIdentity: mod._ValueCloudIdentity,
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

import OLSKCatalog from 'OLSKCatalog';
import LCHComposeMaster from './submodules/LCHComposeMaster/main.svelte';
import LCHComposeMasterListItem from './submodules/LCHComposeMasterListItem/main.svelte';
import LCHComposeDetail from './submodules/LCHComposeDetail/main.svelte';
import LCHComposeBuild from './submodules/LCHComposeBuild/main.svelte';
import LCHComposePair from './submodules/LCHComposePair/main.svelte';
import OLSKAppToolbar from 'OLSKAppToolbar';
import OLSKServiceWorkerView from '../_shared/__external/OLSKServiceWorker/main.svelte';
import OLSKCloud from 'OLSKCloud';
import OLSKPointer from 'OLSKPointer';
import OLSKWebView from 'OLSKWebView';
import OLSKModalView from 'OLSKModalView';
import OLSKApropos from 'OLSKApropos';
import OLSKUIAssets from 'OLSKUIAssets';
</script>
<svelte:window on:keydown={ mod.InterfaceWindowDidKeydown } />

<div class="LCHCompose OLSKViewport" class:OLSKIsLoading={ mod._ValueIsLoading }>

<div class="OLSKViewportContent">

<OLSKCatalog
	bind:this={ mod._OLSKCatalog }

	OLSKMasterListItemAccessibilitySummaryFunction={ mod.OLSKMasterListItemAccessibilitySummaryFunction }

	OLSKCatalogSortFunction={ LCHComposeLogic.LCHComposeSortFunction }
	OLSKCatalogFilterFunction={ LCHComposeLogic.LCHComposeFilterFunction }
	OLSKCatalogExactFunction={ LCHComposeLogic.LCHComposeExactFunction }

	_OLSKCatalogDispatchKey={ mod._OLSKCatalogDispatchKey }

	OLSKCatalogDispatchClick={ mod.OLSKCatalogDispatchClick }
	OLSKCatalogDispatchArrow={ mod.OLSKCatalogDispatchArrow }
	OLSKCatalogDispatchQuantity={ mod.OLSKCatalogDispatchQuantity }

	let:OLSKResultsListItem
	>

	<!-- MASTER -->

	<div class="OLSKToolbarElementGroup" slot="OLSKMasterListToolbarTail">
		<button class="LCHComposeCreateButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('LCHComposeCreateButtonText') } on:click={ mod.InterfaceCreateButtonDidClick } accesskey="n">
			<div class="LCHComposeCreateButtonImage">{@html OLSKUIAssets._OLSKSharedCreate }</div>
		</button>
	</div>

	<!-- LIST ITEM -->

	<div slot="OLSKMasterListItem">
		<LCHComposeMasterListItem LCHComposeMasterListItemTitle={ OLSKResultsListItem.LCHDocumentName } LCHComposeMasterListItemFlagged={ false } />
	</div>

	<!-- DETAIL -->
	
	<div class="LCHComposeDetailContainer" slot="OLSKCatalogDetailContent" let:OLSKCatalogItemSelected>
		<LCHComposeDetail
			LCHComposeDetailItem={ OLSKCatalogItemSelected }

			LCHComposeDetailDispatchBack={ mod.LCHComposeDetailDispatchBack }
			LCHComposeDetailDispatchClone={ mod.LCHComposeDetailDispatchClone }
			LCHComposeDetailDispatchDiscard={ mod.LCHComposeDetailDispatchDiscard }
			LCHComposeDetailDispatchUpdate={ mod.LCHComposeDetailDispatchUpdate }

			bind:this={ mod._LCHComposeDetail }
			/>
	</div>

</OLSKCatalog>

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

	{#if !mod._ValueCloudToolbarHidden }
		<div class="LCHComposeStorageToolbar OLSKToolbar OLSKToolbarJustify OLSKCommonEdgeTop OLSKStorageToolbar">
			<div class="OLSKToolbarElementGroup">
				<div></div>
			</div>

			<div class="OLSKToolbarElementGroup">
				<OLSKCloud
					OLSKCloudErrorText={ mod._ValueCloudErrorText }
					OLSKCloudDispatchRenew={ mod.OLSKCloudDispatchRenew }
					OLSKCloudFormDispatchSubmit={ mod.OLSKCloudFormDispatchSubmit }
					OLSKCloudStatusIdentityText={ mod._ValueCloudIdentity }
					OLSKCloudStatusIsSyncing={ mod._ValueIsSyncing }
					OLSKCloudStatusDispatchSyncStart={ mod.OLSKCloudStatusDispatchSyncStart }
					OLSKCloudStatusDispatchSyncStop={ mod.OLSKCloudStatusDispatchSyncStop }
					OLSKCloudStatusDispatchDisconnect={ mod.OLSKCloudStatusDispatchDisconnect }
					/>
			</div>
		</div>
	{/if}

	<OLSKAppToolbar
		OLSKAppToolbarDispatchApropos={ mod.OLSKAppToolbarDispatchApropos }
		OLSKAppToolbarDispatchTongue={ mod.OLSKAppToolbarDispatchTongue }
		OLSKAppToolbarGuideURL={ window.OLSKCanonical('LCHGuideRoute') }
		OLSKAppToolbarFundShowProgress={ mod._ValueOLSKFundProgress }
		OLSKAppToolbarFundLimitText={ mod._ValueDocumentRemainder }
		OLSKAppToolbarDispatchFund={ mod._ValueOLSKFundGrant || OLSKFund.OLSKFundResponseIsPresent() ? null : mod.OLSKAppToolbarDispatchFund }
		OLSKAppToolbarCloudConnected={ !!mod._ValueCloudIdentity }
		OLSKAppToolbarCloudOffline={ mod._ValueCloudIsOffline }
		OLSKAppToolbarCloudError={ !!mod._ValueCloudErrorText }
		OLSKAppToolbarDispatchStorage={ mod.OLSKAppToolbarDispatchStorage }
		OLSKAppToolbarDispatchLauncher={ mod.OLSKAppToolbarDispatchLauncher }
		/>

</footer>

{#if !!mod._ValueCloudIdentity }
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

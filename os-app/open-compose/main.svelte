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
import OLSKPact from 'OLSKPact';
import OLSKChain from 'OLSKChain';
import OLSKBeacon from 'OLSKBeacon';
import OLSKTransport from 'OLSKTransport';
import zerodatawrap from 'zerodatawrap';

const mod = {

	// VALUE

	_ValueIsLoading: true,

	_JavascriptComposition: '', 
	_JavascriptCompositionBinary: '',
	_ValueRecipesArrayString: '',
	
	_ValueCloudToolbarHidden: true,

	_ValuePersistThrottleMap: {},

	_ValuePipeModeEnabled: false,

	_ValueToolsPairIsVisible: undefined,

	_ValuePublicKey: null,
	ValuePublicKeySet (inputData) {
		mod._ValuePublicKey = inputData;

		mod._ValueToolsPairIsVisible = !!inputData;
	},

	_ValuePairStatus: 'kStatusWaiting',
	_ValueToolsPairStatusFailedError: '',

	_IsRunningDemo: false,

	// DATA

	DataIsMobile () {
		return window.innerWidth <= 760;
	},

	DataPackageStyle () {
		return [window.LCHComposeBuildPackageStyle.textContent].map(LCHBuild.LCHBuildStripSourceMap).pop();
	},

	DataPackageScript () {
		return [window.LCHComposeBuildPackageScript.textContent].map(LCHBuild.LCHBuildStripSourceMap).pop();
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

	DataComposeRecipes () {
		const items = [];

		if (mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected()) {
			items.push({
				LCHRecipeSignature: 'LCHComposeLauncherItemClone',
				LCHRecipeName: OLSKLocalized('LCHComposeLauncherItemCloneText'),
				LCHRecipeCallback () {
					mod.ControlDocumentClone(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected());
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
						return mod.ZDRSchemaDispatchSyncUpdateDocument(await mod._ValueZDRWrap.App.LCHDocument.LCHDocumentUpdate(Object.assign(mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll().filter(function (e) {
							return e.LCHDocumentName.match('FakeZDRSchemaDispatchSync');
						}).pop(), {
							LCHDocumentName: 'FakeZDRSchemaDispatchSyncUpdateDocument',
						})));
					},
				},
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncDeleteDocument',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncDeleteDocument () {
						return mod.ZDRSchemaDispatchSyncDeleteDocument(await mod._ValueZDRWrap.App.LCHDocument.ZDRModelDeleteObject(mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll().filter(function (e) {
							return e.LCHDocumentName.match('FakeZDRSchemaDispatchSync');
						}).pop()));
					},
				},
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncConflictDocument',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncConflictDocument () {
						const item = mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll().filter(function (e) {
							return e.LCHDocumentName.match('FakeZDRSchemaDispatchSyncConflictDocument');
						}).pop();
						
						return mod.ZDRSchemaDispatchSyncConflictDocument({
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
					LCHRecipeName: 'FakeEscapeWithoutSort',
					LCHRecipeCallback: function FakeEscapeWithoutSort () {
						mod.ControlDocumentActivate(null);
					},
				},
			]);
		}

		items.push(...zerodatawrap.ZDRRecipes({
			ParamMod: mod,
			ParamSpecUI: OLSK_SPEC_UI(),
		}));

		items.push(...OLSKTransport.OLSKTransportRecipes({
			OLSKLocalized,
			OLSKTransportDispatchImportJSON: mod.OLSKTransportDispatchImportJSON,
			OLSKTransportDispatchExportInput: mod.OLSKTransportDispatchExportInput,
			ParamSpecUI: OLSK_SPEC_UI(),
		}));

		if (mod._ValueZDRWrap.ZDRStorageProtocol === zerodatawrap.ZDRProtocolRemoteStorage()) {
			items.push(...OLSKRemoteStorage.OLSKRemoteStorageRecipes({
				ParamStorage: mod._ValueZDRWrap.ZDRStorageClient(),
				OLSKLocalized,
				ParamMod: mod,
				ParamSpecUI: OLSK_SPEC_UI(),
			}));
		}

		items.push(...OLSKServiceWorker.OLSKServiceWorkerRecipes(window, mod.DataNavigator(), OLSKLocalized, OLSK_SPEC_UI()));

		return items;
	},

	// INTERFACE

	InterfaceCreateButtonDidClick () {
		mod.ControlDocumentCreate();
	},

	InterfaceToolsPairButtonDidClick() {
		mod._ValueToolsPairIsVisible = !mod._ValueToolsPairIsVisible;
	},

	// CONTROL

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

				mod.ReactDocuments(mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll());
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

		// if (inputData === mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected()) {
		// 	// causes reload of codemirror
		// 	// inputData.LCHDocumentIsFlagged = inputData.LCHDocumentIsFlagged;
		// };

		if (inputData === mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected()) {
			mod._OLSKCatalog.modPublic.OLSKCatalogSelect(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected()); // #purge-svelte-force-update
		}

		return inputData;
	},

	async ControlDocumentCreate(inputData) {
		mod.ControlDocumentActivate(mod._OLSKCatalog.modPublic.OLSKCatalogInsert(await mod._ValueZDRWrap.App.LCHDocument.LCHDocumentCreate(inputData || mod.DataDocumentObjectTemplate())));
	},
	
	ControlDocumentActivate(inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogSelect(inputData);

		mod._OLSKCatalog.modPublic.OLSKCatalogFocusDetail();
		
		mod._OLSKCatalog.modPublic.OLSKCatalogActivateDetail();
	},
	
	async ControlDocumentClone (inputData) {
		mod.ControlDocumentCreate(LCHComposeLogic.LCHComposeCloned(inputData));
	},
	
	ControlDocumentDiscard (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogRemove(inputData);

		mod._ValueZDRWrap.App.LCHDocument.ZDRModelDeleteObject(inputData);
	},
	
	ControlRun() {
		setTimeout(new Function(mod._JavascriptComposition));
		setTimeout(function () {
			document.querySelector('.LCHLauncher').parentElement.classList.add('LCHComposeLauncher');
		});
	},

	ControlPipeModeEnabledPersist (inputData) {
		mod.ReactDocuments(mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll());

		mod._ValueZDRWrap.App.LCHSetting.ZDRModelWriteObject({
			LCHSettingKey: 'kLCHComposePreferenceModePipeEnabled',
			LCHSettingValue: inputData.toString(),
		});
	},

	ControlPageRecipesEnabledPersist (inputData) {
		mod.ReactDocuments(mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll());

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
			.Point('.LCHComposeCreateButton')
			.Nudge(0, 50)
			.Wait()
			.Point('.LCHComposeCreateButton')
			.Click('.LCHComposeCreateButton')
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

	OLSKCollectionItemAccessibilitySummaryFunction (inputData) {
		return LCHComposeLogic.LCHComposeAccessibilitySummary(inputData, OLSKLocalized);
	},

	_OLSKCatalogDispatchKey (inputData) {
		return inputData.LCHDocumentID;
	},

	OLSKCollectionDispatchClick (inputData) {
		mod.ControlDocumentActivate(inputData);
	},

	OLSKCollectionDispatchArrow (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogSelect(inputData);
	},

	OLSKCatalogDispatchDetailActivate () {
		document.querySelector('.LCHComposeDetailFormNameField').focus();
	},

	OLSKCatalogDispatchMasterShouldActivate () {
		return document.activeElement === document.querySelector('.LCHComposeDetailFormNameField');
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

	async OLSKTransportDispatchImportJSON (inputData) {
		await mod._ValueZDRWrap.App.LCHTransport.LCHTransportImport(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(inputData));
		
		await mod.SetupSettingsAll();
		await mod.SetupCatalog();
	},

	async OLSKTransportDispatchExportInput () {
		return mod._ValueZDRWrap.App.LCHTransport.LCHTransportExport({
			LCHDocument: mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll(),
			LCHSetting: await mod._ValueZDRWrap.App.LCHSetting.LCHSettingList(),
		});
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

		localStorage.clear();
	},

	ZDRParamDispatchError (error) {
		mod._ValueCloudErrorText = error.message;
	},

	ZDRParamDispatchWriteError (error) {
		window.alert(mod._OLSKAppToolbarErrorText = error.message);
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
			LCHOptionLanguage: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
		});
	},

	OLSKAppToolbarDispatchCloud () {
		mod._ValueCloudToolbarHidden = !mod._ValueCloudToolbarHidden;
	},

	OLSKAppToolbarDispatchLauncher () {
		if (window.Launchlet.LCHSingletonExists()) {
			return window.Launchlet.LCHSingletonDestroy();
		}

		window.Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: mod.DataComposeRecipes(),
			LCHOptionLanguage: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
		});
	},

	LCHComposeDetailDispatchBack () {
		mod._OLSKCatalog.modPublic.OLSKCatalogFocusMaster();
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
		mod._OLSKCatalog.modPublic.OLSKCatalogInsert(inputData);
	},

	ZDRSchemaDispatchSyncUpdateDocument (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogUpdate(inputData);
	},

	ZDRSchemaDispatchSyncDeleteDocument (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogRemove(inputData);
	},

	ZDRSchemaDispatchSyncConflictDocument (event) {
		setTimeout(async function () {
			return mod.ZDRSchemaDispatchSyncUpdateDocument(await mod._ValueZDRWrap.App.LCHDocument.LCHDocumentUpdate(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(OLSKRemoteStorage.OLSKRemoteStorageChangeDelegateConflictSelectRecent(event))));
		}, OLSK_SPEC_UI() ? 0 : 500);
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
			document.querySelector('.OLSKNarrowFilterField').focus();
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

	// SETUP

	async SetupEverything () {
		await mod.SetupStorageClient();

		await mod.SetupSettingsAll();
		
		mod.SetupValuePublicKey();

		mod.SetupValueToolsPairIsVisible();
		
		await mod.SetupCatalog();

		mod.SetupPageRecipes();

		mod.ReactDocuments(mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll());

		mod.SetupCleanup();

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
						ZDRSchemaDispatchSyncConflict: mod.ZDRSchemaDispatchSyncConflictDocument,
					}),
					LCHSetting,
					LCHTransport,
					],
			}],
			ZDRParamDispatchError: mod.ZDRParamDispatchError,
			ZDRParamDispatchWriteError: mod.ZDRParamDispatchWriteError,
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

	DataSetting (inputData) {
		return mod._ValueSettingsAll[inputData];
	},

	async DataSettingValue (inputData) {
		return ((await mod._ValueZDRWrap.App.LCHSetting.LCHSettingList()).filter(function (e) {
			return e.LCHSettingKey === inputData;
		}).pop() || {}).LCHSettingValue;
	},

	async SetupSettingsAll() {
		mod._ValueSettingsAll = Object.fromEntries((await mod._ValueZDRWrap.App.LCHSetting.LCHSettingList()).map(function (e) {
			return [e.LCHSettingKey, e.LCHSettingValue];
		}));

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

	async SetupCatalog() {
		if (zerodatawrap.ZDRPreferenceProtocolMigrate()) {
			const client = await mod.DataStorageClient(zerodatawrap.ZDRPreferenceProtocolMigrate());

			await Promise.all((await client.App.ZDRStoragePathsRecursive('/')).map(async function (e) {
				await mod._ValueZDRWrap.App.ZDRStorageWriteObject(e, await client.App.ZDRStorageReadObject(e));
				await client.App.ZDRStorageDeleteFile(e);
			}));

			zerodatawrap.ZDRPreferenceProtocolMigrateClear();

			client.ZDRCloudDisconnect();
		};

		if (!(await mod._ValueZDRWrap.App.LCHDocument.LCHDocumentList()).map(mod._OLSKCatalog.modPublic.OLSKCatalogInsert).length) {
			// mod.OLSKCatalogDispatchQuantity(0);
		}
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

	SetupCleanup() {
		window.localStorage.removeItem('OLSK_FUND_GRANT_DATA');

		return mod._ValueSettingsAll.LCHSettingFundClue && mod._ValueZDRWrap.App.LCHSetting.ZDRModelDeleteObject({
			LCHSettingKey: 'LCHSettingFundClue',
		});
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
import LCHComposeListItem from './submodules/LCHComposeListItem/main.svelte';
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

<div class="LCHCompose OLSKViewport" class:OLSKIsLoading={ mod._ValueIsLoading }>

<div class="OLSKViewportContent">

<OLSKCatalog
	bind:this={ mod._OLSKCatalog }

	OLSKCollectionItemAccessibilitySummaryFunction={ mod.OLSKCollectionItemAccessibilitySummaryFunction }
	OLSKCollectionItemClass={ 'OLSKCommonEdgeBottom' }

	OLSKCatalogSortFunction={ LCHComposeLogic.LCHComposeSortFunction }
	OLSKCatalogIsMatch={ LCHComposeLogic.LCHComposeIsMatch }
	OLSKCatalogExactSortFunction={ LCHComposeLogic.LCHComposeExactSortFunction }

	_OLSKCatalogDispatchKey={ mod._OLSKCatalogDispatchKey }

	OLSKCollectionDispatchClick={ mod.OLSKCollectionDispatchClick }
	OLSKCollectionDispatchArrow={ mod.OLSKCollectionDispatchArrow }
	OLSKCatalogDispatchDetailActivate={ mod.OLSKCatalogDispatchDetailActivate }
	OLSKCatalogDispatchMasterShouldActivate={ mod.OLSKCatalogDispatchMasterShouldActivate }

	let:OLSKCollectionItem
	>

	<!-- MASTER -->

	<div class="OLSKToolbarElementGroup" slot="OLSKNarrowToolbarTail">
		<button class="LCHComposeCreateButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('LCHComposeCreateButtonText') } on:click={ mod.InterfaceCreateButtonDidClick } accesskey="n">
			<div class="LCHComposeCreateButtonImage">{@html OLSKUIAssets._OLSKSharedCreate }</div>
		</button>
	</div>

	<!-- LIST ITEM -->

	<div slot="OLSKCollectionItem">
		<LCHComposeListItem LCHComposeListItem={ OLSKCollectionItem } />
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
				<button class="LCHComposeToolsPairButton OLSKDecorPress" on:click={ mod.InterfaceToolsPairButtonDidClick }>{ OLSKLocalized('LCHComposeToolsPairButtonText') }</button>
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
		<div class="LCHComposeCloudToolbar OLSKToolbar OLSKToolbarJustify OLSKCommonEdgeTop">
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
		OLSKAppToolbarErrorText={ mod._OLSKAppToolbarErrorText }
		OLSKAppToolbarCloudConnected={ !!mod._ValueCloudIdentity }
		OLSKAppToolbarCloudOffline={ mod._ValueCloudIsOffline }
		OLSKAppToolbarCloudError={ !!mod._ValueCloudErrorText }
		OLSKAppToolbarDispatchCloud={ mod.OLSKAppToolbarDispatchCloud }
		OLSKAppToolbarDispatchLauncher={ mod.OLSKAppToolbarDispatchLauncher }
		/>

	{#if !OLSK_SPEC_UI()}
		<OLSKServiceWorkerView OLSKServiceWorkerRegistrationRoute={ window.OLSKCanonical('LCHServiceWorkerRoute') } />
	{/if}
</footer>

<OLSKModalView OLSKModalViewTitleText={ OLSKLocalized('OLSKAproposHeadingText') } bind:this={ mod._OLSKModalView } OLSKModalViewIsCapped={ true }>
	<OLSKApropos
		OLSKAproposFeedbackValue={ `javascript:window.location.href = window.atob('${ window.btoa(OLSKString.OLSKStringFormatted(window.atob('OLSK_APROPOS_FEEDBACK_EMAIL_SWAP_TOKEN'), 'ROCO_SHARED_PROJECT_ID_SWAP_TOKEN')) }')` }
		/>
</OLSKModalView>

</div>

{#if mod._IsRunningDemo }
	<OLSKPointer />
{/if}

<style src="./ui-style.css"></style>

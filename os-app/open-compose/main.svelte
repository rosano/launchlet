<script>
export let TestLCHComposeToolsPairIsVisible = false;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import OLSKThrottle from 'OLSKThrottle';
import LCH_Data from '../_shared/LCH_Data/main.js';
import * as LCHDocumentStorage from '../_shared/LCHDocument/storage.js';
import * as LCHSettingStorage from '../_shared/LCHSetting/storage.js';
import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting';
import * as OLSKRemoteStoragePackage from '../_shared/__external/OLSKRemoteStorage/main.js'
const OLSKRemoteStorage = OLSKRemoteStoragePackage.default || OLSKRemoteStoragePackage;
import * as LCHDocumentAction from '../_shared/LCHDocument/action.js';
import * as LCHDocumentMetal from '../_shared/LCHDocument/metal.js';
import * as LCHSettingAction from '../_shared/LCHSetting/action.js';
import * as LCHSettingMetal from '../_shared/LCHSetting/metal.js';
import LCHComposeLogic from './ui-logic.js';
import { LCHFlags } from '../_shared/LCHFlags/main.js'
import { LCHFormulaFrom, LCHFormulaToEvaluate } from '../_shared/LCHFormula/main.js'
import { LCHLauncherModeCommit, LCHLauncherModePipe } from '../dev-launcher/ui-logic.js';
import LCHBuild from '../_shared/LCHBuild/main.js';
import OLSKString from 'OLSKString';
import * as RemoteStoragePackage from 'remotestoragejs';
const RemoteStorage = RemoteStoragePackage.default || RemoteStoragePackage;

const mod = {

	MessageReceived(event) {
		// We only accept messages from ourselves
	  if (event.source !== window && !OLSK_TESTING_BEHAVIOUR()) {
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

	// VALUE

	_ValueIsLoading: true,

	_ValueDocumentsAll: [],

	ValueDocumentsAll (inputData, shouldSort = true) {
		mod.ValueDocumentsVisible(mod._ValueDocumentsAll = inputData, shouldSort);
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
			LCHOptionMode: mod._ValuePipeModeEnabled ? LCHLauncherModePipe() : LCHLauncherModeCommit(),
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

	OLSKAppToolbarDispatchStorage () {
		mod._ValueStorageToolbarHidden = !mod._ValueStorageToolbarHidden;
	},

	OLSKAppToolbarDispatchLauncher () {
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

		if (OLSK_TESTING_BEHAVIOUR()) {
			items.push(...[
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateCreateDocument',
					LCHRecipeCallback: async function FakeOLSKChangeDelegateCreateDocument () {
						return mod.OLSKChangeDelegateCreateDocument(await LCHDocumentAction.LCHDocumentActionCreate(mod._ValueStorageClient, mod.DataDocumentObjectTemplate('FakeOLSKChangeDelegateCreateDocument')));
					},
				},
				{
					LCHRecipeName: 'FakeOLSKChangeDelegateUpdateDocument',
					LCHRecipeCallback: async function FakeOLSKChangeDelegateUpdateDocument () {
						return mod.OLSKChangeDelegateUpdateDocument(await LCHDocumentAction.LCHDocumentActionUpdate(mod._ValueStorageClient, Object.assign(mod._ValueDocumentsAll.filter(function (e) {
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
						
						await LCHDocumentAction.LCHDocumentActionDelete(mod._ValueStorageClient, item.LCHDocumentID);
						
						return mod.OLSKChangeDelegateDeleteDocument(item);
					},
				},
				{
					LCHRecipeName: 'FakeEscapeWithoutSort',
					LCHRecipeCallback: function FakeEscapeWithoutSort () {
						mod.ControlDocumentSelect(null);
					},
				},
			]);
		}

		window.Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: items,
		});
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

	_OLSKAppToolbarDispatchExport () {
		mod.ControlExportData();
	},

	_OLSKAppToolbarDispatchImport (inputData) {
		mod.ControlImportData(inputData);
	},

	// INTERFACE	

	InterfaceWindowDidKeydown (event) {
		if (document.querySelector('.LCHLauncher')) {
			return;
		}

		const handlerFunctions = {
			Escape () {
				mod.ControlFilter('');

				if (!OLSK_TESTING_BEHAVIOUR()) {
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

		if (OLSK_TESTING_BEHAVIOUR()) {
			OLSKThrottle.OLSKThrottleSkip(mod._ValuePersistThrottleMap[inputData.LCHDocumentID]);
		}
	},

	async _ControlDocumentSave(inputData) {
		await LCHDocumentAction.LCHDocumentActionUpdate(mod._ValueStorageClient, inputData);
	},

	_ControlDocumentFlag(inputData) {
		Object.assign(inputData, {
			LCHDocumentSyntaxErrorMessage: '',
		});

		try	{
			inputData.LCHDocumentIsFlagged = !!LCHFlags(LCHFormulaToEvaluate(LCHFormulaFrom(inputData)));
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

	async ControlDocumentCreate(inputData) {
		const item = await LCHDocumentAction.LCHDocumentActionCreate(mod._ValueStorageClient, inputData || mod.DataDocumentObjectTemplate());

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

		await LCHDocumentAction.LCHDocumentActionDelete(mod._ValueStorageClient, inputData.LCHDocumentID);

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
			LCHSettingObjects: await LCHSettingAction.LCHSettingsActionQuery(mod._ValueStorageClient, {}),
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
			return LCHSettingMetal.LCHSettingsMetalWrite(mod._ValueStorageClient, e);
		}));

		await Promise.all(outputData.LCHDocumentObjects.map(function (e) {
			return LCHDocumentMetal.LCHDocumentMetalWrite(mod._ValueStorageClient, OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(e));
		}));

		mod.ValueDocumentsAll(await LCHDocumentAction.LCHDocumentActionList(mod._ValueStorageClient));
	},

	ControlPipeModeEnabledPersist (inputData) {
		mod.ReactDocuments(mod._ValueDocumentsAll);

		LCHSettingAction.LCHSettingsActionProperty(mod._ValueStorageClient, 'kLCHComposePreferenceModePipeEnabled', inputData.toString())
	},

	ControlPageRecipesEnabledPersist (inputData) {
		mod.ReactDocuments(mod._ValueDocumentsAll);

		LCHSettingAction.LCHSettingsActionProperty(mod._ValueStorageClient, 'kLCHComposePreferenceIncludePageRecipes', inputData.toString())
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

		mod._ControlPairPayloadPost(OLSK_TESTING_BEHAVIOUR() ? 'LBX_TESTING_REQUEST_DATA' : await mod._ControlPairPayloadEncrypt(JSON.stringify(item), mod._ValuePublicKey));

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

		mod._ValuePairStatus = inputData.LBXResponseHash === (OLSK_TESTING_BEHAVIOUR() ? 'LBX_TESTING_RESPONSE_HASH' : mod._ValuePairPayloadHash) ? 'kStatusSuccess' : 'kStatusFailed';

		if (mod._ValuePairStatus === 'kStatusFailed') {
			mod._ValueToolsPairStatusFailedError = inputData.LBXResponseError
		}
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

	// SETUP

	async SetupEverything () {
		mod.SetupStorageClient();

		mod.SetupRemoteStorage();

		mod.SetupStorageStatus();

		await mod.SetupStorageNotifications();

		await mod.SetupValuePipeModeEnabled();

		await mod.SetupValuePageRecipesEnabled();

		mod.SetupValuePublicKey();

		mod.SetupValueToolsPairIsVisible();
		
		await mod.SetupValueDocumentsAll();

		mod.SetupPageRecipes();

		mod.ReactDocuments(mod._ValueDocumentsAll);

		mod.ReactIsLoading(mod._ValueIsLoading = false);
	},

	SetupStorageClient() {
		const storageModule = LCH_Data.LCH_DataModule([
			Object.assign(LCHDocumentStorage.LCHDocumentStorageBuild, {
				OLSKChangeDelegate: {
					OLSKChangeDelegateCreate: mod.OLSKChangeDelegateCreateDocument,
					OLSKChangeDelegateUpdate: mod.OLSKChangeDelegateUpdateDocument,
					OLSKChangeDelegateDelete: mod.OLSKChangeDelegateDeleteDocument,
				},
			}),
			LCHSettingStorage.LCHSettingStorageBuild,
			]);
		
		mod._ValueStorageClient = new RemoteStorage({
			modules: [ storageModule ],
			OLSKPatchRemoteStorageAuthRedirectURI: OLSK_TESTING_BEHAVIOUR() ? undefined : window.location.origin + window.OLSKCanonicalFor('LCHComposeRoute'),
		});

		mod._ValueStorageClient.access.claim(storageModule.name, 'rw');

		mod._ValueStorageClient.caching.enable(`/${ storageModule.name }/`);
	},

	SetupRemoteStorage () {
		return
		mod._ValueStorageClient.setApiKeys(window.OLSKPublicConstants('LCHDropboxAppKey') ? {
			dropbox: window.atob(window.OLSKPublicConstants('LCHDropboxAppKey')),
			googledrive: window.atob(window.OLSKPublicConstants('LCHGoogleClientKey')),
		} : {});
	},

	SetupStorageStatus () {
		OLSKRemoteStorage.OLSKRemoteStorageStatus(mod._ValueStorageClient, function (inputData) {
			mod._ValueFooterStorageStatus = inputData;
		}, OLSKLocalized)
	},

	async SetupStorageNotifications () {
		mod._ValueStorageClient.on('not-connected', () => {
			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('not-connected', arguments);
			}
		});

		mod._ValueStorageClient.on('disconnected', () => {
			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('disconnected', arguments);
			}
		});

		mod._ValueStorageClient.on('connected', () => {
			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('connected', arguments);
			}
		});

		mod._ValueStorageClient.on('sync-done', () => {
			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('sync-done', arguments);
			}
		});

		let isOffline;

		mod._ValueStorageClient.on('network-offline', () => {
			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('network-offline', arguments);
			}

			isOffline = true;
		});

		mod._ValueStorageClient.on('network-online', () => {
			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('network-online', arguments);
			}
			
			isOffline = false;
		});

		mod._ValueStorageClient.on('error', (error) => {
			if (isOffline && inputData.message === 'Sync failed: Network request failed.') {
				return;
			};

			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('error', error);
			}
		});

		return new Promise(function (res, rej) {
			mod._ValueStorageClient.on('ready', () => {
				if (!OLSK_TESTING_BEHAVIOUR()) {
					console.debug('ready', arguments);
				}

				res();
			});
		})
	},

	async SetupValuePipeModeEnabled() {
		mod._ValuePipeModeEnabled = (await LCHSettingAction.LCHSettingsActionProperty(mod._ValueStorageClient, 'kLCHComposePreferenceModePipeEnabled')) === 'true';
	},

	async SetupValuePageRecipesEnabled() {
		mod._ValuePageRecipesEnabled = (await LCHSettingAction.LCHSettingsActionProperty(mod._ValueStorageClient, 'kLCHComposePreferenceIncludePageRecipes')) === 'true';
	},

	SetupValuePublicKey() {
		mod.ValuePublicKeySet(JSON.parse(localStorage.getItem('kLCHComposePreferencePublicKey') || 'null'));
	},

	SetupValueToolsPairIsVisible() {
		if (OLSK_TESTING_BEHAVIOUR()) {
			mod._ValueToolsPairIsVisible = TestLCHComposeToolsPairIsVisible;
		}
	},

	async SetupValueDocumentsAll() {
		mod.ValueDocumentsAll((await LCHDocumentAction.LCHDocumentActionList(mod._ValueStorageClient)).filter(function (e) {
			return typeof e === 'object'; // #patch-remotestorage-true
		}));
	},

	SetupPageRecipes() {
		if (!OLSK_TESTING_BEHAVIOUR()) {
			return;
		}

		window.LCHPageRecipes = [{
			LCHRecipeName: 'LCH_TEST_PAGE_RECIPES',
			LCHRecipeCallback () {},
		}];
	},

	// LIFECYCLE

	LifecycleModuleWillMount() {
		mod.SetupEverything();
	},

};

import { onMount } from 'svelte';
onMount(mod.LifecycleModuleWillMount);

window.addEventListener('message', mod.MessageReceived, false);

import OLSKViewportContent from 'OLSKViewportContent';
import LCHComposeMaster from './submodules/LCHComposeMaster/main.svelte';
import LCHComposeDetail from './submodules/LCHComposeDetail/main.svelte';
import LCHComposeBuild from './submodules/LCHComposeBuild/main.svelte';
import LCHComposePair from './submodules/LCHComposePair/main.svelte';
import OLSKAppToolbar from 'OLSKAppToolbar';
import OLSKServiceWorker from '../_shared/__external/OLSKServiceWorker/main.svelte';
import OLSKStorageWidget from 'OLSKStorageWidget';
</script>
<svelte:window on:keydown={ mod.InterfaceWindowDidKeydown } />

<div class="LCHCompose OLSKViewport" class:OLSKIsLoading={ mod._ValueIsLoading }>

<OLSKViewportContent>
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
</OLSKViewportContent>

<footer class="LCHComposeViewportFooter OLSKMobileViewFooter">

	<footer class="LCHComposeTools OLSKToolbar OLSKToolbarJustify">
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
		<div class="LCHComposeStorageToolbar OLSKToolbar OLSKToolbarJustify OLSKStorageToolbar">
			<div class="OLSKToolbarElementGroup">
				<div></div>
			</div>

			<div class="OLSKToolbarElementGroup">
				<OLSKStorageWidget StorageClient={ mod._ValueStorageClient } />
			</div>
		</div>
	{/if}

	<OLSKAppToolbar
		OLSKAppToolbarGuideURL={ window.OLSKCanonicalFor('LCHGuideRoute') }
		OLSKAppToolbarDonateURL={ window.OLSKPublicConstants('LCH_SHARED_DONATE_URL') }
		OLSKAppToolbarStorageStatus={ mod._ValueFooterStorageStatus }
		OLSKAppToolbarDispatchStorage={ mod.OLSKAppToolbarDispatchStorage }
		_OLSKAppToolbarDispatchExport={ mod._OLSKAppToolbarDispatchExport }
		_OLSKAppToolbarDispatchImport={ mod._OLSKAppToolbarDispatchImport }
		OLSKAppToolbarDispatchLauncher={ mod.OLSKAppToolbarDispatchLauncher }
		/>

</footer>

</div>

{#if !OLSK_TESTING_BEHAVIOUR()}
	<OLSKServiceWorker OLSKServiceWorkerRegistrationRoute={ window.OLSKCanonicalFor('LCHServiceWorkerRoute') } />
{/if}

<style src="./ui-style.css"></style>

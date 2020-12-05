import OLSKRemoteStorage from 'OLSKRemoteStorage';

const mod = {

	LCH_DataModuleName () {
		return 'launchlet';
	},

	LCH_DataModule (inputData, options) {
		return OLSKRemoteStorage.OLSKRemoteStorageDataModuleGenerator(mod.LCH_DataModuleName(), options)(inputData);
	},

};

export default mod;

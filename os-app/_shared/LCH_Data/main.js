import OLSKRemoteStorage from 'OLSKRemoteStorage';

const mod = {

	LCH_DataModule (inputData, options) {
		return OLSKRemoteStorage.OLSKRemoteStorageDataModuleGenerator('launchlet', options)(inputData);
	},

};

export default mod;

import * as OLSKRemoteStoragePackage from 'OLSKRemoteStorage';
const OLSKRemoteStorage = OLSKRemoteStoragePackage.default || OLSKRemoteStoragePackage;

const kModuleName = 'launchlet';

const mod = {

	LCH_DataModule (inputData) {
		return {
			name: kModuleName,
			builder (privateClient, publicClient) {
				privateClient.cache(`${ kModuleName }/`);

				return {
					exports: inputData.reduce(function (coll, item) {
						let storage = item(privateClient, publicClient, item.LCHStorageChangeDelegate);

						privateClient.declareType(storage.LCHStorageType, OLSKRemoteStorage.OLSKRemoteStorageJSONSchema(storage.LCHStorageModelErrors));

						coll[storage.LCHStorageCollection] = storage.LCHStorageExports;

						return coll;
					}, {}),
				};
			},
		};
	},

};

export default mod;

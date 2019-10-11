const mod = {

	LCHSharedDonateLinkGuard (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('LCHErrorInputNotValid');
		}

		if (!(inputData.LCH_SHARED_DONATE_URL || '').trim()) {
			return new Error('LCH_SHARED_DONATE_URL not defined');
		}
	},

	LCHSharedGitHubLinkGuard (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('LCHErrorInputNotValid');
		}

		if (!(inputData.LCH_SHARED_GITHUB_URL || '').trim()) {
			return new Error('LCH_SHARED_GITHUB_URL not defined');
		}
	},

	LCHSharedPackageDocsLinkGuard (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('LCHErrorInputNotValid');
		}

		if (!(inputData.LCH_SHARED_PACKAGE_DOCS_URL || '').trim()) {
			return new Error('LCH_SHARED_PACKAGE_DOCS_URL not defined');
		}
	},

	LCHSharedExtensionDocsLinkGuard (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('LCHErrorInputNotValid');
		}

		if (!(inputData.LCH_SHARED_EXTENSION_DOCS_URL || '').trim()) {
			return new Error('LCH_SHARED_EXTENSION_DOCS_URL not defined');
		}
	},

};

Object.assign(exports, mod)

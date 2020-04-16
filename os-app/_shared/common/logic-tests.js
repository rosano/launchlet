const { throws, deepEqual } = require('assert');

const mainModule = require('./logic.js');

describe('LCHSharedGitHubLinkGuard', function test_LCHSharedGitHubLinkGuard() {

	const StubEnvValid = function () {
		return {
			LCH_SHARED_GITHUB_URL: 'alfa',
		};
	};

	it('throws if not object', function() {
		throws(function() {
			mainModule.LCHSharedGitHubLinkGuard(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns error if no LCH_SHARED_GITHUB_URL', function () {
		deepEqual(mainModule.LCHSharedGitHubLinkGuard(Object.assign(StubEnvValid(), {
			LCH_SHARED_GITHUB_URL: null,
		})), new Error('LCH_SHARED_GITHUB_URL not defined'));
	});

	it('returns error if LCH_SHARED_GITHUB_URL blank', function () {
		deepEqual(mainModule.LCHSharedGitHubLinkGuard(Object.assign(StubEnvValid(), {
			LCH_SHARED_GITHUB_URL: ' ',
		})), new Error('LCH_SHARED_GITHUB_URL not defined'));
	});

});

describe('LCHSharedExtensionDocsLinkGuard', function test_LCHSharedExtensionDocsLinkGuard() {

	const StubEnvValid = function () {
		return {
			LCH_SHARED_EXTENSION_DOCS_URL: 'alfa',
		};
	};

	it('throws if not object', function() {
		throws(function() {
			mainModule.LCHSharedExtensionDocsLinkGuard(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns error if no LCH_SHARED_EXTENSION_DOCS_URL', function () {
		deepEqual(mainModule.LCHSharedExtensionDocsLinkGuard(Object.assign(StubEnvValid(), {
			LCH_SHARED_EXTENSION_DOCS_URL: null,
		})), new Error('LCH_SHARED_EXTENSION_DOCS_URL not defined'));
	});

	it('returns error if LCH_SHARED_EXTENSION_DOCS_URL blank', function () {
		deepEqual(mainModule.LCHSharedExtensionDocsLinkGuard(Object.assign(StubEnvValid(), {
			LCH_SHARED_EXTENSION_DOCS_URL: ' ',
		})), new Error('LCH_SHARED_EXTENSION_DOCS_URL not defined'));
	});

});

describe('LCHSharedPackageDocsLinkGuard', function test_LCHSharedPackageDocsLinkGuard() {

	const StubEnvValid = function () {
		return {
			LCH_SHARED_PACKAGE_DOCS_URL: 'alfa',
		};
	};

	it('throws if not object', function() {
		throws(function() {
			mainModule.LCHSharedPackageDocsLinkGuard(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns error if no LCH_SHARED_PACKAGE_DOCS_URL', function () {
		deepEqual(mainModule.LCHSharedPackageDocsLinkGuard(Object.assign(StubEnvValid(), {
			LCH_SHARED_PACKAGE_DOCS_URL: null,
		})), new Error('LCH_SHARED_PACKAGE_DOCS_URL not defined'));
	});

	it('returns error if LCH_SHARED_PACKAGE_DOCS_URL blank', function () {
		deepEqual(mainModule.LCHSharedPackageDocsLinkGuard(Object.assign(StubEnvValid(), {
			LCH_SHARED_PACKAGE_DOCS_URL: ' ',
		})), new Error('LCH_SHARED_PACKAGE_DOCS_URL not defined'));
	});

});

describe('LCHSharedDonateLinkGuard', function test_LCHSharedDonateLinkGuard() {

	const StubEnvValid = function () {
		return {
			LCH_SHARED_DONATE_URL: 'alfa',
		};
	};

	it('throws if not object', function() {
		throws(function() {
			mainModule.LCHSharedDonateLinkGuard(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns error if no LCH_SHARED_DONATE_URL', function () {
		deepEqual(mainModule.LCHSharedDonateLinkGuard(Object.assign(StubEnvValid(), {
			LCH_SHARED_DONATE_URL: null,
		})), new Error('LCH_SHARED_DONATE_URL not defined'));
	});

	it('returns error if LCH_SHARED_DONATE_URL blank', function () {
		deepEqual(mainModule.LCHSharedDonateLinkGuard(Object.assign(StubEnvValid(), {
			LCH_SHARED_DONATE_URL: ' ',
		})), new Error('LCH_SHARED_DONATE_URL not defined'));
	});

});

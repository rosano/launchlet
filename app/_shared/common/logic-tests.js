import { throws, deepEqual } from 'assert';

import * as mainModule from './logic.js';

describe('LCHSharedGithubLinkGuard', function testLCHSharedGithubLinkGuard() {

	const StubEnvValid = function () {
		return {
			LCH_SHARED_GITHUB_URL: 'alfa',
		};
	};

	it('throws if not object', function() {
		throws(function() {
			mainModule.LCHSharedGithubLinkGuard(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns error if no LCH_SHARED_GITHUB_URL', function () {
		deepEqual(mainModule.LCHSharedGithubLinkGuard(Object.assign(StubEnvValid(), {
			LCH_SHARED_GITHUB_URL: null,
		})), new Error('LCH_SHARED_GITHUB_URL not defined'));
	});

	it('returns error if LCH_SHARED_GITHUB_URL blank', function () {
		deepEqual(mainModule.LCHSharedGithubLinkGuard(Object.assign(StubEnvValid(), {
			LCH_SHARED_GITHUB_URL: ' ',
		})), new Error('LCH_SHARED_GITHUB_URL not defined'));
	});

});

describe('LCHSharedExtensionDocsLinkGuard', function testLCHSharedExtensionDocsLinkGuard() {

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

describe('LCHSharedPackageDocsLinkGuard', function testLCHSharedPackageDocsLinkGuard() {

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

describe('LCHSharedDonateLinkGuard', function testLCHSharedDonateLinkGuard() {

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

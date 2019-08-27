//# OLSKPrepublishCopyPackage

(function OLSKPrepublishCopyPackage() {
	const globPackage = require('glob');
	const fsPackage = require('fs');
	const pathPackage = require('path');

	let sourceDir = pathPackage.join(__dirname, '../__compiled');
	return globPackage.sync('launchlet*', {
		matchBase: true,
		cwd: sourceDir,
	}).forEach(function(e) {
		fsPackage.copyFileSync(pathPackage.join(sourceDir, e), pathPackage.join(__dirname, e));
	});
})();

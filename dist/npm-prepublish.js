//# OLSKBuildDistribution

(function OLSKBuildDistribution() {
	const globPackage = require('glob');
	const fsPackage = require('fs');
	const pathPackage = require('path');

	let sourceDir = pathPackage.join(__dirname, '../os-app/dev-package/_compiled/dist');
	return globPackage.sync('launchlet*', {
		matchBase: true,
		cwd: sourceDir,
	}).forEach(function(e) {
		fsPackage.copyFileSync(pathPackage.join(sourceDir, e), pathPackage.join(__dirname, e));
	});
})();

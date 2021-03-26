exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/compose',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'LCHComposeRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'ui-view.ejs'), {
				LCHComposeBuildPackageStyle: require('fs').readFileSync(require('path').join(__dirname, '../dev-package/__compiled/launchlet.css'), 'utf8'),
				LCHComposeBuildPackageScript: require('fs').readFileSync(require('path').join(__dirname, '../dev-package/__compiled/launchlet.js'), 'utf8'),
			});
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
		_OLSKRouteSkipLanguageRedirect: true,
	}];
};

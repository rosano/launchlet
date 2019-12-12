exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/compose',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'LCHComposeRoute',
		OLSKRouteFunction (req, res, next) {
			return res.render(require('path').join(__dirname, 'ui-view'), {
				LCHComposeBuildPackageStyle: require('fs').readFileSync(require('path').join(__dirname, '../dev-package/__compiled/launchlet.css'), 'utf8'),
				LCHComposeBuildPackageScript: require('fs').readFileSync(require('path').join(__dirname, '../dev-package/__compiled/launchlet.js'), 'utf8'),
				LCHDropboxAppKey: Buffer.from(process.env.LCH_DROPBOX_APP_KEY).toString('base64'),
				LCHGoogleClientKey: Buffer.from(process.env.LCH_GOOGLE_CLIENT_KEY).toString('base64'),
			});
		},
		OLSKRouteLanguages: ['en', 'fr', 'es'],
		OLSKRouteMiddlewares: [
			'LCHSharedDonateLinkGuardMiddleware',
		],
	}];
};

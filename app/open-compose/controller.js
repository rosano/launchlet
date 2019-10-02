exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/compose',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'LCHComposeRoute',
		OLSKRouteFunction: function (req, res, next) {
			return res.render(require('path').join(__dirname, 'ui-view'), {
				LCHComposeLauncherStyle: require('fs').readFileSync(require('path').join(__dirname, '../dev-launcher/__compiled/ui-style.css'), 'utf8'),
				LCHComposeLauncherBehaviour: require('fs').readFileSync(require('path').join(__dirname, '../dev-launcher/__compiled/ui-behaviour.js'), 'utf8'),
				LCHComposeBuildPackageScript: require('fs').readFileSync(require('path').join(__dirname, '../dev-package/__compiled/launchlet.js'), 'utf8'),
				LCHComposeBuildPackageStyle: require('fs').readFileSync(require('path').join(__dirname, '../dev-package/__compiled/launchlet.css'), 'utf8'),
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

exports.OLSKControllerUseLivereload = function() {
	return process.env.NODE_ENV === 'development';
};

exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/guide',
		OLKSRouteSignature: 'LCHGuideRoute',
		OLSKRouteMethod: 'get',
		OLSKRouteFunction: function (req, res, next) {
			return res.render(require('path').join(__dirname, 'ui-view'), {
				LCHGuideContent: require('OLSKString').OLSKStringReplaceTokens(require('marked')(require('fs').readFileSync(require('path').join(__dirname, `body.${ res.locals.OLSKSharedPageCurrentLanguage }.md`), 'utf-8')), {
				}),
				OLSKStringReplaceTokens: require('OLSKString').OLSKStringReplaceTokens,
			});
		},
	}];
};

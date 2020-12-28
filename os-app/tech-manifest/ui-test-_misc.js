const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHManifest_Misc', function () {

	it('sends json', async function () {
		browser.assert.deepEqual(await (await browser.fetch('http://loc.tests' + kDefaultRoute.OLSKRoutePath)).json(), {
			name: 'Launchlet',
			short_name: 'Launchlet',
			start_url: require('../open-compose/controller.js').OLSKControllerRoutes().shift().OLSKRoutePath,
			display: 'standalone',
			background_color: 'white',
			theme_color: 'white',
			icons: [{
				src: process.env.OLSK_LAYOUT_TOUCH_ICON_URL,
				sizes: '600x600',
				type: 'image/png',
				purpose: 'any maskable',
			}],
		});
	});

});

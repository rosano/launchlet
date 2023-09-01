export default require('OLSKRollupScaffold').OLSKRollupScaffoldScanStart(__dirname, {
	OLSKRollupPluginSwapTokens: Object.assign(require('OLSKUIAssets').OLSKUIAssetsSwapTokens(), {
		OLSK_APROPOS_FEEDBACK_EMAIL_SWAP_TOKEN: Buffer.from(`mailto:${ process.env.OLSK_APROPOS_FEEDBACK_EMAIL }`).toString('base64'),

		OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE_SWAP_TOKEN: process.env.OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE,
		OLSK_CRYPTO_PAIR_SENDER_PUBLIC_SWAP_TOKEN: process.env.OLSK_CRYPTO_PAIR_SENDER_PUBLIC,

		ROCO_SHARED_PROJECT_ID_SWAP_TOKEN: process.env.ROCO_SHARED_PROJECT_ID,
	}),
});

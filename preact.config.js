require('dotenv').config();
const path = require('path');

/**
 * Function that mutates original webpack config.
 * Supports asynchronous changes when promise is returned.
 *
 * @param {object} config - original webpack config.
 * @param {object} env - options passed to CLI.
 * @param {WebpackConfigHelpers} helpers - object with useful helpers when working with config.
 **/
export default function (config, env, helpers) {
	// Basepath of lime-app in the router: http://thisnode.info/app/
	config.output.publicPath = process.env.WEB_PATH || '';
	// This hack let us use less-modules at plugins/containers directories too
	const loaderRules = helpers.getLoadersByName(config, 'style-loader');
	loaderRules.forEach(({ rule }) => {
		if (rule.include) {
			rule.include.push(path.resolve(__dirname, 'plugins'));
			rule.include.push(path.resolve(__dirname, 'src/containers'));
		}
		if (rule.exclude) {
			rule.exclude.push(path.resolve(__dirname, 'plugins'));
			rule.exclude.push(path.resolve(__dirname, 'src/containers'));
		}
	});
}

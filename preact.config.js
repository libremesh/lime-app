require('dotenv').config();
let path = require('path');

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
	const { source } = env;
	const loaderRules = helpers.getLoadersByName(config, 'css-loader');
	loaderRules.forEach(({ rule }) => {
		if (rule.include) {
			rule.include.push(source('../plugins'));
			rule.include.push(source('containers'));
		}
		if (rule.exclude) {
			rule.exclude.push(source('../plugins'));
			rule.exclude.push(source('containers'));
		}
	});
	// Add common imports aliases
	config.resolve.alias.components = path.resolve(__dirname, 'src/components');
	config.resolve.alias.utils = path.resolve(__dirname, 'src/utils');
}

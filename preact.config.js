const path = require('path');

require('dotenv').config();

/**
 * Function that mutates the original webpack config.
 * Supports asynchronous changes when a promise is returned (or it's an async function).
 *
 * @param {import('preact-cli').Config} config - original webpack config
 * @param {import('preact-cli').Env} env - current environment and options pass to the CLI
 * @param {import('preact-cli').Helpers} helpers - object with useful helpers for working with the webpack config
 * @param {Record<string, unknown>} options - this is mainly relevant for plugins (will always be empty in the config), default to an empty object
 */
 export default (config, env, helpers, options) => {

	// Basepath of lime-app in the router: http://thisnode.info/app/
	// This hack let us use less-modules at plugins/containers directories too
	const { source, isProd } = env;
	config.output.publicPath = isProd ? '/app/' : '';

	const host = process.env.NODE_HOST || '10.13.0.1';
	config.devServer = {
		...config.devServer,
		proxy: [
			{
				path: '/ubus',
				target: `http://${host}/`,
				secure: false,
			},
			{
				path: '/cgi-bin/**',
				target: `http://${host}/`,
				secure: false,
			}
		]
	}

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
	config.resolve.alias = {
		...config.resolve.alias,
			plugins : path.resolve(__dirname, "plugins"),
		'~': path.resolve(__dirname, "src"),
		components : path.resolve(__dirname, "src/components"),
		containers : path.resolve(__dirname, "src/containers"),
		utils : path.resolve(__dirname, "src/utils"),
	}

	return config;
}

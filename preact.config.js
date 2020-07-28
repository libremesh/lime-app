require('dotenv').config();

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
	// Fix a preact-cli issue where LESS loader is passed an Array<Array<String>>
	// when it expects an Array<String>
	// This allows to import less file from another less file;
	const lessRules = helpers.getRulesByMatchingFile(config, '.less');
	lessRules[0].rule.use[0].options.options.paths = lessRules[0].rule.use[0].options.options.paths[0];
}

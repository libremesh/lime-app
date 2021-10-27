const { resolve } = require('path');
const clientConfig = require('preact-cli/lib/lib/webpack/webpack-client-config');
const transformConfig = require('preact-cli/lib/lib/webpack/transform-config');
const webpack = require('webpack');

module.exports = {
	stories: ['../stories/**/*stories.js', '../plugins/**/*stories.js', 'containers/**/*stories.js'],
	addons: ['@storybook/addon-actions', '@storybook/addon-knobs', '@storybook/addon-essentials'],
	webpackFinal: async(config, {configType}) => {
		const isProd = configType === 'PRODUCTION';
		const cwd = process.env.PWD;
		const src =  resolve(cwd, 'src');
		const source = (dir) => resolve(cwd, 'src', dir);
		const env = { isProd, isWatch: !isProd, cwd, src, source, config: 'preact.config.js', esm:false };
		preactConfig = await clientConfig(env);
		await transformConfig(env, preactConfig);
		if (isProd) {
			preactConfig.plugins.splice(12, 2);
		} else {
			preactConfig.plugins.splice(8, 2);
		}
		return {...preactConfig, entry: config.entry, output: config.output, plugins: [...preactConfig.plugins, ...config.plugins]};
	}
}

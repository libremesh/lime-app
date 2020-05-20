const preactPreset = require('jest-preset-preact')
module.exports = {
    preset: 'jest-preset-preact',
	testMatch: [...preactPreset.testMatch,
		'<rootDir>/plugins/**/__tests__/**/*.{mjs,js,jsx,ts,tsx}',
		'<rootDir>/{plugins, src,test,tests}/**/*.{spec,test}.{mjs,js,jsx,ts,tsx}',
	],
}

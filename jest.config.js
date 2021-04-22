const preactPreset = require('jest-preset-preact');

module.exports = {
	preset: 'jest-preset-preact',
	testMatch: [...preactPreset.testMatch,
		'<rootDir>/plugins/**/__tests__/**/*.{mjs,js,jsx,ts,tsx}',
		'<rootDir>/{plugins, src,test,tests}/**/*.{spec,test}.{mjs,js,jsx,ts,tsx}'
	],
	setupFilesAfterEnv: ['jest-extended'],
	moduleNameMapper: {
		...preactPreset.moduleNameMapper,
		'^components/(.*)$': '<rootDir>/src/components/$1',
		'^utils/(.*)$': '<rootDir>/src/utils/$1',
		'^plugins/(.*)$': '<rootDir>/plugins/$1'
	}
};

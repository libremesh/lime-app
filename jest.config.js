const preactPreset = require("jest-preset-preact");

/** @returns {Promise<import('jest').Config>} */
module.exports = {
    preset: "jest-preset-preact",
    testMatch: [
        "<rootDir>/plugins/**/__tests__/**/*.{mjs,js,jsx,ts,tsx}",
        "<rootDir>/{plugins, src,test,tests}/**/*.{spec,test}.{mjs,js,jsx,ts,tsx}",
    ],
    setupFilesAfterEnv: ["jest-extended/all"],
    setupFiles: ["core-js", "jest-localstorage-mock"],
    moduleNameMapper: {
        ...preactPreset.moduleNameMapper,
        "^components/(.*)$": "<rootDir>/src/components/$1",
        "^utils/(.*)$": "<rootDir>/src/utils/$1",
        "^containers/(.*)$": "<rootDir>/src/containers/$1",
        "^plugins/(.*)$": "<rootDir>/plugins/$1",
        "^i18n/(.*)$": "<rootDir>/i18n/$1",
    },
    transform: {
        "^.+\\.[tj]sx?$": "babel-jest",
    },
    clearMocks: true,
};

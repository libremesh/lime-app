/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
    locales: ["es", "pt", "en", "it"],
    catalogs: [
        {
            path: "i18n/{locale}/messages",
            include: ["src", "plugins"],
        },
    ],
    format: "po",
    compileNamespace: "cjs",
    extractBabelOptions: {
        presets: [
            "preact",
            "@babel/preset-typescript",
            "@lingui/babel-preset-react",
        ],
    },
    sourceLocale: "en",
    fallbackLocales: {
        default: "en",
    },
};

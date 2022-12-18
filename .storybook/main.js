const path = require("path");
const clientConfig = require("preact-cli/lib/lib/webpack/webpack-client-config");
const transformConfig = require("preact-cli/lib/lib/webpack/transform-config");

module.exports = {
    framework: "@storybook/preact",
    stories: [
        "../stories/**/*stories.js",
        "../stories/**/*stories.ts",
        "../plugins/**/*stories.js",
        "../plugins/**/*stories.ts",
    ],
    addons: [
        "@storybook/addon-actions",
        "@storybook/addon-controls",
        "@storybook/addon-essentials",
    ],
    features: {
        interactionsDebugger: true,
    },
    webpackFinal: async (config, { configType }) => {
        // Load preact config
        const isProd = configType === "PRODUCTION";
        const cwd = process.env.PWD;
        const src = path.resolve(cwd, "src");
        const source = (dir) => path.resolve(cwd, "src", dir);
        const env = {
            isProd,
            isWatch: !isProd,
            cwd,
            src,
            source,
            config: "preact.config.js",
            esm: false,
        };
        preactConfig = await clientConfig(env);
        await transformConfig(env, preactConfig);

        // Add custom alias
        config.resolve.alias = {
            ...config.resolve.alias,
            ...preactConfig.resolve.alias,
        };

        // Add proxy
        config.devServer = {
            ...config.devServer,
            ...preactConfig.devServer,
        };

        // Parse .less files
        config.resolve.extensions.push(".less");
        config.module.rules.push({
            test: /\.(p?css|less|s[ac]ss|styl)$/,
            use: [
                require.resolve("style-loader"),
                {
                    loader: require.resolve("css-loader"),
                    options: {
                        importLoaders: 1,
                        modules: {
                            localIdentName: "[name]__[local]___[hash:base64:5]",
                        },
                    },
                },
                require.resolve("less-loader"),
            ],
        });

        return config;
    },
    babel: async (options) => {
        options.plugins.slice(-1);
        options.plugins = [
            ...options.plugins,
            ["@babel/plugin-transform-react-jsx", { pragma: "h" }],
            [
                "babel-plugin-jsx-pragmatic",
                {
                    module: "preact",
                    import: "h",
                    export: "h",
                },
            ],
        ];

        return options;
    },
};

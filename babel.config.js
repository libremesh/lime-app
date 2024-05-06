module.exports = {
    presets: [
        "@babel/preset-env",
        "@babel/preset-typescript",
        "@lingui/babel-preset-react",
        "preact",
    ],
    plugins: [
        "macros",
        ["@babel/plugin-transform-react-jsx", { pragma: "h" }],
        [
            "babel-plugin-jsx-pragmatic",
            {
                module: "preact",
                import: "h",
                export: "h",
            },
        ],
    ],
};

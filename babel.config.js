module.exports = {
    presets: [["@babel/preset-env"]],
    plugins: [
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

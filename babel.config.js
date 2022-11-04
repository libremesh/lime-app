module.exports = {
    presets: ["@babel/preset-env", "preact"],
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

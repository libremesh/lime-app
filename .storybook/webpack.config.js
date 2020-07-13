const path = require("path")

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.less$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          modules: true,
        },
      },
      {
        loader: 'less-loader',
        options: {
          modules: true,
        },
      },
    ],
  });

  config.resolve.extensions.push(".js", ".css", ".less");

  return config;
};

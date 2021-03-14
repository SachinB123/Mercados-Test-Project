const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./backend-asset/sales_data_ABC.csv", to: "./functions/" }
      ],
    }),
  ],
};
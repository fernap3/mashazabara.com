const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const common = require("./webpack.common");

const publicPath = "";

module.exports = merge(common, {
	mode: "development",
	devtool: "inline-source-map",
	output: {
		publicPath: publicPath
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./index.html",
			inject: "body",
			filename: "index.html",
			chunks: ["site"],
			publicPath: publicPath
		})
	]
});
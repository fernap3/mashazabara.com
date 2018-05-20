const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: {
		"site": "./main.js"
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [{
						loader: "css-loader",
						options: {
							minimize: true
						}
					}]
				})
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "images/[name].[ext]"
						}
					}
				]
			},
			{
				test: /\.(woff|woff2)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "fonts/[name].[ext]"
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js' ]
	},
	output: {
		filename: "bundle.js",
		//publicPath: "/static/",
		path: path.resolve(__dirname, "./dist/")
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./index.html",
			inject: "body",
			filename: "index.html",
			chunks: ["site"]
		}),
		new ExtractTextPlugin({
			filename: "styles.css"
		}),
		// Ignore all locale files of moment.js
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
	]
};
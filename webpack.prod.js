const HtmlWebpackPlugin = require("html-webpack-plugin");
const S3Plugin = require('webpack-s3-plugin')
const merge = require("webpack-merge");
const common = require("./webpack.common");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const fs = require("fs");

const distId = guid();
const publicPath = `https://di5gge6vcvthd.cloudfront.net/${distId}/`;

module.exports = merge(common, {
	devtool: "none",
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
		}),
		new S3Plugin({
			//exclude: /.*\.html$/,
			//include: /.*\.html$/,
			s3Options: {
				accessKeyId: process.env.AWS_ACCESS_KEY_ID,
				secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
			},
			s3UploadOptions: {
				Bucket: 'mashazabara.com',
				CacheControl: "max-age=31556926",
				ContentLength(fileName) {
					const stats = fs.statSync(path.join("dist", fileName));
					return stats["size"] + "";
				}
			},
			basePathTransform: () => (`static-web/${distId}`)
		})
	]
});

function guid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	  var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	  return v.toString(16);
	});
  }
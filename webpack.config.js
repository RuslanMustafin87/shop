const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJS = require('./webpack/terserJS');
const babel = require('./webpack/babel');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pug = require('./webpack/pug');
const css = require('./webpack/css');
const image = require('./webpack/image');
const extractCSS = require('./webpack/extractCSS');
const devServer = require('./webpack/devServer');
const devtool = require('./webpack/devtool');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const RuntimeAnalyzerPlugin = require('webpack-runtime-analyzer');

const PATHS = {
	source: path.join(__dirname, 'src'),
	build: path.join(__dirname, 'dist/assets')
};

const common = merge([
	{
		entry: {
			'index': PATHS.source + '/pages/index/index.js',
			'basket': PATHS.source + '/pages/basket/basket.js',
			'product': PATHS.source + '/pages/product/product.js',
			'admin': PATHS.source + '/pages/admin/admin.js',
		},
		output: {
			path: PATHS.build,
			filename: './js/[name].js'
		},
		optimization: {
			runtimeChunk: false,
			splitChunks: {
				cacheGroups: {
					default: false,
					commons: {
						test: /\.(js|css|scss)$/,
						chunks: 'all',
						minChunks: 2,
						name: 'common',
						enforce: true,
					},
				},
			},
		},
		plugins: [
			new HtmlWebpackPlugin({
				filename: 'index.html',
				chunks: ['index',
					'common'],
				template: PATHS.source + '/pages/index/index.pug'
			}),
			new HtmlWebpackPlugin({
				filename: 'basket.html',
				chunks: ['basket',
					'common'],
				template: PATHS.source + '/pages/basket/basket.pug'
			}),
			new HtmlWebpackPlugin({
				filename: 'product.html',
				chunks: ['product',
					'common'],
				template: PATHS.source + '/pages/product/product.pug'
			}),
			new HtmlWebpackPlugin({
				filename: 'admin.html',
				chunks: ['admin',
					'common'],
				template: PATHS.source + '/pages/admin/admin.pug'
			}),
			new FriendlyErrorsWebpackPlugin(),
			// new MiniCssExtractPlugin({
			// filename: '[name].css',
			// }),
			new CleanWebpackPlugin(),
			// new RuntimeAnalyzerPlugin()
		],
	},
	// lintJS(PATHS.source),
	babel(),
	pug(),
	image()
]);

module.exports = function(env, argv) {
	if (argv.mode === 'production') {
		return merge([
			common,
			extractCSS(),
			TerserJS()
		]);
	}
	if (argv.mode === 'development') {
		return merge([
			common,
			css(),
			devServer(),
			devtool()
		]);
	}
};
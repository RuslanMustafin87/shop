const path = require('path');
const webpack = require('webpack');
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJS = require('./webpack/terserJS');
const babel = require('./webpack/babel');
const {
	merge
} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pug = require('./webpack/pug');
const css = require('./webpack/css');
const image = require('./webpack/image');
const font = require('./webpack/font');
const favicon = require('./webpack/favicon');
const extractCSS = require('./webpack/extractCSS');
const devServer = require('./webpack/devServer');
const devtool = require('./webpack/devtool');
const CopyPlugin = require('copy-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
// const RuntimeAnalyzerPlugin = require('webpack-runtime-analyzer');

const PATHS = {
	source: path.join(__dirname, 'src'),
	build: path.resolve(__dirname, 'dist')
};

const conf = merge([{
	entry: {
		'index': PATHS.source + '/pages/index/index.js',
		'basket': PATHS.source + '/pages/basket/basket.js',
		'product': PATHS.source + '/pages/product/product.js',
		'admin': PATHS.source + '/pages/admin/admin.js',
	},
	output: {
		path: PATHS.build,
		filename: 'js/[name].js',
		// publicPath: '/assets/',
		assetModuleFilename: 'assets/[name][ext]'
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
				'common'
			],
			template: PATHS.source + '/pages/index/index.pug',
			// favicon: './src/images/fav-furniture.png'
		}),
		new HtmlWebpackPlugin({
			filename: 'basket.html',
			chunks: ['basket',
				'common'
			],
			template: PATHS.source + '/pages/basket/basket.pug',
			// favicon: './src/images/fav-furniture.png'
		}),
		new HtmlWebpackPlugin({
			filename: 'product.html',
			chunks: ['product',
				'common'
			],
			template: PATHS.source + '/pages/product/product.pug',
			// favicon: './src/images/fav-furniture.png'
		}),
		new HtmlWebpackPlugin({
			filename: 'admin.html',
			chunks: ['admin',
				'common'
			],
			template: PATHS.source + '/pages/admin/admin.pug',
			// favicon: './src/images/fav-furniture.png'

		}),
		new CopyPlugin({
			patterns: [{
				from: PATHS.source + '/images/fav-furniture.png',
				to: PATHS.build + '/images/fav-furniture.png'
			}]
		}),
		new FriendlyErrorsWebpackPlugin(),
		new CleanWebpackPlugin(),
	],
},
// lintJS(PATHS.source),
babel(),
pug(),
image(),
font(),
// favicon()
]);

module.exports = function(env, argv) {
	if (argv.mode === 'production')
		return merge([
			conf,
			{
				output: {
					publicPath: '/assets/'
				}
			},
			extractCSS(),
			TerserJS()
		]);

	if (argv.mode === 'development')

		return merge([
			conf,
			css(),
			// devServer(),
			devtool(),
			{
				devServer: {
					historyApiFallback: true,
					static: {
						directory: path.join(__dirname, 'dist'),
					},
					open: true,
					compress: true,
					port: 8080,
					hot: true
				},
				plugins: [
					new webpack.HotModuleReplacementPlugin(),
				],
			}
		]);

	return merge([
		conf,
		extractCSS(),
		TerserJS()
	]);
};
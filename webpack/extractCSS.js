const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function(){
	return {
		module: {
			rules: [
				{
					test: /\.css$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
							// options: {
							// 	publicPath: '/assets/images/'
							// }
						},
						'css-loader',
						//'postcss-loader'
					]
				},
				{
					test: /\.scss$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
							// options: {
							// 	publicPath: '/assets/'
							// }
						},
						'css-loader',
						//'postcss-loader',
						'sass-loader'
					]
				}
			]
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'css/[name].css'
			})
		],
	};
};
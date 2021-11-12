module.exports = function(){
	return {
		module: {
			rules: [
				{
					test: /\.css$/,
					use: [
						'style-loader',
						'css-loader',
						// 'postcss-loader'
					]
				},
				{
					test: /\.scss$/,
					use: [
						'style-loader',
						'css-loader',
						// 'postcss-loader',
						'sass-loader'
					]
				}
			]
		},
	};
};
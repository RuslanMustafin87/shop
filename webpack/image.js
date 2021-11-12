module.exports = function() {
	return {
		module: {
			rules: [{
				test: /\.(jpe?g|png)$/,
				type: 'asset/resource',
				generator: {
					// filename: 'images/[hash][ext]'
					filename: 'images/[name][ext]'
				},
			},
			{
				test: /\.svg$/,
				type: 'asset/resource',
				generator: {
					filename: 'images/icons/[hash][ext]'
				},
				use: [{
					loader: 'svgo-loader',
					options: {
						plugins: [{
							name: 'cleanupIDs',
							active: false
						}]
					}
				}]
			}
			]
		}
	};
};
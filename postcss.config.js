module.exports = {
	plugins: [
		'autoprefixer',
		'cssnano',
		'css-mqpacker',
		'postcss-preset-env',
		// 'postcss-sprites',
		['postcss-font-magician',
			{
				variants: {
					'Roboto Condensed': {
						'300': [],
						'400': [],
						'700': []
					},
					foundries: ['google'],
					formats: 'woff2 woff',
					display: 'swap'
				},
			}
		]
	]
};

module.exports = {

    // Task options
    options: {
        limit: 3
    },

    // Dev tasks
    devFirst: [
        'clean',
        'jshint'
    ],
    devSecond: [
        'sass:dev',
        'uglify'
    ],

    // Production tasks
    /**prodFirst: [
        'clean',
        'jshint'
    ],
	**/
    prodSecond: [
		'clean',
        'cssmin',
        'uglify'
    ],

    // Image tasks
    imgFirst: [
        'responsive_images'	
    ],
	
	imgSecond: [
		'imagemin'	
    ]
};
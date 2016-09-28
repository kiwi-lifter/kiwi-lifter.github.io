module.exports = {
    all: {
		options: {
			optimizationLevel: 7
		},
        files: [{
            expand: true,
            cwd: 'views/src/images',
            src: ['*.{png,jpg,gif}'],
            dest: 'views/dist/images/min'
        }]
    }
};
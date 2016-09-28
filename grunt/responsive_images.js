module.exports = {
    dev: {
	  options: {
		engine: 'gm',
		sizes: [{
			suffix: '_large',
			width: 1025,
			quality: 50
			},
				{
			suffix: '_medium',
			width: 700,
			quality: 60,
			},
				{
			suffix: '_small',
			width: 320,
			quality: 80
			}]	
		},
		
      files: [{
        expand: true,
        src: ['*.{png,jpg,gif}'],
        cwd: 'views/src/images',
        dest: 'views/dist/images'
      }]
    }
  };
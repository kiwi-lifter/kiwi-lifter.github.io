module.exports = {
    all: {
        files: [{
            expand: true,
            cwd: 'views/src/css',
            src: '*.css',
            dest: 'views/dist/css',
            ext: '.min.css'
        }]
    }
};
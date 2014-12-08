'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jade: {
            compile: {
                files: {
                    "index.html": "src/templates/index.jade"
                }
            }
        },
        stylus: {
            compile: {
                files: {
                    'css/normalize.css': 'src/styles/normalize.styl',
                    'css/style.css': 'src/styles/style.styl'
                }
            }
        },
        coffee: {
            compile: {
                options: {
                    bare: true
                },
                files: {
                    'js/gauge.js': 'src/coffee/gauge.coffee',
                    'js/main.js': 'src/coffee/main.coffee'
                }
            }
        },
        connect: {
            server: {
                options: {
                    directory: '',
                    open: {
                        target   : 'index.html'
                    },
                    base     : 'app'
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('complieJade', ['jade:compile']);
    grunt.registerTask('compileCoffee', ['coffee:compile']);
    grunt.registerTask('compileStylus', ['stylus:compile']);
    grunt.registerTask('compileAll', ['jade:compile', 'stylus:compile', 'coffee:compile']);
    grunt.registerTask('compileAllAndRun', ['jade:compile', 'stylus:compile', 'coffee:compile', 'connect:server:keepalive']);

    grunt.registerTask('default', ['connect:server:keepalive']);
};
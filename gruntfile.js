var shell = require('shelljs'),
    harp = require('harp'),
    path = require('path');

module.exports = function(grunt) {

    // init ceremonies
    //
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            'www/x.js': ['lib/index.js']
        },

        topcoat: {
            options: {
                namespace: 'topcoat',
                theme: 'mobile',
                variation: 'light',
                platforms: ['desktop', 'mobile', 'web'],
                browsers: ['android'],
                controls: ['button', 'list']
            },

            firefoxOS: {
                files: {
                    dest: 'x.css'
                }
            }
        },

        watch: {
            files: ["lib/**/*.js", 'test/**/*.js'],
            tasks: ['browserify', 'test']
        },

        concurrent: {
            target: {
                tasks: ['serve', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');

    // custom business
    //
    grunt.registerTask('default', ['concurrent:target']);

    grunt.registerTask('test', 'Run the unit tests.', function() {
        shell.exec('npm test');
    });

    grunt.registerTask('serve', 'Serve www with Harp.', function() {
        var done = this.async();
        var projectPath = path.join(__dirname, 'www');
        harp.server(projectPath, [], function cb() {
            grunt.log.write("\nHarp server is now running at http://localhost:9966\n\n");
        });
    });
};

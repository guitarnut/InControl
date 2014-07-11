module.exports = function (grunt) {

    grunt.loadNpmTasks("grunt-contrib-jade");
    grunt.loadNpmTasks("grunt-contrib-stylus");
    grunt.loadNpmTasks("grunt-jslint");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    grunt.initConfig({

        stylus: {
            compile: {
                files: {
                    'app/development/css/global.css': 'app/css/global.styl'
                }
            }
        },
        jade: {
            compile: {
                files: [
                    {
                        expand: true,
                        src: "*.jade",
                        dest: 'app/development/',
                        cwd: 'app/views',
                        ext: '.html'
                    }
                ]
            }
        },
        jslint: {
            src: ['app/development/script/**/*.js']
        },
        uglify: {
            my_target: {
                files: {
                    'app/development/script/InControl.min.prod.js': 'app/development/script/InControl.min.js'
                }
            }
        },
        concat: {
            options: {
                separator: ' '
            },
            dist: {
                src: ['app/development/script/app/startup.js','app/development/script/control/**/*.js','app/development/script/game/**/*.js','app/development/script/screens/**/*.js','app/development/script/ui/**/*.js','app/development/script/util/**/*.js','app/development/script/app/InControl.js'],
                dest: 'app/development/script/InControl.min.js'
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/development/',
                        src: ['audio/*', 'css/*.css', 'data/*', 'img/*', 'script/**/*.min.prod.js', 'vendor/**/*.min.prod.js', '*.html'],
                        dest: 'app/production'
                    }
                ]
            }
        },
        watch: {
            css: {
                files: ['app/css/*.styl'],
                tasks: ['stylus'],
                options: {
                    spawn: false
                }
            },
            html: {
                files: ['app/views/*.jade'],
                tasks: ['jade'],
                options: {
                    spawn: false
                }
            },
            script: {
                files: ['app/development/script/**/*.js', '!app/development/script/InControl.min.js'],
                tasks: ['concat'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.registerTask("Compile CSS", "stylus");
    grunt.registerTask("Compile HTML", "jade");
    grunt.registerTask("Validate JS", "jslint");
    grunt.registerTask("Merge JS", "concat");
    grunt.registerTask("Compress JS/CSS", ["concat", "uglify"]);
    grunt.registerTask("Deploy", ["concat", "uglify", "copy"]);
    grunt.registerTask("Watch Compilers", "watch");
};
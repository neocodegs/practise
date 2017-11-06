module.exports = grunt => {
    const includePaths = require('rollup-plugin-includepaths');
    const babel = require('rollup-plugin-babel');

    const config = {
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: ['build/'],
            tmp: ['build/tmp/']
        },
        ngtemplates: {
            build: {
                files: {
                    '<%= files.html.out %>': ['<%= files.html.src %>']
                },
                options: {
                    url(url) {
                        return `ngTagsInput/${url.replace('templates/', '')}`;
                    },
                    bootstrap(module, script) {
                        script = script.replace(/'use strict';\n\n/g, '').replace(/\n\n\s*\n/g, '\n');
                        return `/*@ngInject*/\nexport default function TemplateCacheRegister($templateCache) {\n${script}}`;
                    },
                    htmlmin: {
                        collapseWhitespace: true,
                        removeRedundantAttributes: true
                    }
                }
            }
        },
        rollup: {
            options: {
                format: 'iife',
                globals: {
                    angular: 'angular'
                },
                indent: false,
                sourceMap: true, 
                plugins: [
                    includePaths({
                        paths: ['build/tmp']
                    }),
                    babel({
                        presets: [
                            ['es2015', { modules: false }]
                        ],
                        plugins: [
                            'external-helpers', ['angularjs-annotate', { explicitOnly: true }]
                        ]
                    }),
                ]
            },
            build: {
                files: {
                    '<%= files.js.out %>': ['<%= files.js.src %>']
                }
            }
        },
 
        files: {
            js: {
                src: 'src/init.js',
                out: 'build/<%= pkg.name %>.js'
            },
            css: {
                main: {
                    src: 'scss/main.scss',
                    out: 'build/<%= pkg.name %>.css'
                }
            },
            html: {
                src: 'templates/*.html',
                out: 'build/tmp/compiled-templates.js'
            }
        }
    }


    grunt.initConfig(config);
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['clean', 'ngtemplates', 'rollup']);
}
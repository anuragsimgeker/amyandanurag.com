'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(grunt) {
    grunt.initConfig({
        clean: ['build'],
        copy: {
            images: {
                files: [{
                    expand: true,
                    cwd: 'assets/',
                    src: ['images/**'],
                    dest: 'build/'
                }]
            }
        },
        concurrent: {
            dev: ['nodemon:app', 'webpack:dev'],
            options: {
                logConcurrentOutput: true
            }
        },
        jshint: {
            all: [
                '*.js',
                '{actions,configs,components,services,stores}/**/*.js'
            ],
            options: {
                jshintrc: true
            }
        },
        nodemon: {
            app: {
                script: './server.js',
                options: {
                    ignore: ['build/**'],
                    ext: 'js,jsx'
                }
            }
        },
        webpack: {
            dev: {
                resolve: {
                    extensions: ['', '.js', '.jsx']
                },
                entry: './client.js',
                output: {
                    path: './build/dist',
                    publicPath: '/public/dist/',
                    filename: '[name].js',
                    chunkFilename: '[id].js'
                },
                module: {
                    loaders: [{
                        test: /\.less$/,
                        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
                    }, {
                        test: /\.(svg|ttf|eot|woff|woff2)$/,
                        loader: 'file-loader'
                    }, {
                        test: /\.jsx$/,
                        loader: 'jsx-loader'
                    }, {
                        test: /\.json$/,
                        loader: 'json-loader'
                    }]
                },
                // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
                plugins: [
                    new ExtractTextPlugin('[name].css')
                ],
                stats: {
                    colors: true,
                    // modules: true,
                    // reasons: true
                },
                devtool: 'source-map',
                watch: true,
                keepalive: true
            },
            prod: {
                resolve: {
                    extensions: ['', '.js', '.jsx']
                },
                entry: './client.js',
                output: {
                    path: './build/dist',
                    publicPath: '/public/dist/',
                    filename: '[name].js',
                    chunkFilename: '[id].js'
                },
                module: {
                    loaders: [{
                        test: /\.less$/,
                        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
                    }, {
                        test: /\.(svg|ttf|eot|woff|woff2)$/,
                        loader: 'file-loader'
                    }, {
                        test: /\.jsx$/,
                        loader: 'jsx-loader'
                    }, {
                        test: /\.json$/,
                        loader: 'json-loader'
                    }]
                },
                // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
                plugins: [
                    new ExtractTextPlugin('[name].css')
                ],
                progress: false
            }
        }
    });

    // libs
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-webpack');

    // tasks
    grunt.registerTask('default', ['clean', 'jshint', 'copy', 'concurrent:dev']);
    grunt.registerTask('build', ['clean', 'copy', 'webpack:prod']);
};
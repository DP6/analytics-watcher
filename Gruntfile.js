/*global module:false*/
module.exports = (grunt) => {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
        replace: {
            compile: {
                src: 'src/*.html',
                dest: 'dist/',
                replacements: [{
                        from: /<!-- @dev-css [\s\S]*? dev-css@ -->/gim,
                        to: '<link rel="stylesheet" type="text/css" href="css/all.css"/>',
                    },
                    {
                        from: /<!-- @dev-jsanalyticswatcher [\s\S]*? dev-jsanalyticswatcher@ -->/gim,
                        to: `<script type="text/javascript" src="js/materialize.min.js"></script>
                      <script type="module" src="js/all.js"></script>
                      <script type="module" src="js/allAnalyticsWatcher.js"></script>
                      `,
                    },
                    {
                        from: /<!-- @dev-jspenguinDataLayer [\s\S]*? dev-jspenguinDataLayer@ -->/gim,
                        to: `<script type="text/javascript" src="js/materialize.min.js"></script>
                          <script type="module" src="js/all.js"></script>
                          <script type="module" src="js/allPenguinDataLayer.js"></script>
                          `,
                    },
                ],
            },
        },
        cssmin: {
            combine: {
                files: {
                    'dist/css/all.css': [
                        'src/css/normalize.css',
                        'src/css/style.css',
                        'src/css/materialize.min.css',
                        'src/css/main.css',
                    ],
                },
            },
        },
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true,
            },
            dist: {
                files: {
                    'dist/js/all.js': [
                        'src/js/jquery.js',
                        'src/js/eventos.js',
                        'src/js/rules.js',
                    ],
                    'dist/js/allPenguinDataLayer.js': [
                        'src/js/ajv.min.js',
                        'src/js/penguinDataLayer.js',
                    ],
                    'dist/js/allAnalyticsWatcher.js': [
                        'src/js/metadata.js',
                        'src/js/script.js',
                    ],
                    'dist/js/devtools.js': 'src/js/devtools.js',
                    'dist/js/schema_parser.js': 'src/js/schema_parser.js',
                    'dist/js/background.js': 'src/js/background.js',
                    'dist/js/penguinDataLayerContentScript.js': 'src/js/penguinDataLayerContentScript.js',
                    'dist/js/materialize.min.js': 'src/js/materialize.min.js',
                },
            },
        },
        jshint: {
            options: grunt.file.readJSON('jshint.json'),
            gruntfile: {
                src: 'Gruntfile.js',
            },
            js: {
                src: ['src/js/script.js', 'src/js/eventos.js', 'src/js/tagueamento.js'],
            },
        },
        copy: {
            compile: {
                files: [{
                    cwd: 'src/',
                    expand: true,
                    src: [
                        'manifest.json',
                        'icons/*',
                        'img/*',
                        'devtools.html',
                        'js/ajv.js',
                        'js/ajv.min.js',
                    ],
                    dest: 'dist/',
                }, ],
            },
        },
        clean: ['dist'],
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-text-replace');

    // Default task.
    grunt.registerTask('html', ['replace']);
    grunt.registerTask('css', ['cssmin']);
    grunt.registerTask('js', ['concat', 'jshint']);
    grunt.registerTask('default', ['clean', 'html', 'css', 'js', 'copy']);
};
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'sinon-chai', 'riot'],
    files: [
      'node_modules/jquery/dist/jquery.min.js',
      'https://cdn.jsdelivr.net/semantic-ui/2.2.10/semantic.min.css',
      'tags/**/*'
    ],
    preprocessors: {
      'tags/**/*.spec.js': ['babel'],
      'tags/**/*.tag': ['riot', 'coverage']
    },
    riotPreprocessor: {
      options: {
        type: 'es6'
      }
    },
    logLevel: config.LOG_ERROR,
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      reporters: [{
        type: 'html',
        dir: 'coverage/'
      }, {
        type: 'text-summary'
      }],
    },
    browsers: ['Chrome'],
    singleRun: true
  })
}
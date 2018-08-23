module.exports = {
  presets: [
    '@vue/app'
  ],
  'plugins': [
    ['transform-modules', {
      'cube-ui': {
        // eslint-disable-next-line
        'transform': "cube-ui/lib/${member}",
        'kebabCase': true,
        'style': {
          'ignore': ['create-api', 'better-scroll']
        }
      }
    }]
  ]
}

module.exports = {
  'presets': [
    '@vue/app'
  ],
  'plugins': [
    ['transform-modules', {
      'cube-ui': {
        // eslint-disable-next-line
        "transform": "cube-ui/src/modules/${member}",
        'kebabCase': true
      }
    }]
  ]
}

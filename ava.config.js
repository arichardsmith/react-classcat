export default {
  files: [
    'src/**/*.test.js'
  ],
  require: [
    'esm',
    '@babel/register'
  ],
  babel: {
    testOptions: {
      presets: [
        ['module:ava/stage-4', { 'modules': false }]
      ]
    }
  }
}

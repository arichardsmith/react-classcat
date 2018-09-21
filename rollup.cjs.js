import extendConfig from './rollup.base.js'

export default extendConfig({
  output: {
    file: 'dist/index.js',
    format: 'cjs'
  }
})

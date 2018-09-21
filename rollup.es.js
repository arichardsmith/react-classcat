import extendConfig from './rollup.base.js'

export default extendConfig({
  output: {
    file: 'es/index.js',
    format: 'es'
  }
})

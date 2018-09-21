import babel from 'rollup-plugin-babel'

const BASE_CONFIG = {
  input: 'src/index.js',
  plugins: [babel()],
  external: [
    'react',
    'classcat',
    'hoist-non-react-statics'
  ],
  output: {}
}

export default function extendConfig (userConfig) {
  let config = Object.assign({}, BASE_CONFIG)

  config.plugins = [...config.plugins, ...(userConfig.plugins || [])]
  config.output = Object.assign({}, config.output, userConfig.output || {})

  return config
}

import { createElement as h } from 'react'
import cc from 'classcat'
import hoistNonReactStatics from 'hoist-non-react-statics'

export default function withClassNames (Component, classNames) {
  const type = typeof classNames

  let classNamesStr

  if (type !== 'function') {
    // Process early
    if (classNames === undefined) {
      classNamesStr = ''
    } else {
      classNamesStr = cc(classNames)
    }
  }

  function WithClassNames (props) {
    if (type === 'function') {
      classNamesStr = classNames(props)
    }

    const className = cc([
      props.className,
      props.classNames,
      classNamesStr
    ])

    const newProps = Object.assign({}, props, { className, classNames: undefined })

    return h(Component, newProps)
  }

  const fallbackName = typeof Component === 'string'
    ? Component
    : 'Component'

  const displayName = Component.displayName || Component.name || fallbackName

  WithClassNames.displayName = `withClassNames(${displayName})`

  hoistNonReactStatics(WithClassNames, Component)

  return WithClassNames
}

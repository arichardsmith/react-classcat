import { createElement } from 'react';
import cc from 'classcat';
import hoistNonReactStatics from 'hoist-non-react-statics';

function withClassNames(Component, classNames) {
  var type = typeof classNames;
  var classNamesStr;

  if (type !== 'function') {
    // Process early
    if (classNames === undefined) {
      classNamesStr = '';
    } else {
      classNamesStr = cc(classNames);
    }
  }

  function WithClassNames(props) {
    if (type === 'function') {
      classNamesStr = classNames(props);
    }

    var className = cc([props.className, props.classNames, classNamesStr]);
    var newProps = Object.assign({}, props, {
      className: className
    });
    return createElement(Component, newProps);
  }

  var displayName = Component.displayName || Component.name || 'Component';
  WithClassNames.displayName = "withClassNames(" + displayName + ")";
  hoistNonReactStatics(WithClassNames, Component);
  return WithClassNames;
}

export default withClassNames;

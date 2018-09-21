# react-classcat
React wrapper for [Classcat](https://github.com/jorgebucaran/classcat)

A higher order component that parses classcat class definitions and assigns the class name to the provided component

## Usage
Default export is a `withClassNames` HOC
```js
import withClassNames from 'react-classcat'
```

`withClassNames` lets you:
Apply classNames depending on props
```js
const TodoWithClass = withClassNames(Todo, props => ({
  'todo-complete': props.complete
}))
```

Apply classNames in advance
```js
const DivWithClass = withClassNames('div', ['foo', { bar: true }])
//-> <div className='foo bar' />
```

Apply classNames with a prop
```js
const FooWithClass = withClassNames(Foo)
render(<FooWithClass classNames={{ foo: true, bar: true }}) />)
//-><FooWithClass className='foo bar' />
```

Any `className` prop will also be included in the final string

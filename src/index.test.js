import test from 'ava'
import { createElement as h } from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'

import withClassNames from './index.js'

test.before(t => {
  t.context.renderer = new ShallowRenderer()
})

function PlainDiv (props) {
  return h('div', props)
}

test('Applies classNames to provided component', t => {
  const { renderer } = t.context

  const PlainDivWithClass = withClassNames(PlainDiv, 'foo')
  renderer.render(h(PlainDivWithClass))

  const res = renderer.getRenderOutput()

  t.is(res.type, PlainDiv)
  t.is(res.props.className, 'foo')
})

test('Applies classNames to html element', t => {
  const { renderer } = t.context

  const DivWithClass = withClassNames('div', 'foo')
  renderer.render(h(DivWithClass))

  const res = renderer.getRenderOutput()

  t.is(res.type, 'div')
  t.is(res.props.className, 'foo')
})

test('Supports classNames props', t => {
  const { renderer } = t.context

  const PlainDivWithClassNames = withClassNames(PlainDiv)
  renderer.render(h(PlainDivWithClassNames, { classNames: { foo: true } }))

  const res = renderer.getRenderOutput()

  t.is(res.props.className, 'foo')
})

test('Preserves existing className', t => {
  const { renderer } = t.context

  const PlainDivWithClassNames = withClassNames(PlainDiv, { baz: true })
  renderer.render(h(PlainDivWithClassNames, { classNames: { bar: true }, className: 'foo' }))

  const res = renderer.getRenderOutput()

  t.is(res.props.className, 'foo bar baz')
})

test.failing('Dedupes className', t => {
  const { renderer } = t.context

  const PlainDivWithClass = withClassNames(PlainDiv, 'foo')
  renderer.render(h(PlainDivWithClass, { className: 'foo' }))

  const res = renderer.getRenderOutput()

  t.is(res.props.className, 'foo')
})

test('Passes props to functional classNames', t => {
  const { renderer } = t.context
  const functionalClassNames = props => {
    t.not(props.foo, undefined)
    return { foo: props.foo, bar: true }
  }

  const PlainDivWithClass = withClassNames(PlainDiv, functionalClassNames)
  renderer.render(h(PlainDivWithClass, { foo: true }))

  let res = renderer.getRenderOutput()

  t.is(res.props.className, 'foo bar')

  renderer.render(h(PlainDivWithClass, { foo: false }))

  res = renderer.getRenderOutput()

  t.is(res.props.className, 'bar')
})

test('Wraps display name', t => {
  const PlainDivWithClass = withClassNames(PlainDiv)

  t.is(PlainDivWithClass.displayName, 'withClassNames(PlainDiv)')

  const DivWithClass = withClassNames('div')

  t.is(DivWithClass.displayName, 'withClassNames(div)')
})

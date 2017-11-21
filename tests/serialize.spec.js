const serialize = require('../src/serialize')

test('serializes native types', () => {
  expect(serialize(Number)).toBeDefined()
})

test('serializes native types are not native types', () => {
  expect(serialize(Number)).not.toBe(Number)
})

test('serialized native types are different between each other', () => {
  expect(serialize(Number)).not.toBe(serialize(Object))
})

test('serializes booleans', () => {
  expect(serialize(true)).toEqual('true')
  expect(serialize(false)).toEqual('false')
})

test('serializes strings', () => {
  expect(serialize('string')).toEqual('"string"')
})

test('serializes regexps', () => {
  expect(serialize(/abc/)).toEqual('/abc/')
})

test('serializes null objects', () => {
  expect(serialize(Object.create(null))).toEqual('{}')
})

test('serializes functions', () => {
  expect(serialize(() => 'value')).toBeDefined()
})

test('serialized functions are different between each other', () => {
  expect(serialize(() => 'value')).not.toBe(() => true)
})

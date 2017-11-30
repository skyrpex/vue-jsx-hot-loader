const serialize = require('../src/serialize');

test('serializes native types', () => {
  expect(serialize(Number)).toBeDefined();
});

test('serializes native types are not native types', () => {
  expect(serialize(Number)).not.toBe(Number);
});

test('serialized native types are different between each other', () => {
  expect(serialize(Number)).not.toBe(serialize(Object));
});

test('serializes booleans', () => {
  expect(serialize(true)).toEqual('true');
  expect(serialize(false)).toEqual('false');
});

test('serializes strings', () => {
  expect(serialize('string')).toEqual('"string"');
});

test('serializes regexps', () => {
  expect(serialize(/abc/)).toEqual('/abc/');
});

test('serializes dates', () => {
  expect(serialize(new Date())).toBeDefined();
  expect(serialize(new Date(2017))).not.toBe(serialize(new Date(2016)));
});

test('serializes arrays', () => {
  expect(serialize(['string', /regexp/])).not.toBe(serialize(['string']));
});

test('serializes null objects', () => {
  expect(serialize(Object.create(null))).toBe('{}');
});

test('serializes functions', () => {
  expect(serialize(() => 'value')).toBeDefined();
});

test('serialized functions are different between each other', () => {
  expect(serialize(() => 'value')).not.toBe(() => true);
});

test('serializes deep objects', () => {
  expect(serialize({
    string: 'string',
    nested: {
      boolean: true,
      regexp: /regexp/,
    },
  })).toBe('{"string":"string","nested":{"boolean":true,"regexp":/regexp/}}');
});

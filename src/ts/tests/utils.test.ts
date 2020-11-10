import { uid, parse, isEqual, createArray } from '@/utils';

test('checking the uid function.', () => {
  const id = uid(15);
  expect(typeof id).toBe('string');
  expect(id.length).toBe(15);
});

test('checking parse function.', () => {
  expect(parse('some-text')).toBe('some-text');
  expect(parse('=some-text')).toBe('=some-text');
  expect(parse('=2+5')).toBe(7);
});

test('checking the isEqual function.', () => {
  expect(isEqual({ name: 'Ikrom' }, { name: 'Ikrom' })).toBeTruthy();
  expect(isEqual('25', '25')).toBeTruthy();
  expect(isEqual(10, 10)).toBeTruthy();

  expect(isEqual({ name: 'Ikrom' }, { surname: 'Murodov' })).toBeFalsy();
  expect(isEqual({ age: 18 }, 18)).toBeFalsy();
  expect(isEqual(10, '10')).toBeFalsy();
});

test('checking the createArray function', () => {
  expect(createArray(5, 10)).toEqual([5, 6, 7, 8, 9, 10]);
  expect(createArray(10, 5)).toEqual([5, 6, 7, 8, 9, 10]);
});

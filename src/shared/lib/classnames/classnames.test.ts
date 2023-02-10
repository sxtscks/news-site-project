import { classnames } from './classnames';

describe('classnames',  () => {
  test('with first param', () => {
    expect(classnames('someClass')).toBe('someClass')
  });

  test('with additional params', () => {
    const expected = 'someClass class1 class2'
    expect(classnames('someClass', {}, ['class1', 'class2'])).toBe(expected)
  });

  test('with modes', () => {
    const expected = 'someClass class1 class2 hovered scrollable'
    expect(classnames(
      'someClass',
      {hovered: true, scrollable: true},
      ['class1', 'class2']
    )).toBe(expected)
  });

  test('with false mode', () => {
    const expected = 'someClass class1 class2 hovered'
    expect(classnames(
      'someClass',
      {hovered: true, scrollable: false},
      ['class1', 'class2']
    )).toBe(expected)
  });

  test('with undefined mode', () => {
    const expected = 'someClass class1 class2 hovered'
    expect(classnames(
      'someClass',
      {hovered: true, scrollable: undefined},
      ['class1', 'class2']
    )).toBe(expected)
  });
});

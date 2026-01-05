import { expect, test } from '@jest/globals';
import genDiff from '../index.js';

const getFixturePath = (filename) => 
  new URL(`../__fixtures__/${filename}`, import.meta.url).pathname;

test('compare flat json files', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  const result = genDiff(filepath1, filepath2);

  expect(result).toBe(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});

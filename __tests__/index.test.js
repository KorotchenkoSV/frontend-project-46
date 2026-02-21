import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fixturesPath = path.join(__dirname, '..', '__fixtures__');

const formats = ['stylish', 'plain', 'json'];

const switchFormat = (format) => {
  const resultFiles = {
    stylish: 'result_stylish.txt',
    plain: 'result_plain.txt',
    json: 'result_json.txt',
  };

  if (!Object.hasOwn(resultFiles, format)) {
    throw new Error(`Unknown format: ${format}`);
  }

  const expectedResultPath = path.join(fixturesPath, resultFiles[format]);
  const expectedResult = fs.readFileSync(expectedResultPath, 'utf-8').trim();

  return expectedResult;
};

describe.each(formats)('genDiff for JSON', (format) => {
  const filepath1 = path.join(fixturesPath, 'file1.json');
  const filepath2 = path.join(fixturesPath, 'file2.json');

  test(`output in ${format}`, () => {
    const expectedResult = switchFormat(format);
    const actualResult = genDiff(filepath1, filepath2, format);

    expect(actualResult).toEqual(expectedResult);
  });
});

describe.each(formats)('genDiff for YML', (format) => {
  const filepath1 = path.join(fixturesPath, 'file1.yaml');
  const filepath2 = path.join(fixturesPath, 'file2.yaml');

  test(`output in ${format}`, () => {
    const expectedResult = switchFormat(format);
    const actualResult = genDiff(filepath1, filepath2, format);

    expect(actualResult).toEqual(expectedResult);
  });
});

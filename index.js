import { parseFile } from './src/parse.js';
import compareFiles from './src/compare.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  return compareFiles(data1, data2);
};

export default genDiff;

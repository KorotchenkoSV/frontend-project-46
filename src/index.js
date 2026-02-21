import { readFile, getExtension, parse } from './parsers.js';
import makeComparisonTree from './compareData.js';
import applyFormat from './formatters/index.js';

const genDiff = (file1, file2, format = 'stylish') => {
  // Чтение содержимого файлов
  const dataOfFile1 = readFile(file1);
  const dataOfFile2 = readFile(file2);

  // Определение форматов файлов
  const extOfFile1 = getExtension(file1);
  const extOfFile2 = getExtension(file2);

  // Парсинг данных
  const parsedFile1 = parse(dataOfFile1, extOfFile1);
  const parsedFile2 = parse(dataOfFile2, extOfFile2);

  // Построение дерева различий
  const diffTree = makeComparisonTree(parsedFile1, parsedFile2);

  // Форматирование результата
  return applyFormat(diffTree, format);
};

export default genDiff;


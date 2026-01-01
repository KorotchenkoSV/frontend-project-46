import _ from 'lodash';

const compareFiles = (data1, data2) => {
  const allKeys = [...new Set([...Object.keys(data1), ...Object.keys(data2)])];
  const sortedKeys = _.sortBy(allKeys);


  const diffLines = sortedKeys.map((key) => {
    if (!(key in data1)) {
      return `  + ${key}: ${data2[key]}`; // Убрали \n
    }
    if (!(key in data2)) {
      return `  - ${key}: ${data1[key]}`; // Убрали \n
    }
    if (data1[key] !== data2[key]) {
      return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`; // \n только между строками
    }
    return `  ${key}: ${data1[key]}`; // Убрали \n
  });

  // Собираем все строки и оборачиваем в фигурные скобки
  return `{\n${diffLines.join('\n')}\n}`; // \n между строками, но не в конце
};

export default compareFiles;

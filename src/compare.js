import _ from 'lodash';

const compareFiles = (data1, data2) => {
  // Получаем все уникальные ключи из обоих объектов
  const allKeys = _.union(Object.keys(data1), Object.keys(data2));
  
  // Сортируем ключи в алфавитном порядке
  const sortedKeys = _.sortBy(allKeys);
  
  // Формируем строки дифа
  const diffLines = sortedKeys.map((key) => {
    if (!(key in data1)) {
      // Ключ есть только во втором файле
      return `+ ${key}: ${data2[key]}`;
    }
    
    if (!(key in data2)) {
      // Ключ есть только в первом файле
      return `- ${key}: ${data1[key]}`;
    }
    
    if (data1[key] !== data2[key]) {
      // Ключ есть в обоих, но значения различаются
      return `- ${key}: ${data1[key]}\n+ ${key}: ${data2[key]}`;
    }
    
    // Ключ и значение совпадают в обоих файлах
    return `  ${key}: ${data1[key]}`;
  });
  
  // Собираем итоговую строку с переносами и обрамляем фигурными скобками
  return `{\n${diffLines.join('\n')}\n}`;
};

export default compareFiles;

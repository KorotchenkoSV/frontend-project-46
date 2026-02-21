import makeStylish from './stylish.js';
import makePlain from './plain.js';
import makeJson from './json.js';

const applyFormat = (diffTree, format) => {
  switch (format) {
    case 'stylish':
      return makeStylish(diffTree);
    case 'plain':
      return makePlain(diffTree);
    case 'json':
      return makeJson(diffTree);
    default:
      throw new Error(`Unexpected format: ${format}!`);
  }
};

export default applyFormat;

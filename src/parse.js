import fs from 'fs';
import path from 'path';

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(absolutePath, 'utf-8');
};

const parseJson = (content) => JSON.parse(content);

const getParser = (filepath) => {
  const ext = path.extname(filepath).toLowerCase();
  
  switch (ext) {
    case '.json':
      return parseJson;
    default:
      throw new Error(`Unsupported file format: ${ext}`);
  }
};

const parseFile = (filepath) => {
  const content = readFile(filepath);
  const parser = getParser(filepath);
  return parser(content);
};

export { parseFile };
export default parseFile;

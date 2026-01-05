import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const readFile = (filepath) => {
  try {
    const absolutePath = path.resolve(process.cwd(), filepath);
    return fs.readFileSync(absolutePath, 'utf-8');
  } catch (err) {
    throw new Error(`Cannot read file: ${filepath}`);
  }
};

const parseJson = (content) => JSON.parse(content);

const parseYaml = (content) => {
  try {
    return yaml.load(content);
  } catch (error) {
    throw new Error(`Invalid YAML syntax in file: ${error.message}`);
  }
};

const getParser = (filepath) => {
  const ext = path.extname(filepath).toLowerCase();

  switch (ext) {
    case '.json':
      return parseJson;
    case '.yml':
    case '.yaml':
      return parseYaml;
    default:
      throw new Error(`Unsupported file format: ${ext}`);
  }
};

const parseFile = (filepath) => {
  const content = readFile(filepath);
  const parser = getParser(filepath);
  return parser(content);
};

export default parseFile;

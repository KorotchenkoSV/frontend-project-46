import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const getAbsolutePath = file => path.resolve(process.cwd(), file)

const readFile = (filepath) => {
  if (!fs.existsSync(filepath)) {
    throw new Error(`File not found: ${filepath}`)
  }
  return fs.readFileSync(getAbsolutePath(filepath), 'utf-8')
}

const getExtension = file => path.extname(file).slice(1) // Убираем точку

const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data)
    case 'yml':
    case 'yaml':
      return yaml.load(data)
    default:
      throw new Error(`Unsupported format: ${format}`)
  }
}

export { readFile, getExtension, parse }

const makeIndent = (depth, indentCount = 2) => ' '.repeat(depth * indentCount);

const stringify = (value, depth = 1) => {
  const valueType = typeof value;

  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    const indent = makeIndent(depth + 1);
    const bracketIndent = makeIndent(depth);

    const lines = Object
      .entries(value)
      .map(([key, val]) => `${indent}"${key}": ${stringify(val, depth + 1)}`)
      .join(',\n');
    return `{\n${lines}\n${bracketIndent}}`;
  }

  if (valueType === 'number' || value === null || valueType === 'boolean') {
    return `${value}`;
  }

  return `"${value}"`;
};

const stringifyChanged = (oldValue, newValue, depth) => {
  const indent = makeIndent(depth + 1);
  const bracketIndent = makeIndent(depth);

  if (oldValue === '') {
    return `{\n${indent}"oldValue": "",\n${indent}"newValue": ${stringify(newValue)}\n${bracketIndent}}`;
  }

  if (typeof oldValue === 'object' && oldValue !== null) {
    return `{\n${indent}"oldValue": ${stringify(oldValue, depth + 1)},\n${indent}"newValue": ${stringify(newValue)}\n${bracketIndent}}`;
  }

  return `{\n${indent}"oldValue": ${stringify(oldValue)},\n${indent}"newValue": ${stringify(newValue)}\n${bracketIndent}}`;
};

const makeJson = (diffTree, depth = 1) => {
  if (diffTree.length === 0) {
    return 'Empty files!';
  }

  const indent = makeIndent(depth);
  const bracketIndent = makeIndent(depth - 1);

  const lines = diffTree.map((node) => {
    const {
      type, key, value, oldValue, newValue, children,
    } = node;

    switch (type) {
      case 'nested':
        return `${indent}"${key}": ${makeJson(children, depth + 1)}`;
      case 'added':
        return `${indent}"${key}": ${stringify(value, depth)}`;
      case 'unchanged':
        return `${indent}"${key}": ${stringify(value, depth)}`;
      case 'deleted':
        return `${indent}"${key}": ${stringify(value, depth)}`;
      case 'changed':
        return `${indent}"${key}": ${stringifyChanged(oldValue, newValue, depth)}`;
      default:
        throw new Error(`Unsupported type: ${type}`);
    }
  });

  return `{\n${lines.join(',\n')}\n${bracketIndent}}`;
};

export default makeJson;

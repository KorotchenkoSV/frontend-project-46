const symbols = {
  replacer: ' ',
  added: '+ ',
  changed: '- ',
  unchanged: '  ',
};

const makeIndent = (depth, indentCount = 4, leftShift = 2) => symbols
  .replacer
  .repeat(depth * indentCount - leftShift);
const makeBracketIndent = (depth, indentCount = 4) => symbols.replacer.repeat(depth * indentCount);

const stringify = (value, depth = 1) => {
  const indent = makeIndent(depth + 1);
  const bracketIndent = makeBracketIndent(depth);

  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    const lines = Object
      .entries(value)
      .map(([key, val]) => `${indent}${symbols.unchanged}${key}: ${stringify(val, depth + 1)}`);
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  }
  return `${value}`;
};

const makeStylish = (diffTree, depth = 1) => {
  if (diffTree.length === 0) {
    return 'Empty files!';
  }

  const indent = makeIndent(depth);
  const bracketIndent = makeBracketIndent(depth - 1);

  const lines = diffTree.flatMap((node) => {
    const {
      type, key, value, oldValue, newValue, children,
    } = node;

    switch (type) {
      case 'nested':
        return `${indent}${symbols.unchanged}${key}: ${makeStylish(children, depth + 1)}`;
      case 'added':
        return `${indent}${symbols.added}${key}: ${stringify(value, depth)}`;
      case 'unchanged':
        return `${indent}${symbols.unchanged}${key}: ${stringify(value, depth)}`;
      case 'deleted':
        return `${indent}${symbols.changed}${key}: ${stringify(value, depth)}`;
      case 'changed':
        return [
          `${indent}${symbols.changed}${key}: ${stringify(oldValue, depth)}`,
          `${indent}${symbols.added}${key}: ${stringify(newValue, depth)}`,
        ];
      default:
        throw new Error(`Unsupported type: ${type}`);
    }
  });

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

export default makeStylish;

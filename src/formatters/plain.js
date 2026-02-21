const makePath = (node, prefix = '') => {
  const { type, key, children } = node;
  const path = prefix && !prefix.endsWith('.') ? `${prefix}.${key}` : `${prefix}${key}`;

  if (type === 'nested') {
    return children.map((child) => makePath(child, path));
  }

  return `${path}`;
};

const getValue = (value) => {
  if (value == null || typeof value === 'boolean' || typeof value === 'number') {
    return value;
  }
  if (typeof value !== 'object' || value === null) {
    return `'${value}'`;
  }
  return '[complex value]';
};

const makePlain = (diffTree, prefix = '') => {
  if (diffTree.length === 0) {
    return 'Empty files!';
  }

  const cb = (lines, node) => {
    const {
      type, value, oldValue, newValue, children,
    } = node;

    switch (type) {
      case 'nested':
        return lines.concat(makePlain(children, `${prefix}${node.key}.`));
      case 'added':
        return lines.concat(`Property '${makePath(node, prefix)}' was added with value: ${getValue(value)}`);
      case 'deleted':
        return lines.concat(`Property '${makePath(node, prefix)}' was removed`);
      case 'changed':
        return lines.concat(`Property '${makePath(node, prefix)}' was updated. From ${getValue(oldValue)} to ${getValue(newValue)}`);
      case 'unchanged':
        return lines;
      default:
        throw new Error(`Unsupported type: ${type}`);
    }
  };

  const result = diffTree.reduce(cb, []).join('\n');

  return result;
};

export default makePlain;

import _ from 'lodash';

const makeComparisonTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.sortBy(_.union(keys1, keys2));

  if (keys.length === 0) {
    return [];
  }

  return keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        type: 'nested',
        key,
        children: makeComparisonTree(value1, value2),
      };
    }

    if (!Object.hasOwn(obj1, key)) {
      return {
        type: 'added',
        key,
        value: value2,
      };
    }

    if (!Object.hasOwn(obj2, key)) {
      return {
        type: 'deleted',
        key,
        value: value1,
      };
    }

    if (value1 !== value2) {
      return {
        type: 'changed',
        key,
        oldValue: value1,
        newValue: value2,
      };
    }

    return {
      type: 'unchanged',
      key,
      value: value1,
    };
  });
};

export default makeComparisonTree;

import _ from 'lodash';

const createTree = (obj1, obj2) => {
  const sortedKeys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));
  return sortedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!_.has(obj1, key)) {
      return { key, status: 'add', val: value2 };
    }
    if (!_.has(obj2, key)) {
      return { key, status: 'remove', val: value1 };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, status: 'recursion', val: createTree(value1, value2) };
    }
    if (_.isEqual(value1, value2)) {
      return { key, status: 'same', val: value1 };
    }
    return {
      key, status: 'updated', val1: value1, val2: value2,
    };
  });
};

export default createTree;

import _ from 'lodash';

const createTree = (obj1, obj2) => {
  const keys = Object.keys({ ...obj1, ...obj2 });
  const sortedKeys = _.sortBy(keys);
  return sortedKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return ['add', { key, val: obj2[key] }];
    }
    if (!_.has(obj2, key)) {
      return ['remove', { key, val: obj1[key] }];
    }
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      return ['recursion', { key, val: createTree(obj1[key], obj2[key]) }];
    }
    if (_.isEqual(obj1[key], obj2[key])) {
      return ['same', { key, val: obj1[key] }];
    }
    return ['updated', { key, val1: obj1[key], val2: obj2[key] }];
  });
};

export default createTree;

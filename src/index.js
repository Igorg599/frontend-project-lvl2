import _ from 'lodash';
import parser from './parsers/index.js';
import makeFormater from './formatters/index.js';

const createTree = (obj1, obj2) => {
  const keys = Object.keys({ ...obj1, ...obj2 });
  const sortedKeys = _.sortBy(keys);
  const newq = sortedKeys.map((key) => {
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
  console.log(newq);
  return newq;
};

const genDiff = (filepath1, filepath2, formatType = 'stylish') => {
  const file1 = parser(filepath1);
  const file2 = parser(filepath2);
  const tree = createTree(file1, file2);
  return makeFormater(tree, formatType);
};

export default genDiff;

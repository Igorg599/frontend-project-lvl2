import _ from 'lodash';

const createTree = (obj1, obj2) => {
  const sortedKeys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));
  return sortedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!_.has(obj1, key)) {
      return { type: 'add', key, val: value2 };
    }
    if (!_.has(obj2, key)) {
      return { type: 'remove', key, val: value1 };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { type: 'recursion', key, children: createTree(value1, value2) };
    }
    if (_.isEqual(value1, value2)) {
      return {
        type: 'same',
        key,
        val: value1,
      };
    }
    return {
      type: 'updated',
      key,
      val1: value1,
      val2: value2,
    };
  });
};

export default createTree;

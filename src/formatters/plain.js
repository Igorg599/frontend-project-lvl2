import _ from 'lodash';

const isObject = (val) => {
  if (_.isPlainObject(val)) return '[complex value]';
  return typeof val === 'string' ? `'${val}'` : val;
};

const plain = (data) => {
  const iter = (tree, parent) => tree
    .filter((node) => node[0] !== 'same')
    .map((node) => {
      const property = parent ? `${parent}.${node[1].key}` : node[1].key;
      if (node[1].val === null) {
        return null;
      }
      if (node[0] === 'add') {
        return `Property '${property}' was added with value: ${isObject(
          node[1].val,
        )}`;
      }
      if (node[0] === 'remove') {
        return `Property '${property}' was removed`;
      }
      if (node[0] === 'updated') {
        return `Property '${property}' was updated. From ${isObject(
          node[1].val1,
        )} to ${isObject(node[1].val2)}`;
      }
      return `${iter(node[1].val, property).join('\n')}`;
    });
  return `${iter(data, 0).join('\n')}`;
};

export default plain;

import _ from 'lodash';

const stringify = (val) => {
  if (_.isPlainObject(val) && val !== null) return '[complex value]';
  if (typeof val === 'string') {
    return `'${val}'`;
  }
  if (val === null) {
    return null;
  }
  return `${val}`;
};

const plain = (data) => {
  const iter = (tree, parent) => tree
    .filter((node) => node.type !== 'same')
    .map((node) => {
      const property = parent ? `${parent}.${node.key}` : node.key;
      switch (node.type) {
        case 'add':
          return `Property '${property}' was added with value: ${stringify(
            node.val,
          )}`;
        case 'remove':
          return `Property '${property}' was removed`;
        case 'updated':
          return `Property '${property}' was updated. From ${stringify(
            node.val1,
          )} to ${stringify(node.val2)}`;
        case 'recursion':
          return `${iter(node.children, property)}`;
        default:
          throw new Error(`Type is not defined - ${node.type}`);
      }
    })
    .join('\n');
  return iter(data, 0);
};

export default plain;

const currentIndent = (depth, intend = 4) => ' '.repeat(intend + depth);

const stringify = (someEntity, spaceCount) => {
  const iter = (current, depth) => {
    if (typeof current !== 'object') {
      return `${current}`;
    }
    if (current === null) {
      return null;
    }
    const lines = Object.entries(current).map(
      ([key, value]) => `${currentIndent(depth + 4)}${key}: ${iter(value, depth + 4)}`,
    );
    return ['{', ...lines, `${currentIndent(depth)}}`].join('\n');
  };

  return iter(someEntity, spaceCount);
};

const stylish = (data) => {
  const iter = (tree, depth) => tree.map((node) => {
    if (node[0] === 'add') {
      return `${currentIndent(depth - 2)}+ ${node[1].key}: ${stringify(
        node[1].val,
        depth,
      )}\n`;
    }
    if (node[0] === 'remove') {
      return `${currentIndent(depth - 2)}- ${node[1].key}: ${stringify(
        node[1].val,
        depth,
      )}\n`;
    }
    if (node[0] === 'same') {
      return `${currentIndent(depth - 2)}  ${node[1].key}: ${stringify(
        node[1].val,
        depth,
      )}\n`;
    }
    if (node[0] === 'updated') {
      return `${currentIndent(depth - 2)}- ${node[1].key}: ${stringify(
        node[1].val1,
        depth,
      )}\n${currentIndent(depth - 2)}+ ${node[1].key}: ${stringify(
        node[1].val2,
        depth,
      )}\n`;
    }
    return `${currentIndent(depth)}${node[1].key}: {\n${iter(
      node[1].val,
      depth + 4,
    ).join('')}${currentIndent(depth)}}\n`;
  });
  return `{\n${iter(data, 0).join('')}}`;
};

export default stylish;

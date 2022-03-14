const currentIndent = (depth, intend = 4) => ' '.repeat(intend * depth - 2);

const stringify = (someEntity, spaceCount) => {
  const iter = (current, depth) => {
    if (typeof current !== 'object') {
      return `${current}`;
    }
    if (current === null) {
      return null;
    }
    const lines = Object.entries(current).map(
      ([key, value]) => `${currentIndent(depth + 1)}  ${key}: ${iter(value, depth + 1)}`,
    );
    return ['{', ...lines, `${currentIndent(depth)}  }`].join('\n');
  };

  return iter(someEntity, spaceCount);
};

const stylish = (data) => {
  const iter = (tree, depth) => tree.map((node) => {
    if (node.type === 'add') {
      return `${currentIndent(depth)}+ ${node.key}: ${stringify(
        node.val,
        depth,
      )}\n`;
    }
    if (node.type === 'remove') {
      return `${currentIndent(depth)}- ${node.key}: ${stringify(
        node.val,
        depth,
      )}\n`;
    }
    if (node.type === 'same') {
      return `${currentIndent(depth)}  ${node.key}: ${stringify(
        node.val,
        depth,
      )}\n`;
    }
    if (node.type === 'updated') {
      return `${currentIndent(depth)}- ${node.key}: ${stringify(
        node.val1,
        depth,
      )}\n${currentIndent(depth)}+ ${node.key}: ${stringify(
        node.val2,
        depth,
      )}\n`;
    }
    return `${currentIndent(depth)}  ${node.key}: {\n${iter(
      node.children,
      depth + 1,
    ).join('')}${currentIndent(depth)}  }\n`;
  });
  return `{\n${iter(data, 1).join('')}}`;
};

export default stylish;

import parser from './parsers/index.js';
import makeFormater from './formatters/index.js';
import createTree from './buldTree/index.js';

const genDiff = (filepath1, filepath2, formatType = 'stylish') => {
  const file1 = parser(filepath1);
  const file2 = parser(filepath2);
  const tree = createTree(file1, file2);
  return makeFormater(tree, formatType);
};

export default genDiff;

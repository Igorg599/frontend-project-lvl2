import _ from 'lodash';
import parser from './parsers/index.js';

const operators = ['+', '-'];

const genDiff = (file1, file2) => {
  const fileJson1 = parser(file1);
  const fileJson2 = parser(file2);
  let result = {};

  const keys1 = Object.keys(fileJson1);
  const keys2 = Object.keys(fileJson2);
  const keysAll = _.union(keys1, keys2);
  keysAll.sort();

  for (let indexKey = 0; indexKey < keysAll.length; indexKey += 1) {
    if (
      _.has(fileJson1, keysAll[indexKey])
      && _.has(fileJson2, keysAll[indexKey])
      && fileJson1[keysAll[indexKey]] === fileJson2[keysAll[indexKey]]
    ) {
      result[`  ${keysAll[indexKey]}`] = fileJson1[keysAll[indexKey]];
    } else if (
      _.has(fileJson1, keysAll[indexKey])
      && _.has(fileJson2, keysAll[indexKey])
      && fileJson1[keysAll[indexKey]] !== fileJson2[keysAll[indexKey]]
    ) {
      result[`${operators[1]} ${keysAll[indexKey]}`] = fileJson1[keysAll[indexKey]];
      result[`${operators[0]} ${keysAll[indexKey]}`] = fileJson2[keysAll[indexKey]];
    } else if (
      !_.has(fileJson1, keysAll[indexKey])
      || _.has(fileJson2, keysAll[indexKey])
    ) {
      result[`${operators[0]} ${keysAll[indexKey]}`] = fileJson2[keysAll[indexKey]];
    } else if (
      _.has(fileJson1, keysAll[indexKey])
      || !_.has(fileJson2, keysAll[indexKey])
    ) {
      result[`${operators[1]} ${keysAll[indexKey]}`] = fileJson1[keysAll[indexKey]];
    }
  }
  result = JSON.stringify(result, null, 2);
  return result.replace(/"/g, '').replace(/,/g, '');
};

export default genDiff;

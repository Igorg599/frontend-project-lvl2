import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';

const fileParse = (file) => JSON.parse(readFileSync(path.resolve(file), 'utf8'));

const operators = ['+', '-'];

const genDiff = (file1, file2) => {
  const fileJson1 = fileParse(file1);
  const fileJson2 = fileParse(file2);
  let result = {};

  const keys1 = Object.keys(fileJson1);
  const keys2 = Object.keys(fileJson2);
  const keysAll = _.union(keys1, keys2);
  keysAll.sort();

  for (let key = 1; key <= keysAll.length; key += 1) {
    if (
      _.has(fileJson1, key)
      && _.has(fileJson2, key)
      && fileJson1[key] === fileJson2[key]
    ) {
      result[`  ${key}`] = fileJson1[key];
    } else if (
      _.has(fileJson1, key)
      && _.has(fileJson2, key)
      && fileJson1[key] !== fileJson2[key]
    ) {
      result[`${operators[1]} ${key}`] = fileJson1[key];
      result[`${operators[0]} ${key}`] = fileJson2[key];
    } else if (!_.has(fileJson1, key) || _.has(fileJson2, key)) {
      result[`${operators[0]} ${key}`] = fileJson2[key];
    } else if (_.has(fileJson1, key) || !_.has(fileJson2, key)) {
      result[`${operators[1]} ${key}`] = fileJson1[key];
    }
  }
  result = JSON.stringify(result, null, 2);
  return result.replace(/"/g, '');
};

export default genDiff;

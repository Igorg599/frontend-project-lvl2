import path from 'path';
import yaml from 'js-yaml';
import { readFileSync } from 'fs';

export default (file) => {
  const filename = readFileSync(path.resolve(file), 'utf-8');
  let parse;
  const extension = path.extname(file);
  switch (extension) {
    case '.json':
      parse = JSON.parse(filename);
      break;

    case '.yaml':
      parse = yaml.load(filename);
      break;

    case '.yml':
      parse = yaml.load(filename);
      break;

    default:
      break;
  }
  return parse;
};

import path from 'path';
import yaml from 'js-yaml';
import { readFileSync } from 'fs';

export default (file) => {
  const filename = readFileSync(path.resolve(file), 'utf-8');
  const extension = path.extname(file);
  switch (extension) {
    case '.json':
      return JSON.parse(filename);

    case '.yaml':
      return yaml.load(filename);

    case '.yml':
      return yaml.load(filename);

    default:
      throw new Error('Error format');
  }
};

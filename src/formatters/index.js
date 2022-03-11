import stylish from './stylish.js';
import plain from './plain.js';

const makeFormater = (tree, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    default:
      throw new Error(`Формат не поддерживается - ${format}`);
  }
};

export default makeFormater;

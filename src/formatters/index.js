import stylish from './stylish.js';

const makeFormater = (tree, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    default:
      throw new Error(`Формат не поддерживается - ${format}`);
  }
};

export default makeFormater;

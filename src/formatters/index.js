import stylish from './stylish.js';

const makeFormater = (getDiff, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return stylish(getDiff);
    default:
      throw new Error(`Формат не поддерживается - ${format}`);
  }
};

export default makeFormater;

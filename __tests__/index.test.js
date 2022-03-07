import { fileURLToPath } from 'url';
import fs from 'fs';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('check for correct diff', () => {
  // expect(genDiff("__fixtures__/file1.json", "__fixtures__/file2.json")).toEqual(
  //   readFile("expectFiles.json")
  // )
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(
    readFile('expectFiles.txt'),
  );
});

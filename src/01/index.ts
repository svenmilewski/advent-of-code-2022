import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { once } from 'events';

export const getLowestEntrysIndex = (array: number[]): number => {
  const undefinedFiledIndex = array.findIndex((value) => value === undefined);
  if (undefinedFiledIndex >= 0) return undefinedFiledIndex;

  let lowestIndex = 0;
  array.reduce((previousValue, currentValue, currentIndex) => {
    if (currentValue < array[lowestIndex]) lowestIndex = currentIndex;
    return currentValue;
  }, array[0]);
  return lowestIndex;
};

export const getMostCalories = async (
  top = 1,
  filePath = `${__dirname}/input.txt`
): Promise<number> => {
  const lineReader = createInterface(createReadStream(filePath));
  const highest: number[] = new Array(top);
  let currentElf = 0;

  lineReader.on('line', (line) => {
    const value = parseInt(line);
    if (isNaN(value)) {
      const lowestIndex = getLowestEntrysIndex(highest);
      const lowestEntry = highest[lowestIndex];
      if (!lowestEntry || currentElf > lowestEntry)
        highest[lowestIndex] = currentElf;
      currentElf = 0;
    } else {
      currentElf += value;
    }
  });

  lineReader.on('close', () => {
    const lowestIndex = getLowestEntrysIndex(highest);
    const lowestEntry = highest[lowestIndex];
    if (!lowestEntry || currentElf > lowestEntry)
      highest[lowestIndex] = currentElf;
  });

  await once(lineReader, 'close');
  return highest.reduce((acc, cur) => (acc += cur), 0);
};

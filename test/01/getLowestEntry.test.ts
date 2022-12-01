import { getMostCalories } from '../../src/01';

describe('getMostCalories', function () {
  it('should get most calories for 1 elf', async function () {
    await expect(
      getMostCalories(1, `${__dirname}/testFile.txt`)
    ).resolves.toEqual(15);
  });

  it('should get most calories for 3 elves', async function () {
    await expect(
      getMostCalories(3, `${__dirname}/testFile.txt`)
    ).resolves.toEqual(21);
  });

  it('should get most calories for 9 elves (only 3 exist)', async function () {
    await expect(
      getMostCalories(9, `${__dirname}/testFile.txt`)
    ).resolves.toEqual(21);
  });
});

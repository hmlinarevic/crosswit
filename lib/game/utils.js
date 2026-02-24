/**
 * Game utils: random number, letter, array element.
 */

export const getRandomNumber = (min, max) => {
  min = Math.floor(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

export const getRandomLetter = () => {
  const range = { start: 97, end: 122 };
  return String.fromCharCode(getRandomNumber(range.start, range.end));
};

export const selectRandomArrayElement = (ar) => {
  const index = getRandomNumber(0, ar.length - 1);
  return ar[index];
};

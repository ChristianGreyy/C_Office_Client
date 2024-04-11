// Get the word of a string given the string and index
export const getWordAt = (str: any, pos: any) => {
  // Perform type conversions.
  str = String(str);
  pos = Number(pos) >>> 0;
  // Search for the word's beginning and end.
  const left = str.slice(0, pos + 1).search(/\S+$/),
    right = str.slice(pos).search(/\s/);
  // The last word in the string is a special case.
  if (right < 0) {
    return str.slice(left);
  }
  // Return the word, using the located bounds to extract it from the string.
  return str.slice(left, right + pos);
};

// Get the position of the beginning of the word
export const getWordStart = (str: any, pos: any) => {
  str = String(str);
  pos = Number(pos) >>> 0;
  // Search for the word's beginning
  const start = str.slice(0, pos + 1).search(/\S+$/);
  return start;
};

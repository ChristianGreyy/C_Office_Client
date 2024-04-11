const dec2hex = (dec: any) => {
  return dec.toString(16).padStart(2, '0');
};

export const generateRandomId = (len?: number) => {
  const arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join('');
};

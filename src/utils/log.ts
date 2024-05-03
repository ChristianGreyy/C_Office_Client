export const LogApp = (
  key: any,
  value?: any,
  ...optionalParams: any[]
): void => {
  // if (import.meta.env.DEV) {
  if (process.env.DEV) {
    // eslint-disable-next-line no-console
    value ? console.log(key, value, ...optionalParams) : console.log(key);
  }
};

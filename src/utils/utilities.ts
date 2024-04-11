// eslint-disable-next-line @typescript-eslint/ban-types
export const LogApp = (key: any, value?: number | string | object, ...optionalParams: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    // value ? console.log(key, value, ...optionalParams) : console.log(key);
    return;
  }
};

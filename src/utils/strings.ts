export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};


export function objectToQueryString(obj: { [key: string]: any }) {
  return Object.entries(obj)
    .map(([key, value]) => `${key}:${value}`)
    .join(',')
}

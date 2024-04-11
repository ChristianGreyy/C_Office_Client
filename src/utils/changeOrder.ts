export const swapPositions = (array: any, a: number, b: number) => {
  ;[array[a], array[b]] = [array[b], array[a]]
  return array
}

export function swapElement(array: any, indexA: number, indexB: number) {
  const tmp = array[indexA]
  array[indexA] = array[indexB]
  array[indexB] = tmp
  return array
}

export const move = (array: any, from: number, to: number) => {
  const newArray = array.splice(to, 0, array.splice(from, 1)[0])
  return newArray
}

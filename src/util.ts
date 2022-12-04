export const getFromMap = <K, V>(map: Map<K, V>, index: K) => {
  const value = map.get(index);
  if (typeof value === 'undefined' || value === null) {
    throw new Error(`Value not found for key: ${index}`);
  }
  return value;
};

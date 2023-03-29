export function isEmptyObject(data) {
  if (!data) {
    return true;
  }
  const arr = Object.keys(data);
  if (arr.length === 0) {
    return true;
  }
  return false;
}

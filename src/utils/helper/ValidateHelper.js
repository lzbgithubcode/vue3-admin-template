/**
 * 是否是外链
 * @param {} path
 * @returns
 */
export function isExternalURL(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

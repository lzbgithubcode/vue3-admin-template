import { resolve } from 'path';
/**
 * @description: 是否是固定标签
 * @param {*} tag tag标签
 * @return {*} 是否是固定标签
 */
const isAffix = (tag) => tag.meta && tag.meta.affix;
/**
 *  过滤固定路由
 * @param {Array} routes 路由
 * @param {String} basePath 基础路径
 */
const filterAffixTags = (routes, basePath = '/') => {
  let tags = [];
  if (!routes || routes.length == 0) return tags;

  for (let i = 0, len = routes.length; i < len; i++) {
    const route = routes[i];
    if (route.meta && route.meta?.affix) {
      const tagPath = resolve(basePath, route.path);
      tags.push({
        name: route.name,
        fullPath: tagPath,
        path: tagPath,
        meta: route.meta
      });
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path);
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags];
      }
    }
  }
  return tags;
};

export { isAffix, filterAffixTags };

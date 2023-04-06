/**
 * @description: 元素是否包含className
 * @param {*} node  元素
 * @param {*} className
 * @return {*}
 */
const hasClass = (node, className) => {
  if (!node) return false;
  if (!className || className.length == 0) return false;
  if (node.getAttribute('class').indexOf(className) != -1) {
    return true;
  }
  if (node.classList.contains(className)) {
    return true;
  }

  if (node.className.indexOf(className) != -1) {
    return true;
  }
  return false;
};

/**
 * @description: 操作元素class
 * @param {Element} node 元素
 * @param {String} className 名称
 * @param {Boolean} add true 新增  false 移除
 * @return {*}
 */
const toggleClass = (node, className, add = true) => {
  if (!node) return false;
  if (!className || className.length == 0) return false;
  if (add) {
    if (hasClass(node, className)) return true;
    node.classList.add(className);
  } else {
    if (!hasClass(node, className)) return false;
    node.classList.remove(className);
  }
};

export { hasClass, toggleClass };

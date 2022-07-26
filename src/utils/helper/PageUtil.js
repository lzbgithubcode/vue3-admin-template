/*
 * @Author: lzb
 * @Date: 2022-06-30 21:45:40
 */
import defaultSettings from "@/settings.js";

const { title } = defaultSettings;

export function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}

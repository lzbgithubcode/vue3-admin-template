import defaultSettings from '../../settings.js';

const { title } = defaultSettings;

export function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}

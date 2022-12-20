module.exports = {
  'src/**/*.{js,jsx,ts,tsx,vue}': ['pnpm run eslint', 'pnpm run format'],
  'src/**/*.{scss,css,html,vue}': 'pnpm run style:fix'
}

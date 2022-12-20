if (!/pnpm/.test(process.env.npm_execpath || '')) {
  console.warn(`\n请安装pnpm 包管理才能正常工作\n`)
  process.exit(1)
}

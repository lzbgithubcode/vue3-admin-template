import { execCmd, logInfo, logSuccess } from './utils.js'

runPublish()

async function runPublish() {
  // 1.代码格式化
  logInfo('\n 代码格式化....')
  await execCmd('pnpm', ['run', 'lint'])

  // 2. 代码格式检测
  logInfo('\n 代码格式检测....')
  await execCmd('pnpm', ['run', 'format'])

  // 3. commit-message 检测
  logInfo('\n commit message 检测....')
  const { stdout } = await execCmd('git', ['diff'], { stdio: 'pipe' })
  if (stdout) {
    logInfo('\n 提交commit改变的change到本地仓库')
    await execCmd('pnpm', ['run', 'commit'])
  } else {
    logInfo('\n 暂无commit change 需要提交')
    return process.exit(1)
  }

  // 4. 生成修改日志
  logInfo('\n 生成修改日志......')
  await execCmd('pnpm', ['run', 'changelog'])

  // 5. 推送代码到github
  logInfo('\n push到 GitHub......')
  await execCmd('git', ['push'])

  logSuccess(`😁😁😁😁 恭喜你,提交代码成功`)
}

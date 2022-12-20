import { execa } from 'execa'
import chalk from 'chalk'

/**
 * @description:  执行命令函数
 * @param {*} bin 命令名称
 * @param {*} args 参数
 * @param {*} opts  配置项
 * @return {*}
 */
const execCmd = async (bin, args, opts = {}) => {
  console.log(chalk.blue(`[运行命令] ${bin} ${args.join(' ')}`), opts)
  return await execa(bin, args, { stdio: 'inherit', ...opts })
}
/**
 * @description: 打印错误日志
 * @param {*} message
 * @return {*}
 */
const logError = (msg) => {
  console.log()
  console.log(`${chalk.bgRed.white(' ERROR ')}   ${chalk.red(msg)}`)
  console.log()
}

/**
 * @description: 打印成功日志
 * @param {*} msg
 * @return {*}
 */
const logSuccess = (msg) => {
  console.log()
  console.log(`${chalk.bgGreen.white(' SUCCESS ')}   ${chalk.green(msg)}`)
  console.log()
}

/**
 * @description: 打印常规日志
 * @param {*} msg
 * @return {*}
 */
const logInfo = (msg) => {
  console.log(chalk.cyan(msg))
}

export { execCmd, logError, logSuccess, logInfo }

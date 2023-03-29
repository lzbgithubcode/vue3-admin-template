/*
 * @Author: lzb
 * @Date: 2022-06-30 21:52:16
 */
// 进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
export default {
  /**
   *  初始化配置
   */
  initProgress(opts) {
    const options = { showSpinner: false };
    Object.assign(options, opts);
    // 进度条配置
    NProgress.configure(options);
  },
  /**
   * 进度开始
   */
  startProgress() {
    NProgress.start();
  },
  /**
   * 结束进度
   */
  stopProgress() {
    NProgress.done();
  }
};

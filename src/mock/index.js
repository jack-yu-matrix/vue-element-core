/*
 * @Author: zu1662
 * @LastEditor: zu1662
 * @Date: 2019-12-17 16:16:53
 * @LastEditTime: 2019-12-24 11:51:39
 * @Description: mock 数据
 */
import Mock from 'mockjs'

// 判断环境不是 prod 或者 preview 是 true 时，加载 mock 服务
if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true') {
  // 使用同步加载依赖
  // 防止 vuex 中的 GetInfo 早于 mock 运行，导致无法 mock 请求返回结果
  console.log('mock mounting')
  require('./services/user')
  require('./services/auth')

  Mock.setup({
    timeout: 800 // setter delay time
  })
  console.log('mock mounted')
}

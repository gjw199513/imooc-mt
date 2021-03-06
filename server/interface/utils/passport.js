// 实现登录注册功能
import passport from 'koa-passport'
// 本地权限认证
import LocalStrategy from 'passport-local'
// mongodb 数据库表
import UserModel from '../../dbs/models/users'

// 把一个策略保存在本地，后续可以通过 name 来访问, 提交数据(策略)
passport.use(
  new LocalStrategy(async function(username, password, done) {
    const where = { username }
    // mongodb: findOne 查询数据, 找出一条
    const result = await UserModel.findOne(where)
    if (result != null) {
      if (result.password === password) {
        return done(null, result)
      } else {
        return done(null, false, '密码错误')
      }
    } else {
      return done(null, false, '用户不存在')
    }
  })
)

// 用户信息保留在 session 存储中, defulat
passport.serializeUser(function(user, done) {
  done(null, user)
})
// defulat
passport.deserializeUser(function(user, done) {
  return done(null, user)
})

export default passport

//引入模块
const Koa = require('koa')
const router = require('./NewsServe/router')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')

const CONFIG = {
  key: 'koa:Pnews', 
  maxAge: 86400000,
  autoCommit: true, 
  overwrite: true, 
  httpOnly: true, 
  signed: false, 
  rolling: false, 
  renew: false, 
}

const app = new Koa()

app.use(session(CONFIG, app))

app.use(bodyParser())

app.use(router.routes())

app.listen(5000, err => {
  if (err) {
    console.log('server start error')
  }
  console.log('server start port 5000')
})


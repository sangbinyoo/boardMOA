'use strict'

require('./check-versions')()
// mysql DB 추가
const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'sunnyday1!usb',
  database : 'boardmoa',
  port     : '3306'
});
connection.connect();
const config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
const opn = require('opn')
const path = require('path')
const express = require('express')
// Expresss 미들웨어 불러오기
const bodyParser = require('body-parser')

const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable

const app = express()
//body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

const uri = 'http://localhost:' + port

let _resolve
const readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

app.get('/api/user', function (req,res,next) {
  res.send('회원정보 조회')
})
app.post('/api/user', function (req,res,next) {
  console.log(req.body.data)
  res.send('회원가입 완료')
})
app.post('/api/user/login', function (req,res,next) {
  var sql = 'SELECT * from members where id = ' + connection.escape(req.body.data.memberid) + ' and password = ' + connection.escape(req.body.data.pw)
  connection.query(sql, function (error, results, fields) {
    if (error) {
      console.log(error)
    }else{
      //id exist
      if(results.length !== 0 && results.length === 1){
        var res_data = { status: 300, data: results[0]}
        res.cookie('user', results[0], { secure: true})
      }
      //id or password missing
      else{
        var res_data = { status: 400, data: 'miss'}
      }
      res.json(res_data)
      res.end()      
    }
  })
})
const server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    connection.end();    
    server.close()
  }
}

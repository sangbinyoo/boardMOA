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
app.get('/api/community', function (req,res,next) {
  var sql = 'SELECT post_no as No, category as 카테고리, title as 제목, writer as 작성자, content as 내용, posted_date as 등록일 FROM post ORDER BY POST_NO DESC LIMIT 10'
  connection.query(sql, function (error, results, fields) {
    if (error) {
      console.log(error)
    }else{
      var res_data = { status: 200, data: results}
      res.json(res_data)
      res.end()
    }
  })
})
app.post('/api/community', function (req,res,next) {
  var sql = 'INSERT INTO POST ( category, title, writer, content) VALUES ('
  + connection.escape(req.body.form.category) + ', '
  + connection.escape(req.body.form.title) + ', '
  + connection.escape(req.body.form.writer) + ', '
  + connection.escape(req.body.form.content) + ')'
  connection.query(sql, function(error, results, fields) {
    var res_data = { status: 0, message: ''}

    if (error) {
      console.log(error)      
      res_data.status = 400
      res_data.message = '오류가 발생했습니다. 잠시후 다시 시도해주세요.'
      res.json(res_data)
    }else{
      res_data.status = 200
      res_data.message = '등록되었습니다'
    }
    res.json(res_data)
    res.end()      
  })
})
app.get('/api/user', function (req,res,next) {
  res.send('회원정보 조회')
})

app.post('/api/user', function (req,res,next) {
  var sql = 'INSERT INTO MEMBERS ( id, password, name, sex, email) VALUES ('
  + connection.escape(req.body.data.memberid) + ', '
  + connection.escape(req.body.data.pw) + ', '
  + connection.escape(req.body.data.name) + ', '
  + connection.escape(req.body.data.sex) + ','
  + connection.escape(req.body.data.email) + ')'
  connection.query(sql, function(error, results, fields) {
    var res_data = { status: 0, message: ''}

    if (error) {
      console.log(error)      
      res_data.status = 400
      res_data.message = '오류가 발생했습니다. 잠시후 다시 시도해주세요.'
      res.json(res_data)
    }else{
      res_data.status = 200
      res_data.message = '회원가입이 완료되었습니다.'
    }
    res.json(res_data)
    res.end()      
  })
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

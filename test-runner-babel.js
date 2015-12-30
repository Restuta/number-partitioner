require('babel-register')
require('babel-polyfill')
var path = require('path')
var glob = require('glob')


//copied from babel-tape-runner so we can run it with nodemon
process.argv.slice(2).forEach(function (arg) {
  glob(arg, function (er, files) {
    if (er) throw er

    files.forEach(function (file) {
      require(path.resolve(process.cwd(), file))
    })
  })
})

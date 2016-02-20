const spawn = require('child_process').spawn

var jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll'

module.exports = {
  run_jekyll_website (website, cb) {
    var workingDir = '.websites/' + website
    var child = spawn(jekyll, ['serve'], {cwd: workingDir})
    var resp = ''

    child.stdout.on('data', function (buffer) { resp += buffer.toString() })
    child.stdout.on('end', function () { cb(resp) })
  },

  run_jekyll_init (website, cb) {
    var workingDir = '.websites/' + website

    var child = spawn(jekyll, ['new', '.'], {cwd: workingDir})
    var resp = ''

    child.stdout.on('data', function (buffer) { resp += buffer.toString() })
    child.stdout.on('end', function () { cb(resp) })
  }
}


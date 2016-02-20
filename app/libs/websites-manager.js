const fs = require('fs')
const walk = require('walk')
const rimraf = require('rimraf')
const watch = require('node-watch')
const helpers = require('./helpers')
const JekyllManager = require('./jekyll-manager')

const websitesFolder = '.websites'

module.exports = {

  watchWebsitesList (callback) {
    const self = this
    watch(websitesFolder, {recursive: false}, function (websites) {
      console.log('websites changed')
      self.updateWebsitesList(callback)
    })
  },

  createWebsiteDirIfNotExist (callback) {
    fs.access('.websites', fs.F_OK, function (err) {
      if (err) {
        console.log('creating websites directory')
        fs.mkdir(websitesFolder, function (err, resp) {
          if (err) console.log(err)
          return callback()
        })
      } else {
        return callback()
      }
    })
  },

  createWebsite (website, callback) {
    this.createWebsiteDirIfNotExist(function () {
      fs.mkdir(websitesFolder + '/' + website, function (err) {
        if (err) throw (err)

        JekyllManager.run_jekyll_init(website, function (err, resp) {
          if (err) console.log(err)
          return callback(err, resp)
        })
      })
    })
  },

  updateWebsitesList (callback) {
    fs.readdir(websitesFolder + '/', function (err, dirs) {
      if (err) console.log(err)
      callback(dirs)
    })
  },

  removeWebsite (website) {
    rimraf(websitesFolder + '/' + website, function (err) {
      if (err) console.log(err)
    })
  },

  serveWebsite (website) {
    JekyllManager.run_jekyll_website(website, function (err, resp) {
      if (err) console.log(err)
      console.log('resp', resp)
    })
  },

  getWebsiteMarkdownFiles (website, callback) {
    website = websitesFolder + '/' + website

    const websiteObj = {
      path: website,
      markdownFiles: []
    }

    const walker = walk.walk(website)

    walker.on('file', function (root, fileStats, next) {
      const extension = helpers.getFileExtension(fileStats.name)
      if (extension === 'md') {
        websiteObj.markdownFiles.push({
          dirPath: root + '/' + fileStats.name,
          name: fileStats.name,
          type: extension,
          fileStats: fileStats
        })
      }
      next()
    })

    walker.on('errors', function (root, nodeStatsArray, next) {
      next()
    })

    walker.on('end', function () {
      console.log(websiteObj)
      return callback(websiteObj)
    })
  }

}


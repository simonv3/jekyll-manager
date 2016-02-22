const fs = require('fs')
const walk = require('walk')
const rimraf = require('rimraf')
const watch = require('node-watch')
const Promise = require('promise')
const helpers = require('./helpers')
const JekyllManager = require('./jekyll-manager')

const websitesFolder = '.websites'

module.exports = {

  watchWebsitesListCallbackFunction: null,

  watchWebsitesList (callback) {
    const self = this
    watch(websitesFolder, {recursive: false}, function (websites) {
      console.log('things changed')
      callback()
      return self.updateWebsitesList()
    })
  },

  createWebsiteDirIfNotExist () {
    const promise = new Promise(function (resolve, reject) {
      fs.access(websitesFolder, fs.F_OK, function (err) {
        if (err) {
          fs.mkdir(websitesFolder, function (err) {
            if (err) reject(err)
            resolve()
          })
        } else {
          resolve()
        }
      })
    })
    return promise
  },

  createWebsite (website) {
    const self = this
    const promise = new Promise(function (resolve, reject) {
      self.createWebsiteDirIfNotExist()
        .then(function () {
          fs.mkdir(websitesFolder + '/' + website, function (err) {
            if (err) reject(err)

            JekyllManager.run_jekyll_init(website, function (err, resp) {
              if (err) reject(err)
              resolve(resp)
            })
          })
        }, function (err) {
          console.log('something went wrong creating a website dir', err)
        })
    })
    return promise
  },

  updateWebsitesList () {
    // const self = this
    const promise = new Promise(function (resolve, reject) {
      fs.readdir(websitesFolder + '/', function (err, dirs) {
        if (err) reject(err)
        resolve(dirs)
      })
    })

    return promise
  },

  removeWebsite (website) {
    const promise = new Promise(function (resolve, reject) {
      rimraf(websitesFolder + '/' + website, function (err) {
        if (err) reject(err)
        resolve()
      })
    })
    return promise
  },

  serveWebsite (website) {
    const promise = new Promise(function (resolve, reject) {
      JekyllManager.run_jekyll_website(website, function (err, resp) {
        if (err) reject(err)
        resolve(resp)
      })
    })
    return promise
  },

  getWebsiteMarkdownFiles (website) {
    const promise = new Promise(function (resolve, reject) {
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
        resolve(websiteObj)
      })
    })

    return promise
  },

  getMarkdownFileContent (file) {
    console.log(file.dirPath)
    const promise = new Promise(function (resolve, reject) {
      fs.readFile(file.dirPath, 'utf8', function (err,data) {
        if (err) reject(err)
        resolve(data)
      })
    })

    return promise
  }

}


var WebsitesManager = require('../libs/websites-manager')

module.exports = function ManageProjectsViewModel () {
  const self = this

  self.newWebsite = ko.observable('')
  self.chosenWebsiteId = ko.observable()
  self.chosenWebsiteData = ko.observable()
  self.chosenMarkdownFileId = ko.observable()
  self.chosenMarkdownFile = ko.observable()
  self.websites = ko.observableArray([])

  self.addWebsite = function () {
    var site = this.newWebsite()
    WebsitesManager.createWebsite(site)
      .then(function (resp) {
        console.log('done initializing jekyll site')
      }, function (err) {
        console.log('error while creating site', err)
      })
  }

  self.setWebsites = function (dirs) {
    self.websites.removeAll()
    dirs.forEach(function (dir) {
      self.websites.push(dir)
    })
  }

  self.removeWebsite = function (website) {
    WebsitesManager.removeWebsite(website)
      .then(function () {
        self.websites.remove(website)
      })
  }

  self.runWebsite = function (website) {
    WebsitesManager.serveWebsite(website)
      .then(function (resp) {
        console.log('done serving', resp)
      })
  }

  self.openWebsite = function (website) {
    self.chosenWebsiteId(website)
    WebsitesManager.getWebsiteMarkdownFiles(website)
      .then(function (websiteObj) {
        self.chosenWebsiteData(websiteObj)
      }, function (err) {
        console.log(err)
      })
  }

  self.openMarkdownFile = function (file) {
    console.log(file)
    self.chosenMarkdownFileId(file)
    WebsitesManager.getMarkdownFileContent(file)
      .then(function (fileContent) {
        console.log(fileContent)
        self.chosenMarkdownFile(fileContent)
      }, function (err) {
        console.log(err)
      })
  }
}

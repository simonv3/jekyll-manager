var WebsitesManager = require('../libs/websites-manager')

module.exports = function ManageProjectsViewModel () {
  const self = this

  self.newWebsite = ko.observable('')
  self.chosenWebsiteId = ko.observable()
  self.chosenWebsiteData = ko.observable()
  self.websites = ko.observableArray([])

  self.addWebsite = function () {
    var site = this.newWebsite()
    WebsitesManager.createWebsite(site, function (err, resp) {
      if (err) console.log(err)
      console.log('done initializing jekyll site')
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
    self.websites.remove(website)
  }

  self.runWebsite = function (website) {
    WebsitesManager.serveWebsite(website)
  }

  self.openWebsite = function (website) {
    self.chosenWebsiteId(website)
    WebsitesManager.getWebsiteMarkdownFiles(website, self.chosenWebsiteData)
  }
}

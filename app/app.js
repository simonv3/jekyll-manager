'use strict'

var WebsitesManager = require('./libs/websites-manager')
var ManageProjectsViewModel = require('./views/manage-projects-view-model')

const mpvm = new ManageProjectsViewModel()

WebsitesManager.watchWebsitesList(function (dirs) {
  mpvm.setWebsites(dirs)
})

WebsitesManager.updateWebsitesList()
  .then(function (dirs) {
    mpvm.setWebsites(dirs)
  }, function (err) {
    console.log(err)
  })

ko.applyBindings(mpvm)

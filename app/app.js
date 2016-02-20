'use strict'

var WebsitesManager = require('./libs/websites-manager')
var ManageProjectsViewModel = require('./views/manage-projects-view-model')

const mpvm = new ManageProjectsViewModel()

WebsitesManager.watchWebsitesList(function (dirs) {
  mpvm.setWebsites(dirs)
})

WebsitesManager.updateWebsitesList(function (dirs) {
  mpvm.setWebsites(dirs)
})

ko.applyBindings(mpvm)

'use strict'

var WebsitesManager = require('./libs/websites-manager')
var ManageProjectsViewModel = require('./views/manage-projects-view-model')

const mpvm = new ManageProjectsViewModel()

// The below is duplicate and probably not necessary.
const callbackFunc = function () {
  WebsitesManager.updateWebsitesList()
    .then(function (dirs) {
      mpvm.setWebsites(dirs)
    }, function (err) {
      console.log(err)
    })
}

WebsitesManager.watchWebsitesList(callbackFunc)

WebsitesManager.updateWebsitesList()
  .then(function (dirs) {
    mpvm.setWebsites(dirs)
  }, function (err) {
    console.log(err)
  })

ko.applyBindings(mpvm)

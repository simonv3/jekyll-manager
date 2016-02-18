'use strict';

const fs = require('fs');
var spawn = require('child_process').spawn;

var jekyll = process.platform === "win32" ? "jekyll.bat" : "jekyll";

function run_jekyll_website(website, callback) {
  var workingDir = '.websites/' + website;
  var child = spawn(jekyll, ['serve'], {cwd: workingDir})
  var resp = '';

  child.stdout.on('data', function (buffer) { resp += buffer.toString() });
  child.stdout.on('end', function() { callback (resp) });
}


function run_jekyll_init(website, callback) {

  var workingDir = '.websites/' + website;

  var child = spawn(jekyll, ['new','.'], {cwd: workingDir});
  var resp = "";

  child.stdout.on('data', function (buffer) { resp += buffer.toString() });
  child.stdout.on('end', function() { callback (resp) });
}

const pm = {
  updateWebsitesList: function() {
    fs.readdir('.websites/', function(err, dirs) {
      if (err) console.log(err);
      mpvm.setWebsites(dirs)
    })
  },
  rmWebsite: function(website) {
    fs.rmdir('.websites/' + website, function(err) {
      if (err) console.log(err);
    });
  },
  createWebsite: function(website, callback) {
    fs.mkdir('.websites/' + website, function(err) {
      if (err) throw (err);

      console.log('starting jekyll init');
      run_jekyll_init(website, function(err, resp) {
        if (err) console.log(err);
        console.log('resp', resp)
      })

      return callback();
    });
  },
  serveWebsite: function(website) {
    console.log('trying to serve')
    run_jekyll_website(website, function(err, resp) {
      if (err) console.log(err);
      console.log('resp', resp)
    });
  }
}

function ManageProjectsViewModel() {
  const self = this;

  self.newWebsite = ko.observable('')
  self.websites = ko.observableArray([])

  self.addWebsite = function() {
    var site = this.newWebsite()
    pm.createWebsite(site, function(err) {
      pm.updateWebsitesList()
    })
  }

  self.setWebsites = function(dirs) {
    self.websites.removeAll();
    dirs.forEach(function(dir) {
      self.websites.push(dir)
    })
  }

  self.removeWebsite = function(website) {
    // const conf = confirm("Are you sure?")
    // if (conf) {
      pm.rmWebsite(website)
      self.websites.remove(website)
    // }
  }

  self.runWebsite = function(website) {
    pm.serveWebsite(website);
  }
};

var mpvm = new ManageProjectsViewModel()

ko.applyBindings(mpvm);

pm.updateWebsitesList();

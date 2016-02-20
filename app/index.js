'use strict';

const app = require('app');
const BrowserWindow = require('browser-window');

require('babel-core/register');

// report crashes to the Electron project
// require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

var createMainWindow = () => {
  let win = new BrowserWindow({
    width: 800,
    height: 600
  });

  win.loadURL(`file://${__dirname}/index.html`);
  // Toggle devtools when developing
  if (process.env.NODE_ENV == 'development') {
    win.openDevTools({ detach: true });
  }

  win.webContents.openDevTools();

  win.on('closed', onClosed);

  return win;
}

var onClosed = () => {
  // deref the window
  // for multiple windows store them in an array
  mainWindow = null;
};

// prevent window being GC'd
let mainWindow;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate-with-no-open-windows', () => {
  if (!mainWindow) {
    mainWindow = createMainWindow();
  }
});

app.on('ready', () => {
  mainWindow = createMainWindow();
});


// 'use strict';

// const electron = require('electron');
// const fs = require('fs');
// // Module to control application life.
// const app = electron.app;
// // Module to create native browser window.
// const BrowserWindow = electron.BrowserWindow;

// // Keep a global reference of the window object, if you don't, the window will
// // be closed automatically when the JavaScript object is garbage collected.
// let mainWindow;

// function createWindow () {
//   // Create the browser window.
//   mainWindow = new BrowserWindow({width: 800, height: 600});

//   // and load the index.html of the app.
//   mainWindow.loadURL('file://' + __dirname + '/app/index.html');

//   // Open the DevTools.
//   mainWindow.webContents.openDevTools();

//   // Emitted when the window is closed.
//   mainWindow.on('closed', function() {
//     // Dereference the window object, usually you would store windows
//     // in an array if your app supports multi windows, this is the time
//     // when you should delete the corresponding element.
//     mainWindow = null;
//   });
// }

// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// app.on('ready', createWindow);

// // Quit when all windows are closed.
// app.on('window-all-closed', function () {
//   // On OS X it is common for applications and their menu bar
//   // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', function () {
//   // On OS X it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (mainWindow === null) {
//     createWindow();
//   }
// });

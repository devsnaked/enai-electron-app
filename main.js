// Modules to control application life and create native browser window
const {app, BrowserWindow, webContents, ipcMain} = require('electron');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
const fs = require('fs');
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1400, height: 900, fullscreen: true})

  // and load the index.html of the app.
  mainWindow.loadURL('https://testscale-7e0d6.firebaseapp.com/');
  mainWindow.on('show', () => { });

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })


  ipcMain.on('print-cracha', data => {
    mainWindow.webContents.print({
      deviceName: 'Officejet_Pro_8600_314EB2_',
      silent: true
    }, flag => {
      mainWindow.webContents.send('printed');
    });
//     mainWindow.webContents.printToPDF({
//       marginsType:0, pageSize: 'A5',
//     },  function (error, data) {
//       if (error) throw error
//       fs.writeFile('/home/leonardovff/electron/output.pdf', data, (error) => {

//       })
//       console.log(data);
//     });
  })

  // console.log(mainWindow.webContents.print({
  //   silent: true,
  //   deviceName: 'Officejet_Pro_8600',
  //   printBackground: true
//   setTimeout(()=>{
//
//   }, 10000);
  // console.log(mainWindow.webContents.getPrinters());
  // console.log(mainWindow.webContents.print({
  //   deviceName: 'Officejet_Pro_8600_314EB2_'
  // }))
  // mainWindow.webContents.on('found-in-page', (event, result) => {
  //   console.log(webContents)
  //   // if (result.finalUpdate) webContents.stopFindInPage('clearSelection')
  // })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

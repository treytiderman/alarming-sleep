const { app, BrowserWindow, Menu } = require('electron');

// Start Express server
const serverApp = require('../app');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) app.quit();

let mainWindow;
const createWindow = () => { setTimeout(() => {
  // Main Window
  mainWindow = new BrowserWindow({
    width: 600,
    height: 800,
    autoHideMenuBar: true, // Press alt to see menu
    backgroundColor: '#222222'
  });
  mainWindow.loadURL('http://localhost:42069/')
  mainWindow.on('show', () => {
    setTimeout(() => clockWindow.focus(), 200);
  });
  
  // Remove Help from default menu
  const menu = Menu.getApplicationMenu()
  const items = menu?.items.filter((item) => item.role !== 'help')
  Menu.setApplicationMenu(Menu.buildFromTemplate(items))
}, 4000) };

// Events
app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

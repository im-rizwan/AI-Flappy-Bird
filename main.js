const path = require('path');
const fs = require('fs');
const {app, BrowserWindow, ipcMain} = require('electron');
function createMainWindow () {
  const mainWindow= new BrowserWindow({
    title: 'Flappy bird',
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, './preload.js'),
        nodeIntegration: true,
        contextIsolation: true,
    }
    
});
mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

app.whenReady().then(()=>{

    createMainWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createMainWindow();
        }
      })
});
app.on('window-all-closed', function () { 
    if (process.platform !== 'darwin') app.quit();
}
);
ipcMain.on("file:upload",(e,data)=>{
   console.log(JSON.stringify(data));
   const filePath = data.jfile;
const fixedFilePath = filePath.replace(/\\/g, '/');
   fs.readFile(fixedFilePath, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const jsonData = JSON.parse(data);
    console.log(jsonData); // use jsonData variable to access the contents of the JSON file
    // Get the current renderer window
    
    const win = BrowserWindow.getFocusedWindow();
    // Send the JSON data to the renderer process
    win.webContents.send('jsonData',jsonData);
  }); 
});  

 console.log("from here");  
 //

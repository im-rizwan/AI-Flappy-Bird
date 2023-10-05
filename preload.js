const os = require('os');
const path = require('path');
const fs = require('fs');
const { contextBridge,ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('os', {
  homedir:()=>os.homedir(),
  // we can also expose variables, not just functions
});
contextBridge.exposeInMainWorld('path', {
    join:(...args)=>path.join(...args),
    // we can also expose variables, not just functions
  });
  contextBridge.exposeInMainWorld('ipcRenderer', {
    send:(channel,data)=>ipcRenderer.send(channel,data),
    on:(channel,func)=>ipcRenderer.on(channel,(event,...args)=>func(...args)),

    // we can also expose variables, not just functions
  });
  contextBridge.exposeInMainWorld('fs', {
    readFileSync:(...args)=>fs.readFileSync(...args),
    // we can also expose variables, not just functions
  });
import { app, BrowserWindow, ipcMain } from "electron";

import path from "path";

import { fileURLToPath } from "url";
// this cuz in es6  module w ecant have path directly 
const __filename = fileURLToPath(import.meta.url);// curr import.meta.urlent  current js url pathe
const __dirname = path.dirname(__filename);


function createWindow(){
    const win = new BrowserWindow({
        width:1000,
        height:700,

        webPreferences :{
            preload:path.join(__dirname,"preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
        }
    })

    win.loadURL("http://localhost:5173/")
}

app.whenReady().then(()=>{
    createWindow();
})
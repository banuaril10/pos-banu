const {app, BrowserWindow,ipcMain: ipc,shell,globalShortcut } = require('electron');
const os=require('os');
const fs = require("fs");
const path = require("path");
const crypto = require('crypto');
const secret = 'marinuak';
var macaddress = require('macaddress');
const is = require("electron-is");

var os_val = "No OS detected";
var platform = os.platform();

if (platform === 'linux') {
  os_val = "Linux";
}else if (platform === 'darwin') {
  os_val = "Mac";
}else if (platform === 'win32') {
  os_val = "Windows";
}

openApps(os_val);

function openApps(os_val){
  var exec = require("child_process").execFile;

  if (os_val == "Windows") {
    exec(
      app.getPath("documents") + "/pos/posserver-win.exe",
      function (err, data) {
        console.log(err);
        console.log(data.toString());
      }
    );
  }else if(os_val == "Linux"){
    exec(
      app.getPath("documents") + "/server/dist/posserver_214",
      function (err, data) {
        console.log(err);
        console.log(data.toString());
      }
    );
  }
}




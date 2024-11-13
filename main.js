
const setupEvents = require('./installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
}
 
const {app, BrowserWindow,ipcMain: ipc,shell,globalShortcut } = require('electron');
const debug = require('electron-debug');
const modal = require('electron-modal');
const os=require('os');
const Store = require('electron-store');
const store = new Store();
const fs = require("fs");
const path = require("path");
const crypto = require('crypto');
const secret = 'marinuak';
var macaddress = require('macaddress');
const is = require("electron-is");


const { autoUpdater } = require('electron-updater');
const { error } = require('console');

var os_val = "No OS detected";
var platform = os.platform();

if (platform === 'linux') {
  os_val = "Linux";
}else if (platform === 'darwin') {
  os_val = "Mac";
}else if (platform === 'win32') {
  os_val = "Windows";
}

function getconfig(){
  var strconfig = fs.readFileSync(app.getPath('documents')+'/pos/config.ini');
  store.set("path_documents", app.getPath("documents")+'/pos');


  // var strconfig_printer = fs.readFileSync(app.getPath('documents')+'/pos/printer.ini');
  
  let json_printer = fs.readFileSync(app.getPath('documents')+'/pos/printer.json');
  //let json_config = fs.readFileSync(app.getPath("documents") + "/pos/confignew.json");
  let json_config = fs.readFileSync(app.getPath("documents") + "/pos/config.json");
  
  let strconfig_config = JSON.parse(json_config);
  store.set("domain", strconfig_config["domain"].toString());
  store.set("locationid", strconfig_config["organization"].toString());

  let strconfig_printer = JSON.parse(json_printer);
  

  // var strconfig = 'localhost';
  console.log('AAAA',strconfig.toString(), app.getPath('documents'));
  
  //live
  //store.set('api', 'http://'+strconfig.toString()+':8080/api');
  //test
  if (os_val === "Windows") {
    store.set("api", "http://" + strconfig.toString() + "/api");
  } else {
    store.set("api", "http://" + strconfig.toString() + ":8080/api");
  }



   store.set('ip_printer', strconfig_printer['ip_printer'].toString());
   store.set('jenis_printer', strconfig_printer['jenis_printer'].toString());
   store.set('ip_server', strconfig.toString());
   
   var base_url = strconfig.toString().split(":");
   let word = base_url[0];
   
   store.set('api_storeapps', word.toString());
   
   console.log('AAAABBBB',strconfig_printer['ip_printer'].toString());
   console.log('api store apps',word.toString());
   // alert(strconfig_printer['ip_printer'].toString());
 // store.set('api', 'http://'+strconfig.toString()+':3001/api');
};

getconfig();

macaddress.one(function (err, mac) {
  console.log("Mac address for this host: %s", mac); 
  store.set('mac',mac); 
});


//debug();
let mainWindow;
//let workerWindow;
function createWindow () {
  // Create the browser window.

   mainWindow = new BrowserWindow({
     fullscreen: true,
     zoomFactor: 0.2,
     width: 1000,
     height: 600,
     icon: path.join(__dirname, "assets/icons/png/icon.png"),
     webPreferences: {
       preload: path.join(__dirname, "load.js"),
       nodeIntegration: true,
       nativeWindowOpen: true,
       contextIsolation: false,
       enableRemoteModule: true,
     },
   });

  // and load the index.html of the app.
  mainWindow.loadFile('./app/register.html')
 // mainWindow.loadFile('./app/test.html')


//modal window
  mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
    if (frameName === 'modal') {
      // open window as modal
      event.preventDefault()
      Object.assign(options, {
        modal: true,
        parent: mainWindow,
        width: 100,
        height: 100
      })
      event.newGuest = new BrowserWindow(options)
    }
  });

  // Open the DevTools.
 //  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });

  globalShortcut.register('f9', function() {
		console.log('f9 is pressed')
		mainWindow.reload()
	})
	
	
	mainWindow.once('ready-to-show', () => {
		autoUpdater.checkForUpdatesAndNotify();
	});

}

function createWindowPriceTag(texthtml) {
  // Create the browser window.

  mainWindow = new BrowserWindow({
    fullscreen: false,
    width: 1000,
    height: 600,
    icon: path.join(__dirname, "assets/icons/png/icon.png"),
    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen: true,
      contextIsolation: false,
      enableRemoteModule: true,

      //  devTools: false
    },
  });

  mainWindow.loadFile("./app/register.html");
  // load text html
  // mainWindow.loadURL(`data:text/html;charset=utf-8,${texthtml}`);
  
  //modal window
  mainWindow.webContents.on(
    "new-window",
    (event, url, frameName, disposition, options, additionalFeatures) => {
      if (frameName === "modal") {
        // open window as modal
        event.preventDefault();
        Object.assign(options, {
          modal: true,
          parent: mainWindow,
          width: 100,
          height: 100,
        });
        event.newGuest = new BrowserWindow(options);
      }
    }
  );

  // Open the DevTools.
  //  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  globalShortcut.register("f9", function () {
    console.log("f9 is pressed");
    mainWindow.reload();
  });
}



function gethome(){
  store.set('print_path', app.getPath('documents'));
}


//open apps posserver-win.exe from documents
function openApps(os_val) {
  var exec = require("child_process").execFile;

  if (os_val == "Windows") {
    exec(
      app.getPath("documents") + "/pos/posserver-win.exe",
      function (err, data) {
        console.log(err);
        console.log(data.toString());
      }
    );
  }
  // else if(os_val == "Linux"){
  //   exec(
  //     app.getPath("documents") + "/server/dist/posserver_214",
  //     function (err, data) {
  //       console.log(err);
  //       console.log(data.toString());
  //     }
  //   );
  // }
  createWindow();
  gethome();
  //reload page
  // mainWindow.reload();s
}


app.on('ready', function() {
  openApps(os_val);
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
});

// ipc.on("send-window-id", (event) => {
  // event.sender.send("window-id-sent", mainWindow.id);
// });

// app.on('activate', function () {
  // if (mainWindow === null) createWindow()
// });

// ipcMain.on('app_version', (event) => {
  // event.sender.send('app_version', { version: app.getVersion() });
// });


// autoUpdater.on('update-available', () => {
  // mainWindow.webContents.send('update_available');
// });
// autoUpdater.on('update-downloaded', () => {
  // mainWindow.webContents.send('update_downloaded');
// });

// ipcMain.on('restart_app', () => {
  // autoUpdater.quitAndInstall();
// });
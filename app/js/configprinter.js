const {app} = require("electron");

require("jquery");
require("popper.js");
require("bootstrap");
const { show } = require("electron-modal");
var $ = require("jquery");

var cashierid = "";
var ad_org_id = "";
var userid = "";
var username = "";
var useridval = "";
var strsalesdate = "";

// get cashier information
$("#loaderpos").html(
  "<img id='loading-image' src='./img/loading2.gif' alt='Loading...' />"
);
getinfo();
$("#loaderpos").hide();

var usersupervisor = $("#usersupervisor").val();

function getinfo() {
  var objinfo = JSON.parse(localStorage.getItem("info"));
  var objuser = JSON.parse(localStorage.getItem("user"));
  cashierid = objinfo.cashierid;
  userid = objuser.id;
  useridval = objuser.userid;
  username = objuser.username;
  ad_org_id = objinfo.ad_morg_key;
  divshopname.innerHTML = objinfo.shopname;
  divcashiername.innerHTML = objuser.username;
  // divcashiername.innerHTML =  objinfo.cashiername;
}

var isDialogSupported = true;
if (!window.HTMLDialogElement) {
  document.body.classList.add("no-dialog");
  isDialogSupported = false;
}

// log out
const btnback = document.getElementById("btnback");
btnback.addEventListener("click", function (event) {
  window.location.href = `file:///${__dirname}/home.html`;
});

const btntestprint = document.getElementById("btntestprint");
btntestprint.addEventListener("click", async function (event) {
  test_print();
});

const btnsaveconfig = document.getElementById("btnsaveconfig");
btnsaveconfig.addEventListener("click", async function (event) {
  save_config();
});

load_config();
function save_config() {
  var fs = require("fs");
  var path = require("path");
  var app = require("electron").remote.app;

  let ip_printer = document.getElementById("ip_printer").value;
  let jenis_printer = document.getElementById("jenis_printer").value;
  let data = {
    ip_printer: ip_printer,
    jenis_printer: jenis_printer,
    keterangan:
      "untuk jenis_printer ketik thermal untuk printer thermal pos58 dan dot untuk tmu",
  };
  let json = JSON.stringify(data);
  fs.writeFileSync(
    app.getPath("documents") + "/pos/printer.json",
    json,
    "utf8"
  );
  load_config();
  alert("Konfigurasi printer berhasil disimpan");
}

function load_config() {
    var fs = require("fs");
    var path = require("path");
    var app = require("electron").remote.app;
    const Store = require("electron-store");
    const store = new Store();
    let json_printer = fs.readFileSync(
      app.getPath("documents") + "/pos/printer.json"
    );

    let strconfig_printer = JSON.parse(json_printer);
    store.set("ip_printer", strconfig_printer["ip_printer"].toString());
    store.set("jenis_printer", strconfig_printer["jenis_printer"].toString());

    document.getElementById("ip_printer").value =
      strconfig_printer["ip_printer"].toString();
    document.getElementById("jenis_printer").value =
      strconfig_printer["jenis_printer"].toString();

  //   {
  //     "ip_printer": "localhost",
  //     "jenis_printer":"dot",
  //     "keterangan":"untuk jenis_printer ketik thermal untuk printer thermal pos58 dan dot untuk tmu"
  // }

  //from printer.json
}

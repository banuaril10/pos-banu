require("jquery");
require("popper.js");
require("bootstrap");
var $ = require("jquery");

// get cashier information
$("#loaderpos").html(
  "<img id='loading-image' src='./img/loading2.gif' alt='Loading...' />"
);
getinfo();
getproductinfo();
$("#loaderpos").hide();

function getinfo() {
  var objinfo = JSON.parse(localStorage.getItem("info"));
  divshopname.innerHTML = objinfo.shopname;
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

const btnproductcategorysync = document.getElementById(
  "btnproductcategorysync"
);
const btnpromoreguler = document.getElementById("btnpromoreguler");
const btnpromobuyget = document.getElementById("btnpromobuyget");
const btnpromogrosir = document.getElementById("btnpromogrosir");
const btnpromocode = document.getElementById("btnpromocode");
const btnbanksync = document.getElementById("btnbanksync");
const btnedcsync = document.getElementById("btnedcsync");
const btnusersync = document.getElementById("btnusersync");
const btnprofilesync = document.getElementById("btnprofilesync");
const btnsyncitems = document.getElementById("btnsyncitems");
const btnproductstocksync = document.getElementById("btnproductstocksync");
const btnproductbarcode = document.getElementById("btnproductbarcode");
const btnproductshortcut = document.getElementById("btnproductshortcut");
const btnproductpricesync = document.getElementById("btnproductpricesync");
const btnracksync = document.getElementById("btnracksync");

btnproductpricesync.addEventListener("click", async function (event) {
  sync_price();
});

btnracksync.addEventListener("click", async function (event) {
  sync_rack();
});

btnproductbarcode.addEventListener("click", async function (event) {
  sync_barcode();
});

btnproductshortcut.addEventListener("click", async function (event) {
  sync_shortcut();
});

btnproductcategorysync.addEventListener("click", async function (event) {
  sync_category();
  sync_category_sub();
  sync_category_subitem();
});

btnpromoreguler.addEventListener("click", async function (event) {
  sync_promo_reguler();
});

btnpromobuyget.addEventListener("click", async function (event) {
  sync_promo_buyget();
});

btnpromogrosir.addEventListener("click", async function (event) {
  sync_promo_grosir();
});

btnpromocode.addEventListener("click", async function (event) {
  sync_promo_code();
});

btnbanksync.addEventListener("click", async function (event) {
  sync_bank();
});

btnedcsync.addEventListener("click", async function (event) {
  sync_edc();
});

btnusersync.addEventListener("click", async function (event) {
  sync_users();
});

btnprofilesync.addEventListener("click", async function (event) {
  sync_profile();
});

btnsyncitems.addEventListener("click", async function (event) {
  sync_items();
});

btnproductstocksync.addEventListener("click", async function (event) {
  sync_stock();
});


function sync_price() {
  $.ajax({
    url: "http://" + api_storeapps + "/pi_cyber/api/cyber/sync_price.php",
    type: "GET",
    beforeSend: function () {
      $("#statussync").html("proses sync");
    },
    async: false,
    success: function (dataResult) {
      console.log(dataResult);
      var dataResult = JSON.parse(dataResult);
      alert(dataResult.message);
    },
  });
}

function sync_rack() {
  $.ajax({
    url: "http://" + api_storeapps + "/pi_cyber/api/cyber/sync_rack.php",
    type: "GET",
    beforeSend: function () {
      $("#statussync").html("proses sync rack");
    },
    async: false,
    success: function (dataResult) {
      console.log(dataResult);
      var dataResult = JSON.parse(dataResult);
      alert(dataResult.message);
    },
  });
}

function sync_barcode() {
  $.ajax({
    url: "http://" + api_storeapps + "/pi_cyber/api/cyber/sync_barcode.php",
    type: "GET",
    beforeSend: function () {
      $("#statussync").html("proses sync stock");
    },
    async: false,
    success: function (dataResult) {
      console.log(dataResult);
      var dataResult = JSON.parse(dataResult);
      alert(dataResult.message);
    },
  });
}

function sync_shortcut() {
  $.ajax({
    url: "http://" + api_storeapps + "/pi_cyber/api/cyber/sync_shortcut.php",
    type: "GET",
    beforeSend: function () {
      $("#statussync").html("proses sync shortcut");
    },
    async: false,
    success: function (dataResult) {
      console.log(dataResult);
      var dataResult = JSON.parse(dataResult);
      alert(dataResult.message);
    },
  });
}

function sync_stock() {
  $("#statussync").html("proses sync stock...");
  $.ajax({
    url: "http://" + api_storeapps + "/pi_cyber/api/cyber/sync_stock.php",
    type: "GET",
    beforeSend: function () {
      $("#statussync").html("proses sync stock");
    },
    async: false,
    success: function (dataResult) {
      console.log(dataResult);
      var dataResult = JSON.parse(dataResult);
      alert(dataResult.message);
    },
  });
}

function sync_category() {
  $("#statussync").html("proses sync category...");
  $.ajax({
    url: "http://" + api_storeapps + "/pi_cyber/api/cyber/sync_category.php",
    type: "GET",
    beforeSend: function () {
      $("#statussync").html("proses sync category");
    },
    async: false,
    success: function (dataResult) {
      console.log(dataResult);
    },
  });
}

function sync_category_sub() {
  $("#statussync").html("proses sync sub category...");
  $.ajax({
    url:
      "http://" + api_storeapps + "/pi_cyber/api/cyber/sync_category_sub.php",
    type: "GET",
    async: false,
    success: function (dataResult) {
      console.log(dataResult);
    },
  });
}

function sync_category_subitem() {
  $("#statussync").html("proses sync sub category items...");
  $.ajax({
    url:
      "http://" +
      api_storeapps +
      "/pi_cyber/api/cyber/sync_category_subitem.php",
    type: "GET",
    async: false,
    success: function (dataResult) {
      console.log(dataResult);

      var dataResult = JSON.parse(dataResult);
      alert(dataResult.message);
      //$('#statussync').html(dataResult.message);
    },
  });
}

function sync_promo_reguler() {
  $.ajax({
    url:
      "http://" + api_storeapps + "/pi_cyber/api/cyber/sync_promo_reguler.php",
    type: "GET",
    async: false,
    success: function (dataResult) {
      console.log(dataResult);

      var dataResult = JSON.parse(dataResult);
      alert(dataResult.message);
    },
  });
}

function sync_promo_buyget() {
  $.ajax({
    url:
      "http://" + api_storeapps + "/pi_cyber/api/cyber/sync_promo_buyget.php",
    type: "GET",
    async: false,
    success: function (dataResult) {
      console.log(dataResult);

      var dataResult = JSON.parse(dataResult);
      alert(dataResult.message);
    },
  });
}

function sync_promo_grosir() {
  $.ajax({
    url:
      "http://" + api_storeapps + "/pi_cyber/api/cyber/sync_promo_grosir.php",
    type: "GET",
    async: false,
    success: function (dataResult) {
      console.log(dataResult);

      var dataResult = JSON.parse(dataResult);
      alert(dataResult.message);
    },
  });
}

function sync_promo_code() {
  $.ajax({
    url: "http://" + api_storeapps + "/pi_cyber/api/cyber/sync_promo_code.php",
    type: "GET",
    async: false,
    success: function (dataResult) {
      console.log(dataResult);

      var dataResult = JSON.parse(dataResult);
      alert(dataResult.message);
    },
  });
}

function sync_bank() {
  $.ajax({
    url: "http://" + api_storeapps + "/pi_cyber/api/cyber/sync_bank.php",
    type: "GET",
    async: false,
    success: function (dataResult) {
      console.log(dataResult);

      var dataResult = JSON.parse(dataResult);
      alert(dataResult.message);
    },
  });
}

function sync_edc() {
  $.ajax({
    url: "http://" + api_storeapps + "/pi_cyber/api/cyber/sync_edc.php",
    type: "GET",
    async: false,
    success: function (dataResult) {
      console.log(dataResult);

      var dataResult = JSON.parse(dataResult);
      alert(dataResult.message);
    },
  });
}

function sync_users() {
  $.ajax({
    url: "http://" + api_storeapps + "/pi_cyber/api/cyber/sync_users.php",
    type: "GET",
    async: false,
    success: function (dataResult) {
      console.log(dataResult);

      var dataResult = JSON.parse(dataResult);
      alert(dataResult.message);
    },
  });
}

function sync_profile() {
  $("#statussync").html("proses sync category...");
  $.ajax({
    url: "http://" + api_storeapps + "/pi_cyber/api/cyber/sync_profile.php",
    type: "GET",
    beforeSend: function () {
      $("#statussync").html("proses sync profile");
    },
    async: false,
    success: function (dataResult) {
      console.log(dataResult);

      var dataResult = JSON.parse(dataResult);
      alert(dataResult.message);
    },
  });
}

function sync_items() {
  $("#statussync").html("proses sync category...");
  $.ajax({
    url: "http://" + api_storeapps + "/pi_cyber/api/cyber/sync_items.php",
    type: "GET",
    beforeSend: function () {
      $("#statussync").html("proses sync items");
    },
    async: false,
    success: function (dataResult) {
      console.log(dataResult);

      var dataResult = JSON.parse(dataResult);
      alert(dataResult.message);
    },
  });
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Sync Product
// const btnproductsync=document.getElementById('btnproductsync');
// btnproductsync.addEventListener('click',async function (event){

//   var objsync= await post_async_auth_data("/pos/tablecount",{api:api_url,f1:'',f2:'pos_mproduct'},true);
//    if (objsync.count>0){
//     $('#loaderpos').show();

//      var intloop=0;
//      var intlimit=1000;
//     for (var i = 0; i <= objsync.count; i=i+intlimit) {
//       var objsyncsub= await post_async_auth_data("/pos/tabledata",{api:api_url,f1:'',f2:'proc_pos_mproduct_all_sync_view',f3:'pos_mproduct_sync',f4:intlimit,f5:intloop*intlimit},false);
//        intloop++;
//      };
//     $("#loaderpos").hide();
//     getproductinfo();
//     $('#tableproduct').DataTable().ajax.reload();
//   };

// });

// const btnproductpricesync = document.getElementById("btnproductpricesync");
// btnproductpricesync.addEventListener("click", async function (event) {
//   var objsync = await post_async_auth_data(
//     "/pos/tablecount",
//     { api: api_url, f1: "", f2: "pos_mproductprice" },
//     true
//   );
//   if (objsync.count > 0) {
//     $("#loaderpos").show();
//     var intloop = 0;
//     var intlimit = 1000;
//     for (var i = 0; i <= objsync.count; i = i + intlimit) {
//       var objsyncsub = await post_async_auth_data(
//         "/pos/tabledata",
//         {
//           api: api_url,
//           f1: "",
//           f2: "proc_pos_mproductprice_sync_view",
//           f3: "pos_mproductprice_sync",
//           f4: intlimit,
//           f5: intloop * intlimit,
//         },
//         false
//       );
//       intloop++;
//     }
//     $("#loaderpos").hide();
//     getproductinfo();
//     $("#tableproduct").DataTable().ajax.reload();
//   }
// });

// const btnproductdiscountsync=document.getElementById('btnproductdiscountsync');
// btnproductdiscountsync.addEventListener('click',async function (event){
// var intloop=0;
// var intlimit=500;
// $('#loaderpos').show();
// var objsyncdiscount=await post_async_auth_data("/pos/tabledata",{api:api_url,f1:'',f2:'proc_pos_mproductdiscount_sync_view',f3:'pos_mproductdiscount_sync',f4:100000,f5:0},false);
// var objsyncdiscountmember=await post_async_auth_data("/pos/tabledata",{api:api_url,f1:'',f2:'proc_pos_mproductdiscountmember_sync_view',f3:'pos_mproductdiscountmember_sync',f4:10000,f5:0},false);
// var objsyncnosale=await post_async_auth_data("/pos/tabledata",{api:api_url,f1:'',f2:'proc_pos_mproductnosale_sync_view',f3:'pos_mproductnosale_sync',f4:10000,f5:0},false);
// var objsyncbuyget=await post_async_auth_data("/pos/tabledata",{api:api_url,f1:'',f2:'proc_pos_mproductbuyget_sync_view',f3:'pos_mproductbuyget_sync',f4:10000,f5:0},false);
// $("#loaderpos").hide();

// getproductinfo();
// $('#tableproduct').DataTable().ajax.reload();
// });

// const btnproductstock=document.getElementById('btnproductstock');
// btnproductstock.addEventListener('click', async function (event){
// var objsync= await post_async_auth_data("/pos/tablecount",{api:api_url,f1:'',f2:'pos_mproductlocator'},true);
// if (objsync.count>0){
// $('#loaderpos').show();
// var intloop=0;
// var intlimit=1000;
// for (var i = 0; i < objsync.count; i=i+intlimit) {
// var objsyncstock=await post_async_auth_data("/pos/tabledata",{api:api_url,f1:'',f2:'proc_pos_mproductlocator_sync_view',f3:'pos_mproductlocator_sync',f4:intlimit,f5:intloop*intlimit},false);
// intloop++;
// };
// $("#loaderpos").hide();
// getproductinfo();
// $('#tableproduct').DataTable().ajax.reload();
// };
// });

// const btnproductshortcut=document.getElementById('btnproductshortcut');
// btnproductshortcut.addEventListener('click',async function (event){
//       $('#loaderpos').show();
//         var objsyncsub=await post_async_auth_data("/pos/tabledata",{api:api_url,f1:'',f2:'proc_pos_mproductshortcut_sync_view',f3:'pos_mproductshortcut_sync',f4:10000,f5:0},false);
//       $("#loaderpos").hide();
//       getproductinfo();
//       $('#tableproduct').DataTable().ajax.reload();

// });

function getproductinfo() {
  $.ajax({
    url: "http://" + api_storeapps + "/pi_cyber/api/cyber/get_product_info.php",
    type: "GET",
    async: false,
    success: function (dataResult) {
      console.log(dataResult);
      var dataResult = JSON.parse(dataResult);
      $("#divinttotal").html(dataResult.total_product);
      $("#divintdiscount").html(dataResult.total_product_discount);
    },
  });
  // var objproductinfo=get_auth_data("/pos/mproduct_info",{},false);
  // if (objproductinfo.result=='Success' && objproductinfo.data !=null) {
  // $.each(objproductinfo.data, function (i,item) {
  // $('#divinttotal').html(item.inttotal);
  // $('#divintdiscount').html(item.intdiscount);
  // $('#divintnosale').html(item.intnosale);
  // $('#divintmemberdiscount').html(item.intdiscountmember);

  // });
  // };
}

var producttable = $("#tableproduct").DataTable({
  sDom:
    "<'dt-toolbar'<'col-sm-6' <'toolbar'>><'col-sm-12'f>>" +
    "t" +
    "<'dt-toolbar-footer'<'col-sm-2 col-xs-2 hidden-xs'l><'col-sm-4 col-xs-4 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
  oLanguage: {
    sSearch:
      '<span class="input-group-addon"><i class="fa fa-search"></i></span>',
  },
  scrollX: false,
  autoWidth: true,
  processing: true,
  serverSide: true,
  ajax: {
    url: api_url + "/pos/table?f1=pos_mproduct_all_view&f2=",
    type: "POST",
    dataType: "json",
    contentType: "application/json",
    headers: { Authorization: localStorage.getItem("token").replace('"', "") },
    data: function (d) {
      return JSON.stringify(d);
    },
  },
  language: {
    loadingRecords: "&nbsp;",
    processing: "Lagi Loading...",
  },
  columns: [
    {
      data: "sku",
      render: function (data, type, full, meta) {
        //check checked product from local storage
        if (localStorage.getItem("arrproduct") != null) {
          var arrproduct = JSON.parse(localStorage.getItem("arrproduct"));
          if (arrproduct.includes(data)) {
            return (
              '<input type="checkbox" name="chkproduct" value="' +
              data +
              '" checked>'
            );
          } else {
            return (
              '<input type="checkbox" name="chkproduct" value="' + data + '">'
            );
          }
        } else {
          return (
            '<input type="checkbox" name="chkproduct" value="' + data + '">'
          );
        }
        // return '<input type="checkbox" name="chkproduct" value="'+data+'">';
      },
    },
    { data: "sku" },
    { data: "name" },
    { data: "price", className: "text-right" },
    { data: "discount", className: "text-right" },
    { data: "discount_member", className: "text-right" },
    { data: "stockqty", className: "text-right" },
    { data: "shortcut", className: "text-center" },
    { data: "isnosale", className: "text-center" },
    { data: "rack", className: "text-center" },
    { data: "buygetremark", className: "text-center" },
  ],
});

// btncheckall and save checked product from datatable to local storage
const btncheckall = document.getElementById("btncheckall");
btncheckall.addEventListener("click", function (event) {
  var chkproduct = document.getElementsByName("chkproduct");
  var arrproduct = [];

  if (localStorage.getItem("arrproduct") != null) {
    arrproduct = JSON.parse(localStorage.getItem("arrproduct"));
  }

  for (var i = 0; i < chkproduct.length; i++) {
    //check if product is already in local storage
    if (arrproduct.includes(chkproduct[i].value)) {
      //uncheck product
      chkproduct[i].checked = false;
      //remove product from local storage
      arrproduct.splice(arrproduct.indexOf(chkproduct[i].value), 1);
    } else {
      //checked product
      chkproduct[i].checked = true;
      //add product to local storage
      arrproduct.push(chkproduct[i].value);
    }
  }

  localStorage.setItem("arrproduct", JSON.stringify(arrproduct));
  console.log(localStorage.getItem("arrproduct"));
});

// btnuncheckall;
const btnuncheckall = document.getElementById("btnuncheckall");
btnuncheckall.addEventListener("click", function (event) {
  var chkproduct = document.getElementsByName("chkproduct");
  var arrproduct = [];
  var arrproductnull = [];

  if (localStorage.getItem("arrproduct") != null) {
    arrproduct = JSON.parse(localStorage.getItem("arrproduct"));
  }

  for (var i = 0; i < chkproduct.length; i++) {
    if (arrproduct.includes(chkproduct[i].value)) {
      chkproduct[i].checked = false;
      //arrproduct.splice(arrproduct.indexOf(chkproduct[i].value),1);
    }
  }

  localStorage.setItem("arrproduct", JSON.stringify(arrproductnull));
  // localStorage.setItem('arrproduct',JSON.stringify(arrproduct));
  // console.log(localStorage.getItem('arrproduct'));
});

//checked product from local storage
function checkproduct() {
  var chkproduct = document.getElementsByName("chkproduct");
  var arrproduct = [];
  if (localStorage.getItem("arrproduct") != null) {
    arrproduct = JSON.parse(localStorage.getItem("arrproduct"));
  }

  for (var i = 0; i < chkproduct.length; i++) {
    if (arrproduct.includes(chkproduct[i].value)) {
      chkproduct[i].checked = true;
    }
  }
}

// btnproductcategorysync.addEventListener('click',async function (event){
// var objsync= await post_async_auth_data("/pos/tablecount",{api:api_url,f1:'erp',f2:'m_product_category'},true);
// if (objsync.count>0){
// $('#loaderpos').show();
// var intloop=0;
// var intlimit=500;
// for (var i = 0; i < objsync.count; i=i+intlimit) {
// await post_async_auth_data("/pos/tabledata",{api:api_url,f1:'erp',f2:'proc_m_product_category_sync_view',f3:'pos_mproductcategory_sync',f4:intlimit,f5:intloop*intlimit},true);
// intloop++;
// };
// intloop=0;
// for (var i = 0; i < objsync.count; i=i+intlimit) {
// await post_async_auth_data("/pos/tabledata",{api:api_url,f1:'erp',f2:'proc_m_product_category_sub_sync_view',f3:'pos_mproductcategorysub_sync',f4:intlimit,f5:intloop*intlimit},true);
// intloop++;
// };
// $("#loaderpos").hide();
// getproductinfo();
// $('#tableproduct').DataTable().ajax.reload();
// };
// });

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

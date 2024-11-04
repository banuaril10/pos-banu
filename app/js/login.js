
require("jquery");
require('popper.js');
require('bootstrap');
var $ = require("jquery");
var cashierid="0";

$('#print_path').html(has);
$('#userid').focus();
 //Login Action
 $(function () {
  // Validation
  $("#login_form").validate({
      // Rules for form validation
      rules: {
          userid: {
              required: true
          },
          userpwd: {
              required: true,
              minlength: 1,
              maxlength: 20
          }
      },

      // Messages for form validation
      messages: {
        userid: {
              required: 'Please enter your User ID'
          },
          userpwd: {
              required: 'Please enter your password'
          }
      },

      // Do not change code below
      errorPlacement: function (error, element) {
          error.insertAfter(element.parent());
      }
  });

  $('#login_form').on('submit', function (e) {
      e.preventDefault();
      var objlogin=post_data('/pos/auth',{ f1: $('#userid').val(), f2: $('#userpwd').val(), f3: cashierid },false);
    if (objlogin.success) {
        localStorage.setItem('user', JSON.stringify(objlogin.user));
        localStorage.setItem('info', JSON.stringify(objlogin.info));
        localStorage.setItem('token', 'Bearer '+JSON.stringify(objlogin.token).replace('"',''));
        window.location.href =`file:///${__dirname}/home.html`;
        } else {
        $('#login_form').find('.alert').html(objlogin.data).show();
    };
  });

 
});


$('a[href="#exit"]').click(function(){
        window.close();
  }); 


 // Get Shop
 const divshopname=document.getElementById('divshopname');
getcashier();
function getcashier(){
 var objcashier=get_data("/pos/mcashier",{ f1: has },false);
 $.each(objcashier.data, function (i,item) {
          divshopname.innerHTML =  item.shopname;
           divcashiername.innerHTML = item.name + " (" + platform + ")";
           cashierid=item.id;
   });
   if (objcashier.data==null) {
      window.location.href =`file:///${__dirname}/register.html`;
   }
 }
 
 
const notification = document.getElementById('notification');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart-button');
ipcRenderer.on('update_available', () => {
  ipcRenderer.removeAllListeners('update_available');
  message.innerText = 'A new update is available. Downloading now...';
  notification.classList.remove('hidden');
});
ipcRenderer.on('update_downloaded', () => {
  ipcRenderer.removeAllListeners('update_downloaded');
  message.innerText = 'Update Downloaded. It will be installed on restart. Restart now?';
  restartButton.classList.remove('hidden');
  notification.classList.remove('hidden');
});

function closeNotification() {
  notification.classList.add('hidden');
}
function restartApp() {
  ipcRenderer.send('restart_app');
}

get_version(version);
//get data ajax
function get_version(version) {
  $.ajax({
    url: "http://" + api_storeapps + "/pi/api/cyber/cek_version.php",
    type: "GET",
    success: function (dataResult) {
      console.log(dataResult);
      var dataResult = JSON.parse(dataResult);

      console.log(dataResult.version);
      if (dataResult.version != version) {
        // set div id cek-version
        document.getElementById("cek-version").innerHTML =
          "New Version Available, <a href='" +
          dataResult.link +
          "'>Download Now</a>";
        // set div id cek-version
        document.getElementById("cek-version").style.color = "red";
        // set div id cek-version
      } else {
        // set div id cek-version
        document.getElementById("cek-version").innerHTML =
          "Version " + version + " is up to date";
        // set div id cek-version
        document.getElementById("cek-version").style.color = "green";
        // set div id cek-version
      }
    },
  });
}
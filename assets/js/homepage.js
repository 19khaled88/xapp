


const rootUrl = 'https://api.ctgshop.com'
const rootWwwUrl = 'https://api.ctgshop.com'
// const rootUrl = 'https://condomshopbd.com'
// const rootWwwUrl = 'https://www.condomshopbd.com'

function getAndroidVersion() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera; // Get the user agent string

  // Check if the user agent contains the word 'Android'
  if (/Android/.test(userAgent)) {
      // Extract the Android version using a regular expression
      const versionMatch = userAgent.match(/Android\s([0-9\.]*)/);
      if (versionMatch && versionMatch[1]) {
          return versionMatch[1];
      }
  }
  // If no Android version is found, return 'Unknown'
  return "Unknown";
}

function getBrowserName() {
  const userAgent = navigator.userAgent.toLowerCase();

  // Check for Firefox
  if (userAgent.indexOf('firefox') > -1) {
    return "Firefox";

  // Check for Edge (new Chromium-based Edge)
  } else if (userAgent.indexOf('edg') > -1) {
    return "Edge";

  // Check for Chrome (and ensure it's not Edge)
  } else if (userAgent.indexOf('chrome') > -1 && userAgent.indexOf('edg') === -1) {
    return "Chrome";

  // Check for Safari (make sure it's not Chrome or Edge)
  } else if (userAgent.indexOf('safari') > -1 && userAgent.indexOf('chrome') === -1 && userAgent.indexOf('edg') === -1) {
    return "Safari";

  // Check for Opera
  } else if (userAgent.indexOf('opr') > -1 || userAgent.indexOf('opera') > -1) {
    return "Opera";

  // Check for Internet Explorer
  } else if (userAgent.indexOf('trident') > -1 || userAgent.indexOf('msie') > -1) {
    return "Internet Explorer";

  // Default to Unknown if no match
  } else {
    return "Unknown Browser";
  }
}


document.addEventListener("DOMContentLoaded", async function() {
  const devType = getDeviceType()
  const isWebV = isWebView()
  const devPlatform = navigator.platform
  const devBrowser = getBrowserName()
  const windowH = window.screen.height
  const windowW = window.screen.width
  const devDpi = window.devicePixelRatio
  const devVersion = getAndroidVersion()
  

  // const targetedUrl = `https://ctgshop.com/xapp/pages/HRM.html?class_name=hrmMain&data_title=hrmIcon&identity=${data.data.emCode}&name=${data.data.emName}&boss=${data.data.bossID}&bossName=&v=101`
  // window.location.href = targetedUrl
  

  try {
    
      // const platformDetails = await platformDes();
      // let platformDetailsObject = JSON.parse(platformDetails);
     let platformDetailsObject = {
         type      : devType,
         isWebView : isWebV,
         platform  : devPlatform,
         browser   : devBrowser,
         sHeight   : windowH,
         sWidth    : windowW,
         dpi       : devDpi
      }
      const queryString = new URLSearchParams(platformDetailsObject).toString();
    
     
      
      const includesValues = ['Linux armv71', 'Linux armv81', 'Linux aarch64', 'Linux i686', 'Linux x86_64'];
      const excludesValue = 'Win32';
      // Check if the platform includes any of the values in includesValues
      const includesMatch = includesValues.some(value => platformDetailsObject['platform'].includes(value));

      // Check if the platform does not include the excludesValue
      const excludesMatch = !platformDetailsObject['platform'].includes(excludesValue);    

      let type      = String(platformDetailsObject.type)
      let isWebView = String(platformDetailsObject.isWebView)
      let platform  = String(platformDetailsObject.platform)
      let browser   = String(platformDetailsObject.browser)
      let sHeight   = String(platformDetailsObject.sHeight)
      let sWidth    = String(platformDetailsObject.sWidth)
      let dpi       = String(platformDetailsObject.dpi)

      const hash = createHash( type,isWebView,platform, browser, sHeight,sWidth,dpi);
          
      await showLoading('loading');
      
      if (platformDetailsObject['type'] === 'iOS' && platformDetailsObject['isWebView'] === false && ['iPhone', 'iPad', 'iPod'].includes(platformDetailsObject['platform']) && platformDetailsObject['browser'] === 'Safari') {
            await showLoading('loading')
            const getData = await localStorageManager('get','xAppUserInfo');
            if(getData && getData.emPhone.length > 0 && getData.authid.length > 0){
              const postUrl = `${rootUrl}/xapi/dash_api.ashx?cmd=xloginauth`
              
              let formData = {};  // This initializes formData as an empty object
            
              formData.emPhone = getData.emPhone;
              formData.otp = "";
              formData.authid = getData.authid;
              formData.secretkey = hash

              let formObject = {};


              // Iterate through the formData object and add key-value pairs to formObject
              for (let key in formData) {
                  if (formData.hasOwnProperty(key)) {
                  formObject[key] = formData[key].toString();
                  }
              }
          
              var jsonString = JSON.stringify(formObject); // Convert formObject to a JSON string

              var form = new FormData(); // Create a new FormData object

              form.append("postData", jsonString); // Append the JSON string to the FormData object

              fetch(postUrl,{
                method:'POST',
                  body:form
              })
              .then(response=>{
                  if (!response.ok) {
                      throw new Error('Network response was not ok ' + response.statusText);
                  }
                  return response.json();
                  
              })
              .then(data=>{
                const targetedUrl = `https://ctgshop.com/xapp/pages/HRM.html?class_name=hrmMain&data_title=hrmIcon&identity=${data.data.emCode}&name=${data.data.emName}&boss=${data.data.bossID}&bossName=`
                window.location.href = targetedUrl
              
              })
              .catch(error=>{
                // console.log(error)
              })
            } else {
             await openModal(platformDetailsObject)
              // window.location.href = `https://ctgshop.com/xapp/pages/Otp.html?${queryString}`;
            }

      }
      else if(platformDetailsObject['type'] === 'Android' &&  platformDetailsObject['isWebView'] === false &&  (platformDetailsObject['browser'] === 'Chrome' || platformDetailsObject['browser'] === 'Safari')){
       
        let status = true;
          await showLoading('loading')
           if(status === true){
            
              const hash = createHash(
                type="Android",
                isWebView = "false",
                platform = "Linux armv81",
                browser = "Chrome",
                sHeight = "851",
                sWidth = "393",
                dpi = "2.75",
              )
             
              const getData = await localStorageManager('get','xAppUserInfo');
              
              // alert(JSON.stringify({'start time storage':getData,'start time session':sessionStorageManagerSync.getItem('xAppUserInfo')}))
              if(getData && getData.emPhone.length > 0 && getData.authid.length > 0){
                const postUrl = `${rootUrl}/xapi/dash_api.ashx?cmd=xloginauth`
                let formData = {};  
              
                formData.emPhone = getData.emPhone;
                formData.otp = "";
                formData.authid = getData.authid;
                formData.secretkey = hash;
  
                let formObject = {};

                // Iterate through the formData object and add key-value pairs to formObject
                for (let key in formData) {
                    if (formData.hasOwnProperty(key)) {
                    formObject[key] = formData[key].toString();
                    }
                }
                
                var jsonString = JSON.stringify(formObject); // Convert formObject to a JSON string

                var form = new FormData(); // Create a new FormData object

                form.append("postData", jsonString); // Append the JSON string to the FormData object

                fetch(postUrl,{
                  method:'POST',
                    body:form
                })
                .then(response=>{
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                    
                })
                .then(async data=>{
                  const targetedUrl = `https://ctgshop.com/xapp/pages/HRM.html?class_name=hrmMain&data_title=hrmIcon&identity=${data.data.emCode}&name=${data.data.emName}&boss=${data.data.bossID}&bossName=`
                  window.location.href = targetedUrl
                })
                .catch(async error=>{
                  // console.log(error)
                })
              }else {
                const temp = {type:"Android",isWebView : "false",platform : "Linux armv81",browser : "Chrome",sHeight : "851",sWidth : "393",dpi : "2.75",}
                await openModal(temp)
                
                // window.location.href = `https://ctgshop.com/xapp/pages/Otp.html?${query}`;

              }
           }else{
              Swal.fire({
                title: "Security violation",
                text: "You must use android app or browser in iOS",
                icon: "warning",
                timer: 5000, // Time in milliseconds (5 seconds)
                timerProgressBar: true, // Show progress bar for the timer
                willClose: () => {
                    
                    // Redirect when the dialog closes after the timer
                    window.location.href = 'https://www.google.com/';

                   
                }
              });

            
           }
      } 
      else if(platformDetailsObject['type'] === 'macOS' &&  platformDetailsObject['isWebView'] === false &&  platformDetailsObject['platform'] === 'MacIntel'){
        let status = true;
        
        if(status === true){
          const hash = createHash(
            type="Android",
            isWebView = "false",
            platform = "Linux armv81",
            browser = "Chrome",
            sHeight = "851",
            sWidth = "393",
            dpi = "2.75",
          )
          const x_App_User_Info = JSON.parse(localStorage.getItem('xAppUserInfo')); 
          
          if(x_App_User_Info){
            
            if (x_App_User_Info.emPhone && x_App_User_Info.authid) {
              
                const postUrl = `${rootUrl}/xapi/dash_api.ashx?cmd=xloginauth`

                let formData = {};  // This initializes formData as an empty object
              
                formData.emPhone = x_App_User_Info.emPhone;
                formData.authid = x_App_User_Info.authid;
                formData.otp = "";
                formData.secretkey = hash

                let formObject = {};

                // Iterate through the formData object and add key-value pairs to formObject
                for (let key in formData) {
                    if (formData.hasOwnProperty(key)) {
                    formObject[key] = formData[key].toString();
                    }
                }
            
                var jsonString = JSON.stringify(formObject); // Convert formObject to a JSON string

                var form = new FormData(); // Create a new FormData object

                form.append("postData", jsonString); // Append the JSON string to the FormData object

                fetch(postUrl,{
                  method:'POST',
                    body:form
                })
                .then(response=>{
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                    
                })
                .then(data=>{
                  
                  const targetedUrl = `https://ctgshop.com/xapp/pages/HRM.html?class_name=hrmMain&data_title=hrmIcon&identity=${data.data.emCode}&name=${data.data.emName}&boss=${data.data.bossID}&bossName=`
                  
                  window.location.href = targetedUrl
                  return;
                })
                .catch(error=>{
                 
                  return;
                })
                
            }
          }else {
            const temp = {type:"Android",isWebView : "false",platform : "Linux armv81",browser : "Chrome",sHeight : "851",sWidth : "393",dpi : "2.75",}
            await openModal(temp)
            // window.location.href = `https://ctgshop.com/xapp/pages/Otp.html?${query}`;
              
          }
        }else{
          showLoading('loading');
          Swal.fire({
            title: "Security violation",
            text: "You must use android app or browser in iOS",
            icon: "warning",
            timer: 5000, // Time in milliseconds (5 seconds)
            timerProgressBar: true, // Show progress bar for the timer
            willClose: () => {
               
                // Redirect when the dialog closes after the timer
                window.location.href = 'https://www.google.com/';
            }
          });
          // window.location.href = `https://ctgshop.com/xapp/pages/Otp.html?${queryString}`;
        }
        
      }
      else {
        
        showLoading('loading');
       
        Swal.fire({
          title: "Security violation",
          text: "You must use android app or browser in iOS",
          icon: "warning",
          timer: 5000, // Time in milliseconds (5 seconds)
          timerProgressBar: true, // Show progress bar for the timer
          willClose: () => {
              // Redirect when the dialog closes after the timer
              window.location.href = 'https://www.google.com/';
          }
        }); 
      } 



         



      // const getData = await localStorageManager('get','xAppUserInfo');
      // if(getData && getData.emPhone.length > 0 && getData.authid.length > 0){
      //   const postUrl = `${rootUrl}/xapi/dash_api.ashx?cmd=xloginauth`
      //   let formData = {};  
      
      //   formData.emPhone = getData.emPhone;
      //   formData.otp = "";
      //   formData.authid = getData.authid;
      //   formData.secretkey = hash;

      //   let formObject = {};

      //   // Iterate through the formData object and add key-value pairs to formObject
      //   for (let key in formData) {
      //       if (formData.hasOwnProperty(key)) {
      //       formObject[key] = formData[key].toString();
      //       }
      //   }
        
      //   var jsonString = JSON.stringify(formObject); // Convert formObject to a JSON string

      //   var form = new FormData(); // Create a new FormData object

      //   form.append("postData", jsonString); // Append the JSON string to the FormData object

      //   fetch(postUrl,{
      //     method:'POST',
      //       body:form
      //   })
      //   .then(response=>{
      //       if (!response.ok) {
      //           throw new Error('Network response was not ok ' + response.statusText);
      //       }
      //       return response.json();
            
      //   })
      //   .then(async data=>{
      //     const targetedUrl = `https://ctgshop.com/xapp/pages/HRM.html?class_name=hrmMain&data_title=hrmIcon&identity=${data.data.emCode}&name=${data.data.emName}&boss=${data.data.bossID}&bossName=&v=101`
      //     window.location.href = targetedUrl
      //   })
      //   .catch(async error=>{
      //     // console.log(error)
      //   })
      // }else {
      //   const temp = {type:"Android",isWebView : "false",platform : "Linux armv81",browser : "Chrome",sHeight : "851",sWidth : "393",dpi : "2.75",}
      //   await openModal(temp)
        
      //   // window.location.href = `https://ctgshop.com/xapp/pages/Otp.html?${query}`;

      // }
       


  } catch (error) {
      console.error("Error getting or parsing platform details:", error); 
      alert(error)
  }


});




function showSecurityViolationWarning() {
  showLoading('loading');
  Swal.fire({
      title: "Security violation",
      text: "You must use android app or browser in iOS",
      icon: "warning",
      timer: 5000,
      timerProgressBar: true,
      willClose: function() {
          window.location.href = 'https://www.google.com/';
      }
  });
}



async function openModal(platformDetailsObject) {
  
  await hideLoading('loading');
  vex.dialog.open({
    message: 'Enter your Official Number:',
    input: '<input type="tel" id="mobile" name="mobile" pattern="[0-9]*" inputmode="numeric" required placeholder="Official Number" />',
    buttons: [
        $.extend({}, vex.dialog.buttons.YES, { text: 'GET OTP' }),
        $.extend({}, vex.dialog.buttons.NO, { text: 'Back' })
    ],
    callback:async function (data) {
       
        if (!data) {
            document.getElementById('loading').style.display = 'flex'
            Swal.fire({
                icon: "error",
                text: 'You Clicked back button',
                timer: 5000, // Time in milliseconds (5 seconds)
                timerProgressBar: true, // Show progress bar for the timer
                willClose: () => { 
                  window.location.href = 'https://www.google.com/';
                }
                                  
            });
        } else {
            try {   
                const postUrl = `${rootUrl}/xapi/dash_api.ashx?cmd=xlogin`
                let mobile = data.mobile
              
                // if(mobile != '01730444535' && platformDetailsObject.type === 'Android'){
                //   window.location.href = 'https://www.google.com/';
                // }

                let formData = {};  // This initializes formData as an empty object

                const hash = createHash(
                    platformDetailsObject.type,
                    platformDetailsObject.isWebView,
                    platformDetailsObject.platform,
                    platformDetailsObject.browser,
                    platformDetailsObject.sHeight,
                    platformDetailsObject.sWidth,
                    platformDetailsObject.dpi,
                  )       

                formData.emPhone        = mobile;
                formData.otp            = "";
                formData.authid         = "";
                formData.secretkey      = hash;

                let formObject = {};
                
                // Iterate through the formData object and add key-value pairs to formObject
                for (let key in formData) {
                    if (formData.hasOwnProperty(key)) {
                    formObject[key] = formData[key].toString();
                    }
                }

                var jsonString = JSON.stringify(formObject); // Convert formObject to a JSON string

                var form = new FormData(); // Create a new FormData object

                form.append("postData", jsonString); // Append the JSON string to the FormData object

                fetch(postUrl,{
                    method:'POST',
                    body:form
                })
                .then(response=>{
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then(async data=>{
                    
                    if(data.status === true){
                        const res = data.data; 
                        
                        if(res.authid && res.authid.length > 0){
                          
                            await localStorageManager('set','xAppUserInfo',{emPhone:mobile,authid:res.authid});
                            sessionStorageManagerSync.setItem('xAppUserInfo',{emPhone:mobile,authid:res.authid})
                            const getData = await localStorageManager('get','xAppUserInfo')                            
                          
                            // alert(JSON.stringify({'set time storage':getData,'set time session':sessionStorageManagerSync.getItem('xAppUserInfo')}))
                            if(getData && getData.authid && getData.authid.length > 0 && getData.emPhone && getData.emPhone.length > 0){
                            
                              const targetedUrl = `https://ctgshop.com/xapp/pages/HRM.html?class_name=hrmMain&data_title=hrmIcon&identity=${res.emCode}&name=${res.emName}&boss=${res.bossID}&bossName=`
                              
                              // window.location.href = 'https://ctgshop.com/xapp/index.html';
                              window.location.href = targetedUrl;
                            } else {
                              
                              document.getElementById('loading').style.display = 'flex'
                              Swal.fire({
                                icon: "error",
                                text: data.message,
                                timer: 5000, // Time in milliseconds (5 seconds)
                                timerProgressBar: true, // Show progress bar for the timer
                                willClose: () => { 
                                  window.location.href = 'https://www.google.com/';
                                }
                                  
                              });
                            }

                        }else{
                            const obj = {};
                            obj.type        =  platformDetailsObject.type;
                            obj.isWebView   =  platformDetailsObject.isWebView;
                            obj.platform    =  platformDetailsObject.platform;
                            obj.browser     =  platformDetailsObject.browser;
                            obj.sHeight     =  platformDetailsObject.sHeight;
                            obj.sWidth      =  platformDetailsObject.sWidth;
                            obj.dpi         =  platformDetailsObject.dpi;
                            obj.emPhone     =  mobile;
    
                            const queryString           = new URLSearchParams(obj).toString();
                            window.location.href        = `https://ctgshop.com/xapp/pages/verifyOTP.html?${queryString}`;
                        }
                    } 
                    else if(data.status === false && data.message === 'User already has a device registered. Please contact with HR to unregister old device.'){
                        document.getElementById('loading').style.display = 'flex'
                        Swal.fire({
                          icon: "error",
                          text: data.message,
                          timer: 5000, // Time in milliseconds (5 seconds)
                          timerProgressBar: true, // Show progress bar for the timer
                          willClose: () => {
                            window.location.href = 'https://ctgshop.com/xapp/';
                          }
                            
                        });    
                    } 
                    else if(data.status === false && data.message === 'User not found'){
                      
                        document.getElementById('loading').style.display = 'flex'
                        Swal.fire({
                          icon: "error",
                          text: data.message,
                          timer: 5000, // Time in milliseconds (5 seconds)
                          timerProgressBar: true, // Show progress bar for the timer
                          willClose: () => {
                            window.location.href = 'https://ctgshop.com/xapp/';
                          }
                        });
                    }
                    else if(data.status === false){
                        
                        document.getElementById('loading').style.display = 'flex'
                        Swal.fire({
                          icon: "error",
                          text: data.message,
                          timer: 155000, 
                          timerProgressBar: true, 
                          
                          willClose: () => {
                              window.location.href = 'https://ctgshop.com/xapp/';
                              // document.getElementById('loading').style.display = 'flex'
                          }
                        });
                    }
                })
                .catch(error=>{
                
                  document.getElementById('loading').style.display = 'flex'
                  Swal.fire({
                    icon: "error",
                    text: data.message,
                    timer: 5000, // Time in milliseconds (5 seconds)
                    timerProgressBar: true, // Show progress bar for the timer
                    willClose: () => {
                        window.location.href = 'https://www.google.com/';
                    }
                  });
                    
                })   
                  
                    
              
            } catch (error) {
                
                document.getElementById('loading').style.display = 'flex'
           
                Swal.fire({
                    icon: "error",
                    text: data.message,
                    timer: 5000, // Time in milliseconds (5 seconds)
                    timerProgressBar: true, // Show progress bar for the timer
                    willClose: () => { 
                      window.location.href = 'https://www.google.com/';
                    }
                                      
                });
            }

      
        }
    }
  });


  // Use a timeout to ensure the dialog is fully rendered before trying to set the id
  setTimeout(function() {
    $('.vex-dialog-form').attr('id', 'sendOTPForm'); // Set the id for the dialog form
  }, 0);

}




async function fetchData() {
  try {
    const response = await fetch("./helpers/dbs.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.text();
    const parsedData = JSON.parse(data);
    const container = document.getElementById("main"); // Get the image element by its id
    const top_section = document.getElementById('top-section')
    const bottom_section = document.getElementById('bottom-section');
    container.innerHTML = "";
    parsedData.Image.map((file,index) => {
     
      const div = document.createElement("div"); // Create a div element
      const itemBtn = document.createElement("button");
      const imageElement = document.createElement("img"); // Create an img element for each file
      imageElement.src = file; // Set the src attribute to the URL of the image file
      imageElement.alt = "No image"; // Set the alt attribute
      imageElement.width = 120; // Set the width and height attributes
      imageElement.height = 60; // Set the width and height attributes
      itemBtn.type = "button";
      itemBtn.classList.add("item-add-btn");

      if(file === './assets/images/Be Rich Logo.png'){
        itemBtn.addEventListener('click',()=>{
          window.location.href = './beRich/index.html?name=KOSHIK MAHAJAN'
        })
      }

      if ((index + 1) % 2 === 0) {
        div.classList.add("even-div");
      } else {
        div.classList.add("odd-div");
      }

      div.appendChild(itemBtn);
      itemBtn.appendChild(imageElement);
      container.appendChild(div);
    });

    if(top_section){
      const height = top_section.offsetHeight;
      container.style.paddingTop = height + 'px';
    }
    if(bottom_section){
      const height = bottom_section.offsetHeight;
      container.style.paddingBottom = height + 'px'
    }

  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

fetchData();

// Get the modal element
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("options_nav");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";

}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}




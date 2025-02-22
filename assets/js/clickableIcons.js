if (!navigator.onLine) {
  handleOffline();
  
}

// alert('hrm_page')
let lastVisitedUrl = window.location.href

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const identity = urlParams.get("identity");
const emName = urlParams.get("name");
const boss = urlParams.get("boss");
const bossName = urlParams.get("bossName");
const version = urlParams.get('v');


function getAndroidVersion() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera; // Get the user agent string
  if (/Android/.test(userAgent)) { 
      const versionMatch = userAgent.match(/Android\s([0-9\.]*)/);
      if (versionMatch && versionMatch[1]) {
          return versionMatch[1];
      }
  }
  return "Unknown";
}

function getBrowserName() {
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.indexOf('firefox') > -1) {
    return "Firefox";
  } else if (userAgent.indexOf('edg') > -1) {
    return "Edge";
  } else if (userAgent.indexOf('chrome') > -1 && userAgent.indexOf('edg') === -1) {
    return "Chrome";
  } else if (userAgent.indexOf('safari') > -1 && userAgent.indexOf('chrome') === -1 && userAgent.indexOf('edg') === -1) {
    return "Safari";
  } else if (userAgent.indexOf('opr') > -1 || userAgent.indexOf('opera') > -1) {
    return "Opera";
  } else if (userAgent.indexOf('trident') > -1 || userAgent.indexOf('msie') > -1) {
    return "Internet Explorer";
  } else {
    return "Unknown Browser";
  }
}

function getDeviceType(){
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    var platform = navigator.platform || '';
    if (/android/i.test(userAgent)) {
        return "Android";
    }
    if (/iPad|iPhone|iPod/.test(userAgent) || /iPad|iPhone|iPod/.test(platform)) {
        return "iOS";
    }
    if (/Win/.test(platform)) {
        return "Windows";
    }
    if (/Mac/.test(platform) && !/iPhone|iPod|iPad/.test(userAgent)) {
        return "macOS";
    }
    if (/Linux/.test(platform)) {
        return "Linux";
    }
    return "Unknown";
}

function isWebView() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  var isAndroidWebView = /wv/.test(userAgent);
  var isIosWebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(userAgent);
  return isAndroidWebView || isIosWebView;
}



let isCheckWebView = false

let devType = ''
let isWebV = ''
let devPlatform = ''
let devBrowser = ''
let windowH = ''
let windowW = ''
let devDpi =''
let devVersion = ''


document.addEventListener("DOMContentLoaded", async function() {

  // alert(sessionStorage.getItem('hrmPage_loading'));
  // handleVersion(0, 'get');
  devType = getDeviceType()
  isWebV = isWebView()
  devPlatform = navigator.platform
  devBrowser = getBrowserName()
  windowH = window.screen.height
  windowW = window.screen.width
  devDpi = window.devicePixelRatio
  devVersion = getAndroidVersion()

  const savedScrollPosition = sessionStorage.getItem("scrollPosition");
  if (savedScrollPosition) {
    setTimeout(() => {
        window.scrollTo(0, parseInt(savedScrollPosition, 10));
        sessionStorage.removeItem("scrollPosition"); 
    }, 100); 
  }


  try {
   let platformDetailsObject = {
      type      : devType,
      isWebView : isWebV,
      platform  : devPlatform,
      browser   : devBrowser,
      sHeight   : windowH,
      sWidth    : windowW,
      dpi       : devDpi
   }

   
    // Save scroll position before unloading the page
    window.addEventListener("beforeunload", function () {
      sessionStorage.setItem("scrollPosition", window.scrollY);
    });


    if(platformDetailsObject['isWebView'] === true){
      isCheckWebView = true
    }


    // check if local storage has value
    const storedUser = await localStorageManager('get', 'xAppUserInfo');

    if (!storedUser || storedUser === null) {
      await showLoading('loading');
      window.location.href = `https://ctgshop.com/xapp/test/login.html`;
    }
    else if (
              !identity || identity === null || identity === undefined || identity.length === 0 || 
              !emName || emName === null || emName === undefined || emName.length === 0 || 
              !boss || boss === null || boss === undefined || boss.length === 0 || 
              !bossName || bossName === null || bossName === undefined || bossName.length === 0) 
    {
      await showLoading('loading');
      window.location.href = `https://ctgshop.com/xapp/test/login.html`;
    }
    else 
    {
      if (storedUser.emPhone && storedUser.emPhone.length > 0 && storedUser.authid && storedUser.authid.length > 0) {
          await hideLoading('loading');
          await fetchData();
      }
      else 
      {
        await showLoading('loading');
        window.location.href = `https://ctgshop.com/xapp/test/login.html`;
      }
    }

          
    // if ( platformDetailsObject['type'] === 'iOS' && platformDetailsObject['isWebView'] === false && ['iPhone', 'iPad', 'iPod'].includes(platformDetailsObject['platform']) && platformDetailsObject['browser'] === 'Safari') {
    //    // Get the object from localStorage
      
    //    const storedUser = await localStorageManager('get', 'xAppUserInfo');

    //    if (storedUser) {
    //       // Check if emPhone and authid are valid
    //       if (storedUser.emPhone && storedUser.emPhone.length > 0 && storedUser.authid && storedUser.authid.length > 0) {
    //         await hideLoading('loading');
    //         await fetchData();
    //       } else {
    //         await showLoading('loading');
    //         window.location.href = 'https://www.google.com/';
    //       }
    //     } else {
    //       // Check if identity, emName, boss, or bossName has a value
    //       if (!(identity && identity.length > 0) && !(emName && emName.length > 0) && !(boss && boss.length > 0) && !(bossName && bossName.length > 0)) {
    //         await showLoading('loading');
    //         window.location.href = 'https://www.google.com/';
    //       } else {
    //         // Proceed if any of the identity, emName, boss, or bossName has a value
    //         await hideLoading('loading');
    //         await fetchData();
    //       }
    //     }
        
    //     //  if(!storedUser || !storedUser.emPhone || !storedUser.emPhone.length > 0 || !storedUser.authid || !storedUser.authid.length > 0){
    //     //   await showLoading('loading')
    //     //   window.location.href = 'https://www.google.com/';
    //     //  }
        
    //     //  if(storedUser && storedUser.emPhone.length > 0 && storedUser.authid.length > 0){
    //     //    await hideLoading('loading')
    //     //    fetchData();
    //     //  }
       

    //   //  hideLoading('loading')
    // } 
    // else if(platformDetailsObject['type'] === 'Android' &&  platformDetailsObject['isWebView'] === false &&  (platformDetailsObject['browser'] === 'Chrome' || platformDetailsObject['browser'] === 'Safari')){
     

    //   let status = true;
    //   if(status === true){

    //       const storedUser = await localStorageManager('get', 'xAppUserInfo');

    //       if (storedUser) {
    //         // Check if emPhone and authid are valid
    //         if (storedUser.emPhone && storedUser.emPhone.length > 0 && storedUser.authid && storedUser.authid.length > 0) {
    //           await hideLoading('loading');
    //           await fetchData();
    //         } else {
              
    //           await showLoading('loading');
    //           window.location.href = 'https://www.google.com/';
    //         }
    //       } else {
    //         // Check if identity, emName, boss, or bossName has a value
    //         if (!(identity && identity.length > 0) && !(emName && emName.length > 0) && !(boss && boss.length > 0) && !(bossName && bossName.length > 0)) {
             
    //           await showLoading('loading');
    //           window.location.href = 'https://www.google.com/';
    //         } else {
    //           // Proceed if any of the identity, emName, boss, or bossName has a value
    //           await hideLoading('loading');
    //           await fetchData();
    //         }
    //       }


        
    //       // if(!storedUser || !storedUser.emPhone || !storedUser.emPhone.length > 0 || !storedUser.authid || !storedUser.authid.length > 0){
            
    //       //   await showLoading('loading')
    //       //   window.location.href = 'https://www.google.com/';
    //       // }
    //       // if(storedUser && storedUser.emPhone.length > 0 && storedUser.authid.length > 0){
    //       //   await hideLoading('loading')
    //       //   await fetchData();
    //       // }
          
       
    //   }else{
    //     document.getElementById('loading').style.display = 'flex';
    //     Swal.fire({
    //       title: "Security violation",
    //       text: "You must use android app or browser in iOS",
    //       icon: "warning",
          
    //       confirmButtonColor: "#3085d6",
    //       cancelButtonColor: "#d33",
    //       confirmButtonText: "Ok"
    //     }).then((result) => {
    //       if (result.isConfirmed) {
    //         document.getElementById('loading').style.display = 'flex';
    //         window.location.href = 'https://www.google.com/';
    //         setTimeout(function() {}, 500);  
          
    //       }
    //     });
    //   }
     
    // } 
    // else if(platformDetailsObject['type'] === 'Android' && platformDetailsObject['isWebView'] === true){

    // //  let status = false;
    // //  if(status){
      
    // //  }

    //  await hideLoading('loading')
    //   fetchData();
    // }
    // else if(platformDetailsObject['type'] === 'macOS' &&  platformDetailsObject['isWebView'] === false &&  platformDetailsObject['platform'] === 'MacIntel'){
    //   let status = true;
    //   if(status){
    //     await hideLoading('loading')
    //     fetchData();
    //   }else{
    //     window.location.href = 'https://www.google.com/';
    //   }
      
    // }
    // else {
    //   document.getElementById('loading').style.display = 'flex';
    //     Swal.fire({
    //       title: "Security violation",
    //       text: "You must use android app or browser in iOS",
    //       icon: "warning",
          
    //       confirmButtonColor: "#3085d6",
    //       cancelButtonColor: "#d33",
    //       confirmButtonText: "Ok"
    //     }).then((result) => {
    //       if (result.isConfirmed) {
    //         document.getElementById('loading').style.display = 'flex';
    //         window.location.href = 'https://www.google.com/';
    //         setTimeout(function() {}, 500);  
          
    //       }
    //     });
    // }

   

  } 
  catch (error) 
  {
    window.location.href = `https://ctgshop.com/xapp/test/login.html`;
  }

});


async function fetchData() {
  try {
    const response = await fetch("../helpers/dbs.json");

    let platformDetailsObject = {
      type      : devType,
      isWebView : isWebV,
      platform  : devPlatform,
      browser   : devBrowser,
      sHeight   : windowH,
      sWidth    : windowW,
      dpi       : devDpi
    }

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.text();
    const parsedData = JSON.parse(data);

   
    

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
   
    const receivedClassName = urlParams.get("class_name");
    const receivedDataTitle = urlParams.get("data_title");
    
    const container = document.getElementById(receivedClassName); // Get the image element by its id
    container.innerHTML = "";

     // Create a map to store category-specific divs
     const categoryDivs = {};

     // Function to create category div
     function createCategoryDiv(category) {
      const categoryId = category.replace(/\s+/g, '_');

      const containerDiv = document.createElement('div');
      containerDiv.setAttribute('id', `${categoryId}`);
      containerDiv.classList.add('category-container');

      const label = document.createElement('label');

      if(category === 'Employee Application'){
        label.innerText = 'Application & Approval';
      }
      else if(category === 'Employee Statements')
      {
        label.innerText = 'My Statements'
      }
      else
      {
        label.innerText = category;
      }
      label.classList.add('category-label');

      const classifiedDiv = document.createElement('div');
      
      classifiedDiv.classList.add('classified-div');

      containerDiv.appendChild(label);
      containerDiv.appendChild(classifiedDiv);

      
      return containerDiv;
     }

    

    //  if ( platformDetailsObject['type'] === 'iOS' && platformDetailsObject['isWebView'] === false && ['iPhone', 'iPad', 'iPod'].includes(platformDetailsObject['platform']) && platformDetailsObject['browser'] === 'Safari'){
    //    document.getElementById('hrm_back_btn').style.display = 'none';
    //    document.getElementById('hrm_home_btn').style.display = 'none';
    //    document.getElementById('hrm_out_btn').style.display = 'flex';

    //  }else if(platformDetailsObject['type'] === 'Android' &&  platformDetailsObject['isWebView'] === false &&  (platformDetailsObject['browser'] === 'Chrome' || platformDetailsObject['browser'] === 'Safari')){
    //    document.getElementById('hrm_back_btn').style.display = 'none';
    //    document.getElementById('hrm_home_btn').style.display = 'none';
    //    document.getElementById('hrm_out_btn').style.display = 'flex';
    //  }
     

    // parsedData[receivedDataTitle].map((item, index) => {
      
    //   if(isCheckWebView === false){
        
    //   }
    //    // Check if a div for this category exists, if not create one
    //    if (!categoryDivs[item.category]) {
    //     categoryDivs[item.category] = createCategoryDiv(item.category);
    //     container.appendChild(categoryDivs[item.category]); // Append to the main container
    //    }

    //   const classifiedDiv = categoryDivs[item.category].querySelector('.classified-div');

    //   createButton(item, index, parsedData, classifiedDiv);
      
    // });

    parsedData[receivedDataTitle]
      .filter(item => !(isCheckWebView === true && (item.title === 'contacts' || item.title === 'OTP'))) 
      .map((item, index) => {
        if (!categoryDivs[item.category]) {
          categoryDivs[item.category] = createCategoryDiv(item.category);
          container.appendChild(categoryDivs[item.category]);
        }

        const classifiedDiv = categoryDivs[item.category].querySelector('.classified-div');
        
        createButton(item, index, parsedData, classifiedDiv);
      });


   
    const hrmMain = document.getElementById('hrmMain');
    const accountsMain = document.getElementById('accountsMain')

    if(hrmMain){
      const divs = hrmMain.querySelectorAll('div');
  
      divs.forEach(div => {
          // div.style.height = `${div.offsetWidth}px`

          // Find all buttons inside the current div
          const buttons = div.querySelectorAll('button');

          buttons.forEach(button => {
            // Find all p tags inside the current button
            const pTags = button.querySelectorAll('p');
      
            pTags.forEach(pTag => {
              // pTag.remove(); // Remove each p tag
            });
          });

      });

      hrmMain.style.marginTop = `${hrmTop.offsetHeight + 10}px`

         
    }

    if(accountsMain){
      accountsMain.style.marginTop = `${accountsTop.offsetHeight + 10}px`
      const category_label = document.querySelectorAll('.category-label')
      category_label[0].remove()


     const accountMain_id = accountsMain.querySelector('#Employee_Application')
     accountMain_id.style.cssText = 'width:100%'
     accountMain_id.querySelector('.classified-div').style.cssText = 'margin:0;width:100%'
     accountMain_id.querySelector('.classified-div').querySelector('.odd-div').style.cssText = 'margin:0;width:100%;display:flex;flex-direction:row;justify-content:center;align-items:center'
     accountMain_id.querySelector('.classified-div').querySelector('.odd-div').querySelector('.item-add-btn').style.padding='0'
     accountMain_id.querySelector('.classified-div').querySelector('.odd-div').querySelector('.item-add-btn').style.cssText ='height:150px; width:150px'
     accountMain_id.querySelector('.classified-div').querySelector('.odd-div').querySelector('.item-add-btn').style.background = '#fff'
     accountMain_id.querySelector('.classified-div').querySelector('.odd-div').querySelector('.item-add-btn').style.border='none'
     accountMain_id.querySelector('.classified-div').querySelector('.odd-div').querySelector('.item-add-btn').querySelector('p').style.display = 'none'
     
    }

    
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
  // document.getElementById('loading').style.display = 'none'

}

// fetchData();
const customHistoryStack = [];

function createButton(item, index,parsedData,buttonContainer) {
  const div = document.createElement("div"); // Create a div element
  const itemBtn = document.createElement("button"); // Create a button element
  const itemImg = document.createElement("img");
  const label = document.createElement("p");
  const pSpan = document.createElement('span');
  const imgSpan = document.createElement('span');

  
  itemImg.src = item.icon;
  itemImg.alt = "No Image";
  // itemImg.width = 60;
  // itemImg.height = 50;
  

  itemBtn.type = "button";
  itemBtn.classList.add("item-add-btn");
  imgSpan.setAttribute('id','icon_holder')
  pSpan.setAttribute('id','para_span')

  // Add different classes based on even or odd index
  if ((index + 1) % 2 === 0) {
    div.classList.add("even-div");
  } else {
    div.classList.add("odd-div");
  }

  // label.innerText += item.title;
  switch (item.title) {
    case 'notice':
        label.innerText += 'Notice Board';
        break;
    case 'HR policy':
        label.innerText += 'HR POLICIES';
        break;
    case 'holidays':
        label.innerText += 'ANNUAL HOLIDAYS';
        break;
    default:
        label.innerText += item.title;
        break;
}

  // div.appendChild(itemImg);
  div.appendChild(itemBtn); // Append the button to the div
  imgSpan.appendChild(itemImg)
  itemBtn.appendChild(imgSpan);
  pSpan.appendChild(label);
  itemBtn.appendChild(pSpan);


  itemBtn.addEventListener("click", function () {
    const loadingSpinnerDiv = document.getElementById('button_loading');
    loadingSpinnerDiv.style.display = 'flex';  // Show the spinner immediately

    let navigationPromise = null;  // Default to null in case no promise is returned

    // sessionStorage.setItem('hrmPage_loading',true)
    
    // setTimeout(() => {  

    //     for (let items in parsedData) {
    //         const isExist = (items === 'hrmIcon' || items === 'accounts') && parsedData[items].some((element) => element.title === item.title);

    //         if (isExist && items === 'hrmIcon') {
    //             if (item.title === 'late application') {
    //                 navigationPromise = navigateToPage('lateApplicationRoute', '../pages/HumanResourceActivity.html', '', item.title, `${identity}`, `${emName}`, `${boss}`, `${bossName}`);
    //             } else if (item.title === 'bill application') {
    //                 navigationPromise = navigateToPage('hrmRoute', '../pages/AccountActivity.html', '', 'Bill entry', `${identity}`, `${emName}`, `${boss}`, `${bossName}`);
    //             } else {
    //                 navigationPromise = navigateToPage('hrmRoute', '../pages/HumanResourceActivity.html', '', item.title, `${identity}`, `${emName}`, `${boss}`, `${bossName}`);
    //             }
    //         } else if (isExist && items === 'accounts') {
    //             navigationPromise = navigateToPage('routeToPage', '../pages/AccountActivity.html', '', item.title, `${identity}`);
    //         }

    //         if (isExist) {
    //             break;
    //         }
    //     }

    //     // Ensure the spinner is hidden after navigation completes, if a promise is returned
    //     if (navigationPromise && typeof navigationPromise.finally === 'function') {
    //         navigationPromise.finally(() => {
    //           loadingSpinnerDiv.style.display = 'none'
    //         });
    //     } else {
    //         // Hide the spinner after a small delay if no promise is returned
    //         setTimeout(() => {
    //             loadingSpinnerDiv.style.display = 'none';
    //         }, 1000); // Adjust the delay as necessary
    //     }

    // }, 1000);  
   
    
    const isAndroid7OrLower = /Android [0-7]\./i.test(navigator.userAgent);
    
    

    for (let items in parsedData) {
      const isExist = (items === 'hrmIcon' || items === 'accounts') && parsedData[items].some((element) => element.title === item.title);

      if (isExist && items === 'hrmIcon') {
          if (item.title === 'late application') {
             
              navigateToPage('lateApplicationRoute', '../pages/HumanResourceActivity.html', '', item.title, `${identity}`, `${emName}`, `${boss}`, `${bossName}`);
          } else if (item.title === 'bill application') {
             
              navigateToPage('hrmRoute', '../pages/AccountActivity.html', '', 'Bill entry', `${identity}`, `${emName}`, `${boss}`, `${bossName}`);
          } else {
             
              navigateToPage('hrmRoute', '../pages/HumanResourceActivity.html', '', item.title, `${identity}`, `${emName}`, `${boss}`, `${bossName}`);
          }
      } else if (isExist && items === 'accounts') {
         
          navigateToPage('routeToPage', '../pages/AccountActivity.html', '', item.title, `${identity}`);
      }

    }

  });
  
  buttonContainer.appendChild(div)
  // div.style.width = '100%'
  div.style.height = `${div.offsetWidth}px` 
  itemBtn.style.height = `${itemBtn.offsetWidth}px`
  
  imgSpan.style.height = `${imgSpan.offsetWidth}px`
}


// Function to show the loading overlay
async function showLoading(givenId) {
  document.getElementById(givenId).style.display = 'flex';
}

// Function to hide the loading overlay
async function hideLoading(givenId) {
  document.getElementById(givenId).style.display = 'none';
}



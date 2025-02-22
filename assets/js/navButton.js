
function routeToPage(path, classInfo,dataTitle,identity) {
  const url = `${path}?class_name=${encodeURIComponent(classInfo)}&data_title=${encodeURIComponent(dataTitle)}&identity=${encodeURIComponent(identity)}`;
 
  window.location.href = url;
}

function profileRoute(path, classInfo,dataTitle,identity){
  const url = `${path}?class_name=${encodeURIComponent(classInfo)}&data_title=${encodeURIComponent(dataTitle)}&identity=${encodeURIComponent(identity)}`;
 
  window.location.href = url;
}

function hrmRoute(path, classInfo,dataTitle,identity,emName,bossCode,bossName){
  const url = `${path}?class_name=${encodeURIComponent(classInfo)}&data_title=${encodeURIComponent(dataTitle)}&identity=${encodeURIComponent(identity)}&name=${encodeURIComponent(emName)}&boss=${encodeURIComponent(bossCode)}&bossName=${encodeURIComponent(bossName)}`;
  window.location.href = url;
}

function lateApplicationRoute(path,classInfo,dataTitle,identity,emName,bossCode,bossName){
  
  const url = `${path}?class_name=${encodeURIComponent(classInfo)}&data_title=${encodeURIComponent(dataTitle)}&identity=${encodeURIComponent(identity)}&name=${encodeURIComponent(emName)}&boss=${encodeURIComponent(bossCode)}&bossName=${encodeURIComponent(bossName)}`;
 
  window.location.href = url;
}


function navigateToPage(type, path, classInfo, dataTitle, identity, emName = '', bossCode = '', bossName = '') {
  return new Promise((resolve) => {
      let url;

      // Build the URL based on the type of route
      if (type === 'routeToPage') {
          url = `${path}?class_name=${encodeURIComponent(classInfo)}&data_title=${encodeURIComponent(dataTitle)}&identity=${encodeURIComponent(identity)}`;
      } else if (type === 'profileRoute') {
          url = `${path}?class_name=${encodeURIComponent(classInfo)}&data_title=${encodeURIComponent(dataTitle)}&identity=${encodeURIComponent(identity)}`;
      } else if (type === 'hrmRoute') {
          url = `${path}?class_name=${encodeURIComponent(classInfo)}&data_title=${encodeURIComponent(dataTitle)}&identity=${encodeURIComponent(identity)}&name=${encodeURIComponent(emName)}&boss=${encodeURIComponent(bossCode)}&bossName=${encodeURIComponent(bossName)}`;
      } else if (type === 'lateApplicationRoute') {
          url = `${path}?class_name=${encodeURIComponent(classInfo)}&data_title=${encodeURIComponent(dataTitle)}&identity=${encodeURIComponent(identity)}&name=${encodeURIComponent(emName)}&boss=${encodeURIComponent(bossCode)}&bossName=${encodeURIComponent(bossName)}`;
      } else {
          throw new Error('Invalid route type');
      }

      // Navigate to the URL
      window.location.href = url;

      // Resolve the promise
      resolve();
  });
}

function handleBackButton(pageName = null,obj = {}){

  if(window.Android && typeof window.Android.goToMainActivity === "function"){
    window.Android.goToMainActivity()
  }else{
    console.warn('Android interface not found')
  }

  // if (typeof Android !== 'undefined' && Android.goToMainActivity) {
  //   Android.goToMainActivity();
  // } 
  // else 
  // {
  //   if(pageName === 'hrm'){
  //     const url = `https://ctgshop.com/xapp/test/index.html?identity=${encodeURIComponent(obj.identity)}&name=${encodeURIComponent(obj.emName)}&boss=${encodeURIComponent(obj.applyReportingBoss)}&bossName=${encodeURIComponent(obj.reportingBossName)}`;
  //     window.location.href = url;
  //   }else if(pageName === 'accounts'){
  //     const url = `https://ctgshop.com/xapp/test/index.html?identity=${encodeURIComponent(obj.identity)}&name=${encodeURIComponent(obj.emName)}&boss=${encodeURIComponent(obj.applyReportingBoss)}&bossName=${encodeURIComponent(obj.reportingBossName)}`;
  //     window.location.href = url;
  //   }else if(pageName === 'notice'){
  //     const url = `https://ctgshop.com/xapp/test/index.html?identity=${encodeURIComponent(obj.identity)}&name=${encodeURIComponent(obj.emName)}&boss=${encodeURIComponent(obj.applyReportingBoss)}&bossName=${encodeURIComponent(obj.reportingBossName)}`;
  //     window.location.href = url;
  //   }
  // }

  window.location.href ='https://ctgshop.com/xapp/test/index.html'

  // else if(navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad') || navigator.userAgent.includes('iPod'))
  // {
  //   // alert("Back button pressed on iOS device.");
    
  //   if(pageName === 'hrm'){
  //     const url = `https://ctgshop.com/xapp/test/pages/HRM.html?class_name=${encodeURIComponent(obj.class_name)}&data_title=${encodeURIComponent(obj.data_title)}&identity=${encodeURIComponent(obj.identity)}&name=${encodeURIComponent(obj.emName)}&boss=${encodeURIComponent(obj.applyReportingBoss)}&bossName=${encodeURIComponent(obj.reportingBossName)}`;
  //     window.location.href = url;
  //   }else if(pageName === 'accounts'){
  //     const url = `https://ctgshop.com/xapp/test/pages/HRM.html?class_name=${encodeURIComponent(obj.class_name)}&data_title=${encodeURIComponent(obj.data_title)}&identity=${encodeURIComponent(obj.identity)}&name=${encodeURIComponent(obj.emName)}&boss=${encodeURIComponent(obj.applyReportingBoss)}&bossName=${encodeURIComponent(obj.reportingBossName)}`;
  //     window.location.href = url;
  //   }else if(pageName === 'notice'){
  //     const url = `https://ctgshop.com/xapp/test/pages/HRM.html?class_name=${encodeURIComponent(obj.class_name)}&data_title=${encodeURIComponent(obj.data_title)}&identity=${encodeURIComponent(obj.identity)}&name=${encodeURIComponent(obj.emName)}&boss=${encodeURIComponent(obj.applyReportingBoss)}&bossName=${encodeURIComponent(obj.reportingBossName)}`;
  //     window.location.href = url;
  //   }else{
  //     // window.history.back();
  //     // console.log(pageName)
  //   }
   

  // }
  // else 
  // { 
  //     if(pageName === 'hrm'){
  //       const url = `https://ctgshop.com/xapp/test/pages/HRM.html?class_name=${encodeURIComponent(obj.class_name)}&data_title=${encodeURIComponent(obj.data_title)}&identity=${encodeURIComponent(obj.identity)}&name=${encodeURIComponent(obj.emName)}&boss=${encodeURIComponent(obj.applyReportingBoss)}&bossName=${encodeURIComponent(obj.reportingBossName)}`;
  //       window.location.href = url;
  //     }else if(pageName === 'accounts'){
  //       const url = `https://ctgshop.com/xapp/test/pages/HRM.html?class_name=${encodeURIComponent(obj.class_name)}&data_title=${encodeURIComponent(obj.data_title)}&identity=${encodeURIComponent(obj.identity)}&name=${encodeURIComponent(obj.emName)}&boss=${encodeURIComponent(obj.applyReportingBoss)}&bossName=${encodeURIComponent(obj.reportingBossName)}`;
  //       window.location.href = url;
  //     }else if(pageName === 'notice'){
  //       const url = `https://ctgshop.com/xapp/test/pages/HRM.html?class_name=${encodeURIComponent(obj.class_name)}&data_title=${encodeURIComponent(obj.data_title)}&identity=${encodeURIComponent(obj.identity)}&name=${encodeURIComponent(obj.emName)}&boss=${encodeURIComponent(obj.applyReportingBoss)}&bossName=${encodeURIComponent(obj.reportingBossName)}`;
  //       window.location.href = url;
  //     }else{
  //       // window.history.back();
  //       alert(pageName)
  //     }
  // }


}


async function handleButtonBack(){
  const res =await platformDes()
  const parsedRes = JSON.parse(res)
  // console.log(parsedRes.userAgent,parsedRes)
  // alert(JSON.stringify((parsedRes.platform).split(' ')[0]))
  if((parsedRes.platform).includes('Linux')){
    
  }

}

function logout(){
  // window.location.href ='https://www.google.com/'
  window.location.href ='https://ctgshop.com/xapp/test/index.html'
}

function handleHomeButon(){
  Android.goToMainActivity();
}

// function goToHomePage(){
//   // if(window.Android){
//   //   window.Android.navigateToMain();
//   // }

// } 

function navigate(url) {
  window.location.href = url;
}

function backBtn(path) {
  window.location.href = path;
}

//   document.addEventListener('DOMContentLoaded', function() {
//     const myButton = document.getElementById('hrmButton');
//     myButton.addEventListener('click', routeToPage);
//   });

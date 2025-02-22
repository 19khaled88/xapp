const url = window.location.href;


document.addEventListener("DOMContentLoaded", async function() {

    let status = false;
        if(status === true){
            try {
                const res = await platformDes();
        
                // Parse the string into an object
                const parsedRes = JSON.parse(res);
        
                
                if (parsedRes && parsedRes.isWebView === false) {
                    Swal.fire({
                        title: "Security violation",
                        text: "You must use android app or browser in iOS",
                        icon: "warning",
                        timer: 5000, // Time in milliseconds (5 seconds)
                        timerProgressBar: true, // Show progress bar for the timer
                        willOpen: () => {
                            // Change the background color to white when the dialog opens
                            const swalOverlay = document.querySelector('.swal2-container');
                            if (swalOverlay) {
                                swalOverlay.style.backgroundColor = 'white';
                            }
                            // swal2-shown swal2-height-auto
                        },
                        willClose: () => {
                            // Redirect when the dialog closes after the timer
                            window.location.href = 'https://www.google.com/';
                        }
                      });
                } 
            
            } catch (error) {
                console.error("Error parsing platform description:", error);
            }
        }
    
})



async function pareseUrlAndStore(url){
    const res = url.split('?');
    let urlString = '';
    let queryParams = {};

    
    res.forEach(item => {
        if (item.endsWith('.html')) {
            // If the item ends with .html, it's considered a URL string
            urlString = item;
        } else if (item.includes('&')) {
            // If the item contains '&', it's considered a query parameter string
            item.split('&').forEach(param => {
                const [key, value] = param.split('=');
                queryParams[decodeURIComponent(key)] = decodeURIComponent(value);
            });
        } else {
            item.split('&').forEach(param=>{
                const [key, value] = param.split('=');
                if(key && value){
                    queryParams[decodeURIComponent(key)] = decodeURIComponent(value);
                }
            })
        }
    });

    if(Object.keys(queryParams).length > 0 ){
    // await localStorageManager('set','berich_em_identity', queryParams)
       return (urlString,queryParams)
        
    }
    
}




const handleBackBtn=async(pageName = null, obj={})=>{
    
    if(pageName && pageName === 'berich_home') {
            // try {
            //     const storedParams = localStorage.getItem('berich_em_identity');

            //     if (storedParams) {
            //         // Parse the JSON string into an object
            //         const params = JSON.parse(storedParams);

            //         // Check if the params have the required properties
            //         if (params.name && params.emcode) {
            //             const redirecting_url = 'https://ctgshop.com/xapp/beRich/' + obj.url;
            //             const url = `${redirecting_url}?name=${encodeURIComponent(params.name)}&emcode=${encodeURIComponent(params.emcode)}`;

            //             // Redirect to the constructed URL
            //             window.location.href = url;
            //         } else {
            //             alert('Data is missing required fields: name or emcode');
            //         }
            //     } else {
            //         alert('No data found for berich_em_identity');
            //     }
            // } catch (error) {
            //     alert('Failed to retrieve data from localStorage');
            // }
        
        
       

        // if(obj && obj.url){
        //     const redirecting_url = 'https://ctgshop.com/xapp/beRich/' + obj.url
        //     const params = await localStorageManager('get','berich_em_identity')
            
        //     if (params && params.name && params.emcode) {
        //         const url = `${redirecting_url}?name=${encodeURIComponent(params.name)}&emcode=${encodeURIComponent(params.emcode)}`;
        //         console.log('Constructed URL:', url);
                
        //         window.location.href = url;
        //     } else {
                
        //     }
            
            
        // }else{
            
        // }

        // if (obj && typeof obj.url === 'string' && obj.url.trim() !== '') {
        //     alert(JSON.stringify('yes'))
        // }

        try {
            const pareseData =await pareseUrlAndStore(url)
            const redirecting_url = 'https://ctgshop.com/xapp/beRich/' + obj.url;
            const new_url = `${redirecting_url}?name=${encodeURIComponent(pareseData.name)}&emcode=${encodeURIComponent(pareseData.emcode)}`;
            
            window.location.href = new_url;
        } catch (error) {
            
        }
       
        
    } else if(pageName && pageName === 'client_portfolio'){
        try {
            const pareseData =await pareseUrlAndStore(url)
            const redirecting_url = 'https://ctgshop.com/xapp/beRich/' + obj.url;
            const new_url = `${redirecting_url}?name=${encodeURIComponent(pareseData.name)}&emcode=${encodeURIComponent(pareseData.emcode)}`;
            
            window.location.href = new_url;
        } catch (error) {
            
        } 
    }else if(pageName && pageName === 'financial_statement'){
        try {
            const pareseData =await pareseUrlAndStore(url)
            const redirecting_url = 'https://ctgshop.com/xapp/beRich/' + obj.url;
            const new_url = `${redirecting_url}?name=${encodeURIComponent(pareseData.mother_acc_name)}&emcode=${encodeURIComponent(pareseData.emcode)}`;
            
            window.location.href = new_url;
        } catch (error) {
            
        } 
    } else if (typeof Android !== 'undefined' && Android.goToMainActivity) {
        // Call the Android method to go back to the main activity
        Android.goToMainActivity();
    } else {

    }
    
}


async function localStorageManager(action, key, value = null) {
    //action: e.g set, get, remove etc.
    return new Promise((resolve, reject) => {
        try {
            switch (action) {
                case 'set':
                
                    // localStorage.setItem(key, JSON.stringify(value));
                    // resolve(); // Resolving the promise after setting the item
                    // break;

                    const existingValue = localStorage.getItem(key);
                    let newValue;

                    if (existingValue) {
                        // Parse the existing value if it exists
                        const parsedExistingValue = JSON.parse(existingValue);

                        // Check if the existing value is an object
                        if (typeof parsedExistingValue === 'object' && !Array.isArray(parsedExistingValue)) {
                                newValue = { ...parsedExistingValue, ...value };  
                        } else {
                            // If it's neither an object nor an array, replace with the new value
                            newValue = value;
                        }
                    } else {
                        // If there's no existing value, use the new value as it is
                        newValue = value;
                    }

                    localStorage.setItem(key, JSON.stringify(newValue));
                    resolve(); // Resolving the promise after setting the item
                    break;
                case 'get':
                    try {
                        const storedValue = localStorage.getItem(key);
                        // alert(JSON.stringify(storedValue))
                        resolve(storedValue ? JSON.parse(storedValue) : null); // Resolving the promise with the retrieved value
                    } catch (error) {
                        resolve(null)
                    }
                    
                    break;
                case 'remove':
                    localStorage.removeItem(key);
                    resolve(); // Resolving the promise after removing the item
                    break;
                default:
                    reject(new Error('Invalid action. Use "set", "get", or "remove".')); // Rejecting the promise in case of an invalid action
            }
        } catch (error) {
            reject(error); // Rejecting the promise in case of any errors
        }
    });
}

pareseUrlAndStore(url)



function getDeviceType(){
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    var platform = navigator.platform || '';
  
    // Detect Android
    if (/android/i.test(userAgent)) {
        return "Android";
    }
  
    // Detect iOS (iPhone, iPad, iPod)
    if (/iPad|iPhone|iPod/.test(userAgent) || /iPad|iPhone|iPod/.test(platform)) {
        return "iOS";
    }
  
    // Detect Windows
    if (/Win/.test(platform)) {
        return "Windows";
    }
  
    // Detect macOS
    if (/Mac/.test(platform) && !/iPhone|iPod|iPad/.test(userAgent)) {
        return "macOS";
    }
  
    // Detect Linux
    if (/Linux/.test(platform)) {
        return "Linux";
    }
  
    return "Unknown";
}

function isWebView() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
    // Detect WebView on Android
    var isAndroidWebView = /wv/.test(userAgent);
  
    // Detect WebView on iOS
    var isIosWebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(userAgent);
  
    return isAndroidWebView || isIosWebView;
}

function getOS() {

let os = "unknow";

const userAgent = window.navigator.userAgent;
const platform =
    window.navigator?.userAgentData?.platform || window.navigator.platform;
const macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"];
const windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"];
const iosPlatforms = ["iPhone", "iPad", "iPod"];

if (macosPlatforms.indexOf(platform) !== -1) {
    os = "Mac OS";
} else if (iosPlatforms.indexOf(platform) !== -1) {
    os = "iOS";
} else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "Windows";
} else if (/Android/.test(userAgent)) {
    os = "Android";
} else if (/Linux/.test(platform)) {
    os = "Linux";
}

return os;
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

const platformDesObj = {
    "type":getDeviceType(),
    "isWebView":isWebView(),
    "platform":navigator.platform,
    "browser":getBrowserName(),
    "sHeight":window.screen.height,
    // "os":getOS(),
    "sWidth":window.screen.width,
    "dpi":window.devicePixelRatio
}

async function platformDes(){
    const res = JSON.stringify(platformDesObj, null, 2)
    return res
}
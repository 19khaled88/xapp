
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
    // "os":getOS(),
    // "userAgent":navigator.userAgent,

async function platformDes(){
  const res = JSON.stringify(platformDesObj, null, 2)
  return res
}






